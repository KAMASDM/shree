import AboutPage from "../../components/pages/AboutPage";

export const metadata = {
  title: "About Us | Shreedhar Group – 27+ Years in Pharmaceutical Analytical Instruments",
  description: "Learn about Shreedhar Group's 27+ years of expertise supplying FDA-compliant analytical instruments to 800+ pharmaceutical customers across India. Founded in 1998, Vadodara.",
  alternates: { canonical: "https://shreedhargroup.com/about" },
  openGraph: {
    title: "About Shreedhar Group | Pharmaceutical Analytical Instruments Since 1998",
    description: "Discover how Shreedhar Group has grown to become India's trusted partner for GMP-compliant analytical instruments with 800+ customers and 10,000+ installations.",
    url: "https://shreedhargroup.com/about",
    siteName: "Shreedhar Group",
    locale: "en_IN",
    type: "website",
  },
};

export default function Page() {
  return <AboutPage />;
}
