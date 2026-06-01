import CareersPage from "../../components/pages/CareersPage";

export const metadata = {
  title: "Careers at Shreedhar Group | Jobs in Pharmaceutical Instruments Industry",
  description: "Explore career opportunities at Shreedhar Group, India's leading pharmaceutical analytical instruments company. Join a growing team with 27+ years of industry expertise.",
  alternates: { canonical: "https://shreedhargroup.com/careers" },
  openGraph: {
    title: "Careers at Shreedhar Group | Pharmaceutical Instruments Jobs in India",
    description: "Join Shreedhar Group and build a career in India's pharmaceutical instruments sector. View current openings in sales, service, and technical roles.",
    url: "https://shreedhargroup.com/careers",
    siteName: "Shreedhar Group",
    locale: "en_IN",
    type: "website",
  },
};

export default function Page() {
  return <CareersPage />;
}
