import { GetSolutionPage, getSolutionMetadata } from "@/components/GetSolutionPage";
export const metadata = getSolutionMetadata("/camarotes");
export default function Page(){return <GetSolutionPage slug="/camarotes"/>}
