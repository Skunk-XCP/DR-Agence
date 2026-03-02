import OffresClient from "./OffresClient";
import { isBusinessType, isSiteType } from "@/lib/pricing";

type PageProps = {
  searchParams: Promise<{
    businessType?: string;
    siteType?: string;
  }>;
};

export default async function OffresPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const businessType = params.businessType ?? "";
  const siteType = params.siteType ?? "";

  return (
    <OffresClient
      initialBusinessType={isBusinessType(businessType) ? businessType : ""}
      initialSiteType={isSiteType(siteType) ? siteType : ""}
    />
  );
}
