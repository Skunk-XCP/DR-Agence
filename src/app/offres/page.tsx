import type { Metadata } from "next";
import OffresClient from "./OffresClient";
import { isBusinessType, isProjectType, isSiteType } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Estimation site ou application web | Donatien Rouzeirol",
  description:
    "Estimez un site professionnel ou préparez le cadrage d’une application web, d’une fonctionnalité avancée ou d’une intégration sur mesure.",
  alternates: {
    canonical: "https://www.donatien-rouzeirol.fr/offres",
  },
};

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
