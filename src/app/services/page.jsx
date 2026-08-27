import ServicesPage from "../../components/pages/ServicesPage";
import { apiService } from "../../lib/api";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Instrument Qualification, Calibration & AMC Services | Shreedhar Group",
  description: "Shreedhar Group provides IQ/OQ/PQ validation, NABL-traceable calibration, annual maintenance contracts (AMC), and GMP compliance training for analytical instruments across India.",
  alternates: { canonical: "https://shreedhargroup.com/services" },
  openGraph: {
    title: "IQ/OQ/PQ Validation, Calibration & AMC Services | Shreedhar Group",
    description: "Expert instrument qualification, calibration, and maintenance services for pharmaceutical analytical equipment. Pan-India support with full validation documentation.",
    url: "https://shreedhargroup.com/services",
    siteName: "Shreedhar Group",
    locale: "en_IN",
    type: "website",
  },
};

export default async function Page() {
  let initialServices = null;

  try {
    const response = await apiService.getAllServices();
    if (Array.isArray(response?.data)) initialServices = response.data;
  } catch (error) {
    console.error("Failed to render services on the server:", error);
  }

  return <ServicesPage initialServices={initialServices} />;
}
