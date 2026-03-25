import type { Metadata } from "next";
import { redirect } from "next/navigation";
import ConfigurateurClient from "./ConfigurateurClient";
import { Footer, Navbar } from "@/components/sections";
import { isBusinessType, isProjectType, isSiteType } from "@/lib/pricing";

type PageProps = {
  searchParams: Promise<{
    businessType?: string;
    projectType?: string;
    siteType?: string;
  }>;
};

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default async function ConfigurateurPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const businessType = params.businessType ?? "";
  const projectType = params.projectType ?? "";
  const siteType = params.siteType ?? "";

  if (!isProjectType(projectType) || !isBusinessType(businessType) || !isSiteType(siteType)) {
    redirect("/offres");
  }

  return (
    <div className="app">
      <Navbar />
      <ConfigurateurClient businessType={businessType} projectType={projectType} siteType={siteType} />
      <Footer />
    </div>
  );
}
