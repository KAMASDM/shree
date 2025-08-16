import {
  ArrowRight,
  Phone,
  Award,
  FlaskConical,
  Shield,
  Users,
  Star,
  CheckCircle,
  PlayCircle,
} from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className='relative min-h-screen flex items-center overflow-hidden'>
      {/* Background Image */}
      <div className='absolute inset-0 z-0'>
        <img
          src='https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1920&h=1080&fit=crop&crop=center'
          alt='Modern Pharmaceutical Laboratory'
          className='w-full h-full object-cover object-center'
        />
        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-800/75 to-slate-900/85'></div>
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-amber-900/10 to-amber-900/20'></div>
      </div>

      {/* Content */}
      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
        <div className='grid lg:grid-cols-12 gap-12 items-center min-h-screen py-20'>
          {/* Left Content */}
          <div className='lg:col-span-7 space-y-8'>
            {/* Trust Badge */}
            <div className='inline-flex items-center gap-3 bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 rounded-full px-6 py-3'>
              <Award className='text-amber-400' size={20} />
              <span className='text-amber-100 font-medium'>
                Trusted by 800+ Pharmaceutical Companies
              </span>
            </div>

            {/* Main Headline */}
            <div className='space-y-6'>
              <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white'>
                {`India's Leading`}
                <span className='block bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent'>
                  FDA Compliant
                </span>
                <span className='block'>Instrument Partner</span>
              </h1>

              <p className='text-xl md:text-2xl text-slate-300 leading-relaxed max-w-2xl'>
                28+ years of excellence in delivering cutting-edge analytical
                instruments and comprehensive validation services for
                pharmaceutical manufacturing.
              </p>
            </div>

            {/* Key Value Props */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              {[
                { icon: <Shield size={18} />, text: "21 CFR Part 11 Ready" },
                { icon: <CheckCircle size={18} />, text: "Complete IQ/OQ/PQ" },
                { icon: <Star size={18} />, text: "24/7 Expert Support" },
              ].map((prop, index) => (
                <div
                  key={index}
                  className='flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10'
                >
                  <div className='text-amber-400'>{prop.icon}</div>
                  <span className='text-white font-medium text-sm'>
                    {prop.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row gap-4'>
              <Link
                href='/products'
                className='group bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-2xl hover:shadow-amber-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3'
              >
                <FlaskConical size={20} />
                <span>Explore Our Solutions</span>
                <ArrowRight
                  size={20}
                  className='group-hover:translate-x-1 transition-transform'
                />
              </Link>

              <Link
                href='/contact'
                className='group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3'
              >
                <Phone size={20} />
                Schedule Consultation
              </Link>
            </div>

            {/* Client Logos */}
            <div className='pt-8'>
              <p className='text-slate-400 text-sm mb-4'>
                Trusted by industry leaders
              </p>
              <div className='flex items-center gap-8 opacity-60'>
                <div className='text-white/80 font-semibold text-sm'>
                  Beckman Coulter
                </div>
                <div className='text-white/80 font-semibold text-sm'>
                  Met One
                </div>
                <div className='text-white/80 font-semibold text-sm'>
                  Tailin SciTech
                </div>
                <div className='text-white/80 font-semibold text-sm'>
                  Eurping
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Stats & Video */}
          <div className='lg:col-span-5 space-y-8'>
            {/* Video Preview */}
            <div className='relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-white/10'>
              <div className='aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center'>
                <div className='text-center space-y-4'>
                  <button className='group bg-white/10 backdrop-blur-sm p-6 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300'>
                    <PlayCircle
                      size={32}
                      className='text-amber-400 group-hover:scale-110 transition-transform'
                    />
                  </button>
                  <div className='text-white'>
                    <h3 className='font-semibold text-lg'>
                      See Our Solutions in Action
                    </h3>
                    <p className='text-slate-300 text-sm'>
                      Watch how we deliver FDA compliance
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className='grid grid-cols-2 gap-4'>
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
                  className='bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center hover:bg-white/10 transition-all duration-300'
                >
                  <div className='text-3xl font-bold text-amber-400 mb-2'>
                    {stat.number}
                  </div>
                  <div className='text-white font-semibold text-sm'>
                    {stat.label}
                  </div>
                  <div className='text-slate-400 text-xs'>{stat.sublabel}</div>
                </div>
              ))}
            </div>

            {/* Compliance Certifications */}
            <div className='bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10'>
              <h3 className='text-white font-semibold mb-4 flex items-center gap-2'>
                <Shield className='text-amber-400' size={20} />
                Regulatory Compliance
              </h3>
              <div className='grid grid-cols-1 gap-3'>
                {[
                  "21 CFR Part 11 Electronic Records",
                  "USP <788> Particulate Matter",
                  "EU GMP Annex 1 Compliance",
                  "ISO 9001:2015 Certified",
                ].map((cert, index) => (
                  <div key={index} className='flex items-center gap-3'>
                    <CheckCircle size={16} className='text-green-400' />
                    <span className='text-slate-300 text-sm'>{cert}</span>
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
