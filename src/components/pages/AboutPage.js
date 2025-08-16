import {
  Eye,
  Target,
  Award,
  TrendingUp,
  Users,
  Globe,
  Calendar,
  Building,
} from "lucide-react";
import { companyInfo, milestones, awards } from "../../data/company";

export default function AboutPage() {
  return (
    <div className='pt-32 pb-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Hero Section */}
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
            About Shreedhar Instruments
          </h1>
          <p className='text-xl text-gray-600 max-w-4xl mx-auto mb-8'>
            Established in 1998, we are the{" "}
            <strong>most trusted, reliable and ethical organization</strong> in
            analytical instruments for pharmaceutical industry. Our journey
            spans over <strong>28 years of excellence</strong> in serving the
            pharmaceutical and biopharma sectors.
          </p>
          <div className='flex justify-center gap-4 text-sm'>
            <span className='bg-golden-brown-lightest text-golden-brown px-4 py-2 rounded-full font-medium'>
              Since 1998
            </span>
            <span className='bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium'>
              800+ Customers
            </span>
            <span className='bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium'>
              10,000+ Installations
            </span>
          </div>
        </div>

        {/* Mission, Vision, Goal */}
        <div className='grid lg:grid-cols-3 gap-8 mb-20'>
          <div className='text-center p-8 bg-gradient-to-br from-golden-brown-lightest to-golden-brown-lighter rounded-2xl border border-golden-brown'>
            <Eye className='mx-auto text-golden-brown mb-4' size={48} />
            <h3 className='text-xl font-bold text-gray-900 mb-4'>Our Vision</h3>
            <p className='text-gray-700 italic'>{`"${companyInfo.vision}"`}</p>
          </div>
          <div className='text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100'>
            <Target className='mx-auto text-blue-600 mb-4' size={48} />
            <h3 className='text-xl font-bold text-gray-900 mb-4'>
              Our Mission
            </h3>
            <p className='text-gray-700 italic'>{`"${companyInfo.mission}"`}</p>
          </div>
          <div className='text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100'>
            <Award className='mx-auto text-green-600 mb-4' size={48} />
            <h3 className='text-xl font-bold text-gray-900 mb-4'>Our Goal</h3>
            <p className='text-gray-700 italic'>{`"${companyInfo.goal}"`}</p>
          </div>
        </div>

        {/* Company Story */}
        <div className='grid lg:grid-cols-2 gap-12 items-center mb-20'>
          <div>
            <h2 className='text-3xl font-bold text-gray-900 mb-6'>
              Our Journey
            </h2>
            <div className='space-y-4 text-gray-600 leading-relaxed'>
              <p className='text-lg'>
                <strong>Started in 1998 by Mr. Jayant Joshi</strong>, partnering
                with global technology leaders, we deliver cutting-edge
                solutions for pharmaceutical and biopharma manufacturing, life
                sciences, cleanroom monitoring, and laboratory applications.
              </p>
              <p>
                With <strong>28+ years of expertise</strong> in the
                pharmaceutical and industrial sectors, we have established
                ourselves as a leading distributor of analytical instruments
                across India, serving the most stringent regulatory
                environments.
              </p>
              <p>
                Our <strong>customer-centric approach</strong> ensures we
                deliver technically superior solutions complemented by
                comprehensive after-sales service, from IQ/OQ qualification to
                preventive maintenance and rapid breakdown support.
              </p>
              <div className='bg-golden-brown-lightest p-4 rounded-lg border-l-4 border-golden-brown mt-6'>
                <h4 className='font-semibold text-gray-900 mb-2'>
                  Key Differentiator
                </h4>
                <p className='text-gray-700 text-sm'>
                  {`Over the past 28 years, we have built strong foundations as a
                  channel partner, with most business driven by brand
                  recognition of our global principals. We are now transitioning
                  to being recognized as a leading solutions provider under our
                  own brand "Shreedhar Instruments".`}
                </p>
              </div>
            </div>
          </div>

          <div className='relative'>
            <img
              src='https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop'
              alt='Shreedhar Instruments Facilities - Pharmaceutical Analytical Solutions'
              className='w-full h-80 object-cover rounded-2xl shadow-lg'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl'></div>
            <div className='absolute bottom-6 left-6 right-6'>
              <div className='bg-white/90 backdrop-blur-sm p-4 rounded-lg'>
                <h4 className='font-semibold text-gray-900'>
                  Pan-India Presence
                </h4>
                <p className='text-sm text-gray-600'>
                  13+ offices serving pharmaceutical companies nationwide
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className='mb-20'>
          <h2 className='text-3xl font-bold text-gray-900 mb-12 text-center'>
            Our Core Values
          </h2>
          <div className='grid md:grid-cols-3 gap-8'>
            {companyInfo.coreValues.map((value, index) => (
              <div
                key={index}
                className='bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-golden-brown transition-all duration-300 text-center'
              >
                <div className='text-4xl mb-4'>{value.icon}</div>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>
                  {value.title}
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Company Statistics */}
        <div className='bg-gradient-to-r from-golden-brown to-golden-brown-dark rounded-2xl p-8 mb-20 text-white'>
          <div className='text-center mb-8'>
            <h2 className='text-3xl font-bold mb-4'>
              Our Achievements in Numbers
            </h2>
            <p className='text-golden-brown-lightest'>
              Trusted by the pharmaceutical industry across India and beyond
            </p>
          </div>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            {companyInfo.statistics.map((stat, index) => (
              <div key={index} className='text-center'>
                <div className='text-3xl font-bold mb-2'>{stat.number}</div>
                <div className='text-golden-brown-lightest text-sm font-medium mb-1'>
                  {stat.label}
                </div>
                <div className='text-golden-brown-lighter text-xs'>
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones Timeline */}
        <div className='mb-20'>
          <h2 className='text-3xl font-bold text-gray-900 mb-12 text-center'>
            Key Milestones & Growth Journey
          </h2>
          <div className='space-y-6'>
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className='flex items-start gap-6 p-6 bg-white rounded-2xl shadow-sm border-l-4 border-golden-brown hover:shadow-md transition-shadow'
              >
                <div className='bg-golden-brown-lightest text-golden-brown px-4 py-2 rounded-lg font-bold text-lg min-w-[80px] text-center flex-shrink-0'>
                  {milestone.year}
                </div>
                <div className='flex-1'>
                  <h3 className='text-lg font-bold text-gray-900 mb-2'>
                    {milestone.event}
                  </h3>
                  <p className='text-gray-600'>{milestone.description}</p>
                </div>
                <div className='flex-shrink-0'>
                  <Calendar className='text-golden-brown' size={24} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className='mb-20'>
          <h2 className='text-3xl font-bold text-gray-900 mb-12 text-center'>
            Awards & Industry Recognition
          </h2>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {awards.map((award, index) => (
              <div
                key={index}
                className='bg-gradient-to-br from-yellow-50 to-golden-brown-lightest p-6 rounded-2xl border border-golden-brown hover:shadow-lg transition-shadow'
              >
                <Award className='text-golden-brown mb-4' size={32} />
                <h3 className='font-bold text-gray-900 mb-2'>{award.award}</h3>
                <p className='text-golden-brown font-semibold text-sm mb-1'>
                  {award.awardedBy}
                </p>
                <p className='text-gray-600 text-sm mb-2'>{award.year}</p>
                <p className='text-gray-700 text-xs'>{award.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Target Markets */}
        <div className='mb-20'>
          <h2 className='text-3xl font-bold text-gray-900 mb-12 text-center'>
            Our Target Markets
          </h2>
          <div className='grid md:grid-cols-3 gap-8'>
            {[
              {
                title: "Injectable/Formulation Pharmaceuticals",
                description:
                  "Primary focus on sterile drug manufacturing with stringent particle testing requirements",
                icon: <Building className='text-blue-600' size={32} />,
                customers: [
                  "Large pharma companies",
                  "CDMO organizations",
                  "Generic manufacturers",
                ],
                compliance: ["USP <788>", "21 CFR Part 11", "EU GMP Annex 1"],
              },
              {
                title: "OSD (Oral Solid Dosage) API",
                description:
                  "Expanding into API manufacturing segment with specialized analytical requirements",
                icon: <TrendingUp className='text-green-600' size={32} />,
                customers: [
                  "API manufacturers",
                  "Contract manufacturers",
                  "R&D facilities",
                ],
                compliance: [
                  "ICH Q7",
                  "WHO Technical Standards",
                  "cGMP Guidelines",
                ],
              },
              {
                title: "Government & Private Institutions",
                description:
                  "Laboratory and analytical testing facilities requiring certified instruments",
                icon: <Users className='text-purple-600' size={32} />,
                customers: [
                  "Government labs",
                  "Research institutions",
                  "CROs",
                  "Testing laboratories",
                ],
                compliance: [
                  "NABL Standards",
                  "ISO 17025",
                  "Regulatory Guidelines",
                ],
              },
            ].map((market, index) => (
              <div
                key={index}
                className='bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-golden-brown transition-all duration-300'
              >
                <div className='mb-4'>{market.icon}</div>
                <h3 className='text-xl font-bold text-gray-900 mb-3'>
                  {market.title}
                </h3>
                <p className='text-gray-600 mb-4 text-sm leading-relaxed'>
                  {market.description}
                </p>

                <div className='space-y-3'>
                  <div>
                    <h4 className='text-sm font-semibold text-gray-700 mb-2'>
                      Key Customers:
                    </h4>
                    <div className='space-y-1'>
                      {market.customers.map((customer, i) => (
                        <span key={i} className='block text-xs text-gray-600'>
                          • {customer}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className='text-sm font-semibold text-gray-700 mb-2'>
                      Compliance Focus:
                    </h4>
                    <div className='flex flex-wrap gap-1'>
                      {market.compliance.map((comp, i) => (
                        <span
                          key={i}
                          className='bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs'
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* USP Section */}
        <div className='bg-gradient-to-br from-golden-brown-lightest to-golden-brown-lighter rounded-2xl p-8 text-center'>
          <h2 className='text-3xl font-bold text-gray-900 mb-6'>
            Our Unique Value Proposition
          </h2>
          <div className='max-w-4xl mx-auto'>
            <p className='text-lg text-gray-700 mb-6 italic'>
              {`"We commit to deliver the technically best solution complemented by after-sales service. From IQ/OQ qualification and calibration to preventive maintenance and rapid breakdown support, we ensure maximum uptime and process reliability."`}
            </p>
            <p className='text-gray-600'>
              This level of all-India leadership and unmatched service quality
              has earned us a loyal brand reputation for us and our esteemed
              Principals, making us the most preferred partner in the
              pharmaceutical analytical instruments sector.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
