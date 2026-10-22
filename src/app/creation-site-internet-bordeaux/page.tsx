import type { Metadata } from "next";
import ServicePage from "@/components/seo/ServicePage";
import { servicePages } from "@/data/servicePages";

const data = servicePages.creationBordeaux;
export const metadata: Metadata = { title: data.title, description: data.description, alternates: { canonical: data.slug }, openGraph: { title: data.title, description: data.description, url: data.slug, type: "website", locale: "fr_FR" }, twitter: { card: "summary_large_image", title: data.title, description: data.description } };
export default function Page() { return <ServicePage data={data} />; }
