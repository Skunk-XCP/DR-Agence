import OffresClient from "./OffresClient";
import { isBusinessType, isProjectType, isSiteType } from "@/lib/pricing";

type PageProps = {
  searchParams: Promise<{
    businessType?: string;
    projectType?: string;
    siteType?: string;
  }>;
};

export default async function OffresPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const businessType = params.businessType ?? "";
  const projectType = params.projectType ?? "";
  const siteType = params.siteType ?? "";

  return (
    <OffresClient
      initialBusinessType={isBusinessType(businessType) ? businessType : ""}
      initialProjectType={isProjectType(projectType) ? projectType : ""}
      initialSiteType={isSiteType(siteType) ? siteType : ""}
    />
  );
}
