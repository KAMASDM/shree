import QuotePage from "../../components/pages/QuotePage";

export const metadata = {
  title: "Request a Quote | Pharmaceutical Analytical Instruments | Shreedhar Group",
  description: "Request a quote for GMP-compliant analytical instruments, cleanroom monitoring systems, or validation services from Shreedhar Group. Fast response from our expert team.",
  alternates: { canonical: "https://shreedhargroup.com/quote" },
  openGraph: {
    title: "Request a Quote | Shreedhar Group",
    description: "Get a competitive quote for pharmaceutical analytical instruments and services. Shreedhar Group provides tailored solutions for your GMP and regulatory compliance needs.",
    url: "https://shreedhargroup.com/quote",
    siteName: "Shreedhar Group",
    locale: "en_IN",
    type: "website",
  },
};

export default function Page() {
  return <QuotePage />;
}
