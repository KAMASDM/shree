import {
  ArrowRight,
  Phone,
  Award,
  FlaskConical,
  Shield,
  Users,
  Star,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className='relative min-h-screen flex items-center overflow-hidden'>
      {/* Background YouTube Video */}
      <div className='absolute inset-0 z-0'>
        <iframe
          className='w-full h-full object-cover'
          src="https://youtu.be/jeVjfNQ_pAI?si=MMVJ8ap95-upXLak"
          title="Pharmaceutical Laboratory Background"
          allow="autoplay; encrypted-media"
          style={{
            minWidth: '100vw',
            minHeight: '100vh',
            width: 'auto',
            height: 'auto',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none'
          }}
        ></iframe>
        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-800/75 to-slate-900/85'></div>
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-amber-900/10 to-amber-900/20'></div>
      </div>

      {/* Content */}
      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
        <div className='grid lg:grid-cols-12 gap-8 lg:gap-12 items-center py-20 min-h-screen'>
          {/* Left Content */}
          <div className='lg:col-span-8 space-y-6 md:space-y-8'>
            {/* Trust Badge */}
            <div 
              className='inline-flex items-center gap-2 md:gap-3 rounded-full px-4 py-2 md:px-6 md:py-3 shadow-sm'
              style={{
                backgroundColor: "rgba(255, 200, 87, 0.1)",
                border: "1px solid rgba(255, 200, 87, 0.3)",
                backdropFilter: "blur(10px)"
              }}
            >
              <Award size={18} style={{ color: "#fbbf24" }} />
              <span className='font-medium text-sm md:text-base text-amber-100'>
                Trusted by 800+ Pharmaceutical Companies
              </span>
            </div>

            {/* Main Headline */}
            <div className='space-y-4 md:space-y-6'>
              <h1 className='text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white'>
                {`India's Leading`}
                <span 
                  className='block bg-gradient-to-r bg-clip-text text-transparent'
                  style={{ backgroundImage: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)" }}
                >
                  FDA Compliant
                </span>
                <span className='block'>Instrument Partner</span>
              </h1>

              <p className='text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl text-slate-300'>
                28+ years of excellence in delivering cutting-edge analytical
                instruments and comprehensive validation services for
                pharmaceutical manufacturing.
              </p>
            </div>

            {/* Key Value Props */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4'>
              {[
                { icon: <Shield size={16} />, text: "21 CFR Part 11 Ready" },
                { icon: <CheckCircle size={16} />, text: "Complete IQ/OQ/PQ" },
                { icon: <Star size={16} />, text: "24/7 Expert Support" },
              ].map((prop, index) => (
                <div
                  key={index}
                  className='flex items-center gap-2 md:gap-3 rounded-lg px-3 py-2 md:px-4 md:py-3 shadow-sm'
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(10px)"
                  }}
                >
                  <div style={{ color: "#b78852" }}>{prop.icon}</div>
                  <span className='font-medium text-sm md:text-base' style={{ color: "#8b6a3f" }}>
                    {prop.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row gap-3 md:gap-4'>
              <Link
                href='/products'
                className='group px-6 py-3 md:px-8 md:py-4 rounded-xl text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 text-white'
                style={{
                  background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                }}
              >
                <FlaskConical size={18} />
                <span>Explore Our Solutions</span>
                <ArrowRight
                  size={18}
                  className='group-hover:translate-x-1 transition-transform'
                />
              </Link>

              <Link
                href='/contact'
                className='group px-6 py-3 md:px-8 md:py-4 rounded-xl text-base md:text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 md:gap-3 text-white'
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  border: "2px solid rgba(255, 255, 255, 0.3)",
                  backdropFilter: "blur(10px)"
                }}
              >
                <Phone size={18} />
                Schedule Consultation
              </Link>
            </div>

            {/* Client Logos */}
            <div className='pt-6 md:pt-8'>
              <p className='text-sm mb-3 md:mb-4 text-slate-400'>
                Trusted by industry leaders
              </p>
              <div className='flex flex-wrap items-center gap-4 md:gap-8'>
                {[
                  "Beckman Coulter",
                  "Met One",
                  "Tailin SciTech", 
                  "Eurping"
                ].map((partner, index) => (
                  <div key={index} className='font-semibold text-sm opacity-80 text-white/80'>
                    {partner}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Stats & Compliance */}
          <div className='lg:col-span-4 space-y-6 md:space-y-8'>
            {/* Stats Grid */}
            <div className='grid grid-cols-2 gap-3 md:gap-4'>
              {[
                {
                  number: "10K+",
                  label: "Installations",
                  sublabel: "Across India",
                },
                {
                  number: "800+",
                  label: "Customers",
                  sublabel: "Pharma Companies",
                },
                { number: "28+", label: "Years", sublabel: "Experience" },
                { number: "13", label: "Offices", sublabel: "Pan-India" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className='rounded-xl md:rounded-2xl p-4 md:p-6 text-center hover:scale-105 transition-all duration-300 shadow-sm'
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid rgba(183, 136, 82, 0.15)",
                    backdropFilter: "blur(10px)"
                  }}
                >
                  <div className='text-2xl md:text-3xl font-bold mb-1 md:mb-2' style={{ color: "#b78852" }}>
                    {stat.number}
                  </div>
                  <div className='font-semibold text-sm' style={{ color: "#8b6a3f" }}>
                    {stat.label}
                  </div>
                  <div className='text-xs' style={{ color: "#9c7649" }}>{stat.sublabel}</div>
                </div>
              ))}
            </div>

            {/* Compliance Certifications */}
            <div 
              className='rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm'
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                border: "1px solid rgba(183, 136, 82, 0.15)",
                backdropFilter: "blur(10px)"
              }}
            >
              <h3 className='font-semibold mb-3 md:mb-4 flex items-center gap-2' style={{ color: "#8b6a3f" }}>
                <Shield size={18} style={{ color: "#b78852" }} />
                Regulatory Compliance
              </h3>
              <div className='grid grid-cols-1 gap-2 md:gap-3'>
                {[
                  "21 CFR Part 11 Electronic Records",
                  "USP <788> Particulate Matter",
                  "EU GMP Annex 1 Compliance",
                  "ISO 9001:2015 Certified",
                ].map((cert, index) => (
                  <div key={index} className='flex items-center gap-2 md:gap-3'>
                    <CheckCircle size={14} className='flex-shrink-0' style={{ color: "#22c55e" }} />
                    <span className='text-xs md:text-sm' style={{ color: "#9c7649" }}>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className='absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent'></div>
    </section>
  );
}