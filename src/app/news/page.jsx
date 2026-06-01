import NewsPage from "../../components/pages/NewsPage";

export const metadata = {
  title: "News & Updates | Pharmaceutical Instruments Industry | Shreedhar Group",
  description: "Stay updated with the latest news, product launches, regulatory updates, and industry insights from Shreedhar Group — India's leading pharmaceutical analytical instruments supplier.",
  alternates: { canonical: "https://shreedhargroup.com/news" },
  openGraph: {
    title: "News & Updates | Shreedhar Group",
    description: "Latest news, announcements, and industry updates from Shreedhar Group covering pharmaceutical analytical instruments, GMP compliance, and cleanroom monitoring.",
    url: "https://shreedhargroup.com/news",
    siteName: "Shreedhar Group",
    locale: "en_IN",
    type: "website",
  },
};

export default function Page() {
  return <NewsPage />;
}
