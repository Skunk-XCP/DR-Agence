import { redirect } from "next/navigation";
import ConfigurateurClient from "./ConfigurateurClient";
import { Footer, Navbar } from "@/components/sections";
import { isBusinessType, isSiteType } from "@/lib/pricing";

type PageProps = {
  searchParams: Promise<{
    businessType?: string;
    siteType?: string;
  }>;
};

export default async function ConfigurateurPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const businessType = params.businessType ?? "";
  const siteType = params.siteType ?? "";

  if (!isBusinessType(businessType) || !isSiteType(siteType)) {
    redirect("/offres");
  }

  return (
    <div className="app">
      <Navbar />
      <ConfigurateurClient businessType={businessType} siteType={siteType} />
      <Footer />
    </div>
  );
}
