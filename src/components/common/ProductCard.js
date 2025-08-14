import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';

export default function ProductCard({ product }) {
  const brandName = product.brand ? product.brand.name : 'Shreedhar';

  return (
    <Link 
      to={`/products/${product.slug}`}
      className="rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group flex flex-col hover:-translate-y-2"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        border: '1px solid rgba(183, 136, 82, 0.15)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.main_image || "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"} 
          alt={product.name}
          className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="absolute top-4 left-4">
          <span 
            className="px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm"
            style={{
              backgroundColor: 'rgba(183, 136, 82, 0.9)',
              color: 'white'
            }}
          >
            {product.category_name}
          </span>
        </div>

        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div 
            className="p-2 rounded-full backdrop-blur-sm"
            style={{backgroundColor: 'rgba(255, 255, 255, 0.9)'}}
          >
            <Star size={16} style={{color: '#b78852'}} />
          </div>
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 
            className="text-xl font-bold mb-3 group-hover:opacity-80 transition-all duration-300 line-clamp-2 leading-tight"
            style={{color: '#8b6a3f'}}
          >
            {product.name}
          </h3>
          
          <div 
            className="mb-6 line-clamp-3 leading-relaxed text-sm"
            style={{color: '#9c7649'}}
            dangerouslySetInnerHTML={{ __html: product.short_description }}
          />

          {product.brand && (
            <div className="mb-4">
              <span 
                className="text-xs font-medium px-3 py-1 rounded-full"
                style={{
                  backgroundColor: 'rgba(183, 136, 82, 0.1)',
                  color: '#8b6a3f'
                }}
              >
                {brandName}
              </span>
            </div>
          )}
        </div>
        
        <div className="mt-auto">
          <div 
            className="w-full py-3 text-center rounded-xl font-semibold shadow-md group-hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-white"
            style={{
              background: 'linear-gradient(135deg, #b78852 0%, #c9955f 100%)'
            }}
          >
            View Details
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>

      <div 
        className="h-1 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{
          background: 'linear-gradient(90deg, #b78852 0%, #c9955f 100%)'
        }}
      ></div>
    </Link>
  );
}