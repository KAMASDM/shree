import ServicesPage from "../../components/pages/ServicesPage";

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

export default function Page() {
  return <ServicesPage />;
}
