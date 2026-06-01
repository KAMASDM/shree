import FaqsPage from "../../components/pages/FaqsPage";

export const metadata = {
  title: "FAQs | Pharmaceutical Analytical Instruments Support | Shreedhar Group",
  description: "Find answers to frequently asked questions about Shreedhar Group's analytical instruments, GMP compliance, IQ/OQ/PQ validation, calibration, and service support.",
  alternates: { canonical: "https://shreedhargroup.com/faqs" },
  openGraph: {
    title: "Frequently Asked Questions | Shreedhar Group",
    description: "Get answers on product selection, regulatory compliance, instrument validation, maintenance, and support for pharmaceutical analytical instruments from Shreedhar Group.",
    url: "https://shreedhargroup.com/faqs",
    siteName: "Shreedhar Group",
    locale: "en_IN",
    type: "website",
  },
};

export default function Page() {
  return <FaqsPage />;
}
