import type { Metadata } from "next";
import OffresClient from "./OffresClient";
import { isBusinessType, isProjectType, isSiteType } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Offres site web freelance | Donatien Rouzeirol",
  description:
    "Choisissez une offre de création de site web selon votre activité, votre projet et le type de site attendu.",
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
