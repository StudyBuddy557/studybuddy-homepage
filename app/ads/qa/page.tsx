import { notFound } from "next/navigation";
import AdsQADashboard from "./AdsQADashboard";

export default function AdsQAPage({
  searchParams,
}: {
  searchParams?: { key?: string };
}) {
  if (process.env.NODE_ENV === "production") {
    const required = process.env.ADS_QA_KEY;
    const provided = searchParams?.key;
    if (!required || provided !== required) notFound();
  }

  return <AdsQADashboard />;
}
