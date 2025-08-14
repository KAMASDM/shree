import { Building, Award, Globe, TrendingUp, CheckCircle, Star, Users, Shield } from 'lucide-react';

export default function PartnersSection() {
  const partners = [
    {
      name: "Beckman Coulter",
      country: "USA",
      since: "2011",
      status: "Excellence Partner",
      icon: <Building className="text-white/80" size={32} />
    },
    {
      name: "Tailin SciTech",
      country: "China",
      since: "2014",
      status: "Gold Distributor",
      icon: <Globe className="text-white/80" size={32} />
    },
    {
      name: "Met One Instruments",
      country: "USA",
      since: "2015",
      status: "Authorized Partner",
      icon: <TrendingUp className="text-white/80" size={32} />
    },
    {
      name: "Eurping",
      country: "Europe",
      since: "2023",
      status: "Latest Partner",
      icon: <Award className="text-white/80" size={32} />
    }
  ];

  return (
    <section 
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: '#b17e46' }}
    >
      {/* Background radial gradient for depth */}
      <div 
        className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 60%)' }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Global Technology Partners
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Trusted partnerships with world-leading instrument manufacturers, bringing cutting-edge pharmaceutical solutions to India.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center transition-all duration-300 hover:bg-white/20 hover:shadow-2xl hover:-translate-y-2 border border-white/20"
            >
              <div className="relative mx-auto w-20 h-20 flex items-center justify-center mb-4 bg-white/10 rounded-2xl shadow-inner group-hover:bg-white/20 transition-colors">
                {partner.icon}
              </div>
              <h3 className="text-xl font-bold text-white">{partner.name}</h3>
              <p className="text-sm text-white/70 mb-4">{partner.country} - Since {partner.since}</p>
              <span className="bg-white/90 text-brand-brown px-4 py-1 rounded-full text-sm font-semibold">
                {partner.status}
              </span>
            </div>
          ))}
        </div>

        {/* Partnership Benefits Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Leading Manufacturers Partner With Us
            </h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <TrendingUp className="text-white/90" size={24} />, title: "Market Leadership", stat: "28+ Years" },
              { icon: <Shield className="text-white/90" size={24} />, title: "Service Excellence", stat: "24/7 Support" },
              { icon: <CheckCircle className="text-white/90" size={24} />, title: "Regulatory Knowledge", stat: "100% Compliant" },
              { icon: <Users className="text-white/90" size={24} />, title: "Customer Relations", stat: "800+ Customers" }
            ].map((benefit, index) => (
              <div key={index} className="group text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-4 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                  {benefit.icon}
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-white">{benefit.stat}</div>
                  <h4 className="text-lg font-semibold text-white/90">{benefit.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}