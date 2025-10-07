// src/app/news/[slug]/page.jsx

import BlogDetailPage from "../../../components/pages/BlogDetailPage";
import { apiService, getImageUrl } from "../../../lib/api"; // Import getImageUrl

/**
 * This function generates dynamic metadata for the page based on the post slug.
 * This is what social media platforms like WhatsApp use to create link previews.
 */
export async function generateMetadata({ params }) {
  try {
    // It's safer to access the slug property directly after checking params
    let slug = params?.slug;
    if (Array.isArray(slug)) {
        slug = slug[0];
    }
    if (!slug || typeof slug !== "string") {
        return {
            title: "Invalid Post",
            description: "This post could not be found."
        };
    }

    // Fetch the specific post using the slug
    const { data: post } = await apiService.getBlogPostBySlug(slug);

    if (!post) {
      return {
        title: 'Post Not Found',
        description: 'The post you are looking for does not exist.',
      };
    }

    // Use meta fields from the API if they exist, otherwise fallback to main fields
    const title = post.meta_title || post.title;
    const description = post.meta_description || "Read the latest news and insights from Shreedhar Instruments.";
    const imageUrl = getImageUrl(post.featured_image) || 'https://shreedhargroup.com/wp-content/uploads/2014/12/logo02.png'; // Fallback image

    return {
      title,
      description,
      // Open Graph tags for platforms like Facebook, WhatsApp, LinkedIn
      openGraph: {
        title,
        description,
        type: 'article',
        publishedTime: post.published_date,
        url: `https://shreedhargroup.com/news/${post.slug}`, // Your production URL
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      // Twitter Card tags
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error('Failed to generate metadata for post:', error);
    // Return a generic error metadata object to prevent the build from failing
    return {
      title: 'Error',
      description: 'Could not load page information.',
    };
  }
}

// The default export remains the same
export default function Page() {
  return <BlogDetailPage />;
}