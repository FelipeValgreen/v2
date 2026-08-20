import { notFound } from "next/navigation";
import { solutions } from "@/lib/site";
import { routeMetadata } from "@/lib/seo";
import { SolutionPage } from "./SolutionPage";
import { isSolutionLaunchEnabled } from "@/lib/capabilities";

export function GetSolutionPage({slug}:{slug:string}){
  const solution=solutions.find(s=>s.slug===slug);
  if(!solution)notFound();
  return <SolutionPage solution={solution}/>;
}

export function getSolutionMetadata(slug:string){
  const solution=solutions.find(x=>x.slug===slug);
  return solution ? routeMetadata(solution.slug, solution.seoTitle ?? solution.label, solution.description, { indexable: isSolutionLaunchEnabled(solution.slug) }) : {};
}
