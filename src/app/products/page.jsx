import ProductsPage from "../../components/pages/ProductsPage";

export const metadata = {
  title: "Pharmaceutical Analytical Instruments & Cleanroom Equipment | Shreedhar Group",
  description: "Explore Shreedhar Group's complete range of FDA-compliant analytical instruments — particle counters, integrity testers, isolators, water purification systems, and more for pharmaceutical and GMP environments.",
  alternates: { canonical: "https://shreedhargroup.com/products" },
  openGraph: {
    title: "Pharmaceutical Analytical Instruments & Cleanroom Equipment | Shreedhar Group",
    description: "Browse GMP-compliant particle counters, integrity testers, isolators, polarimeters, refractometers, and water purification systems for India's pharmaceutical industry.",
    url: "https://shreedhargroup.com/products",
    siteName: "Shreedhar Group",
    locale: "en_IN",
    type: "website",
  },
};

export default function Page() {
  return <ProductsPage />;
}
