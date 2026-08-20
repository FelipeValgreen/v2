# Security policy — RINON V2

This repository is intentionally public.

## Never commit
- `.env`, `.env.local` or environment-specific secret files
- `SUPABASE_SERVICE_ROLE_KEY` or Supabase secret/service-role keys
- `ADMIN_PASSWORD`
- `VERCEL_TOKEN`
- private API keys, OAuth tokens, database passwords or credentials

Only example environment files with empty secret values may be committed.

## Deployment
Production remains separately gated. A public commit or merge does not authorize replacing the current `rinon.cl` production deployment.

## Reporting
If a credential is accidentally committed, treat it as compromised: revoke/rotate it first, then remove it from the repository and history where appropriate.
