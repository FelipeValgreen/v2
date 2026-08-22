create or replace function public.rinon_analytics_summary(p_days integer default 30, p_bucket text default 'day')
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_days integer := greatest(1, least(coalesce(p_days, 30), 3660));
  v_bucket text := case when p_bucket in ('hour','day','month') then p_bucket else 'day' end;
  v_from timestamptz := now() - make_interval(days => greatest(1, least(coalesce(p_days, 30), 3660)));
  v_result jsonb;
begin
  with scoped as (
    select * from public.analytics_events where created_at >= v_from
  ), metric_values as (
    select
      count(*) filter (where event_name='page_view')::int as views,
      count(distinct visitor_id) filter (where event_name='page_view')::int as visitors,
      count(*) filter (where event_name='contact_whatsapp')::int as whatsapp,
      count(*) filter (where event_name='contact_phone')::int as phone,
      count(*) filter (where event_name='generate_lead')::int as leads,
      count(*) filter (where event_name='quote_start')::int as quote_starts,
      count(*) filter (where event_name='quote_submit')::int as quote_submits,
      count(*) filter (where event_name='maps_click')::int as maps,
      count(*) filter (where event_name='waze_click')::int as waze
    from scoped
  ), totals as (
    select jsonb_build_object(
      'views', views,
      'visitors', visitors,
      'whatsapp', whatsapp,
      'phone', phone,
      'leads', leads,
      'quote_starts', quote_starts,
      'quote_submits', quote_submits,
      'maps', maps,
      'waze', waze
    ) as value from metric_values
  ), funnel as (
    select jsonb_build_object(
      'quote_starts', quote_starts,
      'quote_submits', quote_submits,
      'leads', leads,
      'start_to_submit_rate', case when quote_starts > 0 then round(quote_submits::numeric * 100 / quote_starts, 1) else 0 end,
      'submit_to_lead_rate', case when quote_submits > 0 then round(leads::numeric * 100 / quote_submits, 1) else 0 end
    ) as value from metric_values
  ), series_rows as (
    select
      date_trunc(v_bucket, created_at) as bucket,
      count(*) filter (where event_name='page_view')::int as views,
      count(distinct visitor_id) filter (where event_name='page_view')::int as visitors,
      count(*) filter (where event_name in ('contact_whatsapp','contact_phone','generate_lead'))::int as contacts,
      count(*) filter (where event_name='quote_start')::int as quote_starts,
      count(*) filter (where event_name='quote_submit')::int as quote_submits
    from scoped
    group by 1
    order by 1
  ), series_json as (
    select coalesce(jsonb_agg(jsonb_build_object(
      'bucket', bucket,
      'views', views,
      'visitors', visitors,
      'contacts', contacts,
      'quote_starts', quote_starts,
      'quote_submits', quote_submits
    ) order by bucket), '[]'::jsonb) as value from series_rows
  ), top_rows as (
    select page_path as path, count(*)::int as views, count(distinct visitor_id)::int as visitors
    from scoped
    where event_name='page_view'
    group by page_path
    order by views desc, visitors desc, page_path asc
    limit 25
  ), top_json as (
    select coalesce(jsonb_agg(jsonb_build_object('path', path, 'views', views, 'visitors', visitors)), '[]'::jsonb) as value from top_rows
  )
  select jsonb_build_object('totals', totals.value, 'funnel', funnel.value, 'series', series_json.value, 'topPages', top_json.value)
  into v_result
  from totals, funnel, series_json, top_json;
  return v_result;
end;
$function$;
