import ProductsPage from "../../components/pages/ProductsPage";
import { apiService } from "../../lib/api";

export const dynamic = "force-dynamic";

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

export default async function Page() {
  let initialProducts = null;

  try {
    const response = await apiService.getAllProducts();
    if (Array.isArray(response?.data)) initialProducts = response.data;
  } catch (error) {
    console.error("Failed to render products on the server:", error);
  }

  return <ProductsPage initialProducts={initialProducts} />;
}
