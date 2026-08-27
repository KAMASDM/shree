import HomePage from "../components/pages/HomePage";
import { apiService } from "../lib/api";

export const metadata = {
  alternates: {
    canonical: "https://shreedhargroup.com",
  },
};

// Keep API-managed homepage content fresh without reverting to client-only HTML.
export const revalidate = 600;

async function loadHomepageData() {
  const [featuredResult, partnersResult, clientsResult] = await Promise.allSettled([
    apiService.getFeaturedProducts(),
    apiService.getPartners(),
    apiService.getClients(),
  ]);

  const getData = (result) => {
    if (result.status !== "fulfilled" || result.value?.error) return null;
    return Array.isArray(result.value?.data) ? result.value.data : null;
  };

  const partners = getData(partnersResult);

  return {
    initialFeaturedProducts: getData(featuredResult),
    initialPartners: partners?.filter((partner) => partner.is_active_partnership) ?? null,
    initialClients: getData(clientsResult),
  };
}

export default async function Page() {
  const homepageData = await loadHomepageData();
  return <HomePage {...homepageData} />;
}
