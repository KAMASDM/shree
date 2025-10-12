// src/components/common/ProductCard.js
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "../../lib/api";

export default function ProductCard({ product }) {
  const brandName = product.brand ? product.brand.name : "Shreedhar";

  return (
    <Link
      href={`/products/${product.slug}`}
      className='rounded-2xl md:rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group flex flex-col hover:-translate-y-1 md:hover:-translate-y-2 active:scale-95'
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        border: "1px solid rgba(183, 136, 82, 0.15)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Image Section */}
      <div className='relative overflow-hidden'>
        <Image
          src={
            getImageUrl(product.main_image) ||
            "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
          }
          alt={product.name}
          width={400}
          height={300}
          className='w-full h-32 sm:h-40 md:h-48 lg:h-52 object-cover group-hover:scale-110 transition-transform duration-500'
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

        {/* Category Badge */}
        <div className='absolute top-3 left-3 md:top-4 md:left-4'>
          <span
            className='px-2 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold shadow-lg backdrop-blur-sm'
            style={{
              backgroundColor: "rgba(183, 136, 82, 0.9)",
              color: "white",
            }}
          >
            {product.category_name}
          </span>
        </div>

        {/* Star Icon - Hidden on mobile for cleaner look */}
        <div className='hidden md:block absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
          <div
            className='p-2 rounded-full backdrop-blur-sm'
            style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
          >
            <Star size={16} style={{ color: "#b78852" }} />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className='p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col flex-grow'>
        <div className='flex-grow'>
          {/* Product Title */}
          <h3
            className='text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-1.5 sm:mb-2 md:mb-3 group-hover:opacity-80 transition-all duration-300 line-clamp-2 leading-tight'
            style={{ color: "#8b6a3f" }}
          >
            {product.name}
          </h3>

          {/* Product Description */}
          <div
            className='mb-2 sm:mb-3 md:mb-4 line-clamp-2 md:line-clamp-3 leading-relaxed text-xs sm:text-sm'
            style={{ color: "#9c7649" }}
            dangerouslySetInnerHTML={{ __html: product.short_description }}
          />

          {/* Brand Badge */}
          {product.brand && (
            <div className='mb-3 md:mb-4'>
              <span
                className='text-xs font-medium px-2 py-1 md:px-3 md:py-1 rounded-full'
                style={{
                  backgroundColor: "rgba(183, 136, 82, 0.1)",
                  color: "#8b6a3f",
                }}
              >
                {brandName}
              </span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className='mt-auto'>
          <div
            className='w-full py-2.5 md:py-3 text-center rounded-xl font-semibold shadow-md group-hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-white text-sm md:text-base'
            style={{
              background: "linear-gradient(135deg, #b78852 0%, #c9955f 100%)",
            }}
          >
            <span className='hidden sm:inline'>View Details</span>
            <span className='sm:hidden'>View</span>
            <ArrowRight
              size={16}
              className='group-hover:translate-x-1 transition-transform duration-300'
            />
          </div>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div
        className='h-0.5 md:h-1 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left'
        style={{
          background: "linear-gradient(90deg, #b78852 0%, #c9955f 100%)",
        }}
      ></div>
    </Link>
  );
}