"use client";
import { useState, useEffect, useMemo } from "react";
import {
  Send,
  Mail,
  Heart,
  Award,
  TrendingUp,
  Briefcase,
  CheckCircle,
  Zap,
  Users,
  Search,
  MapPin,
  X,
  SlidersHorizontal,
  Info,
} from "lucide-react";
import CareerForm from "../forms/CareerForm";
import { apiService } from "../../lib/api";

export default function CareersPage() {
  const [openPositions, setOpenPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await apiService.getJobs();
        setOpenPositions(response.data);
      } catch (err) {
        setError("Failed to load job openings. Please try again later.");
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleApplyClick = (job = null) => {
    setSelectedJob(job);
    setShowForm(true);
  };

    const whatWeLookFor = [
    {
      icon: <TrendingUp size={28} className="text-blue-500" />,
      title: "Long-Term Association",
      description:
        "We invest in people who are ready to grow with us. If you're seeking a long-term journey where your career evolves alongside the company’s progress, you’ll feel right at home here.",
    },
    {
      icon: <CheckCircle size={28} className="text-green-500" />,
      title: "Solution-Oriented Mindset",
      description:
        "Challenges are opportunities in disguise. We value individuals who focus on finding solutions, not just spotting problems.",
    },
    {
      icon: <Heart size={28} className="text-red-500" />,
      title: "Human Touch in Every Action",
      description:
        "Whether it’s working with a client, colleague, or vendor — we appreciate empathy, humility, and genuine care in every interaction.",
    },
    {
      icon: <Zap size={28} className="text-yellow-500" />,
      title: "Proactiveness",
      description:
        "We love team members who anticipate needs, act early, and don’t wait to be told. Your initiative can spark real impact here.",
    },
    {
      icon: <Users size={28} className="text-purple-500" />,
      title: "Ownership with Team Spirit",
      description:
        "Take responsibility like it's your own business, but never forget you’re part of a team. We thrive on collaboration, accountability, and shared success.",
    },
  ];

  // Memoized list for location filter
  const locations = useMemo(() => ["All", ...new Set(openPositions.map(j => j.location).filter(Boolean))], [openPositions]);

  // Filtering logic
  const filteredPositions = useMemo(() => {
    return openPositions.filter(job => {
      const matchesSearch = searchTerm === "" ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLocation = selectedLocation === "All" || job.location === selectedLocation;
      
      return matchesSearch && matchesLocation;
    });
  }, [openPositions, searchTerm, selectedLocation]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedLocation("All");
  };

  if (showForm) {
    return (
      <div className='pt-32 pb-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <CareerForm
            selectedJob={selectedJob}
            allJobs={openPositions}
            onClose={() => setShowForm(false)}
          />
        </div>
      </div>
    );
  }

  const FilterControls = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: "#8b6a3f" }}>Search by Keyword</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="e.g., Engineer, Sales"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      {/* Location Filter */}
      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: "#8b6a3f" }}>Location</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg appearance-none"
          >
            {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </select>
        </div>
      </div>

      {/* Clear Filters Button */}
      {(searchTerm || selectedLocation !== "All") && (
        <button
          onClick={clearFilters}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
        >
          <X size={16} /> Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div
      className='pt-32 pb-20'
      style={{ background: "linear-gradient(135deg, #fefcf8 0%, #fdf8f0 50%, #fcf4e8 100%)" }}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
            Join Our Team of Excellence
          </h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: "#9c7649" }}>
            Shape your career with a leader in pharmaceutical analytical solutions and service.
          </p>
        </div>
        
        {/* Main Content Layout */}
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Column: Filters & About (Desktop) */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24 space-y-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <h3 className="text-lg font-bold mb-4" style={{ color: "#8b6a3f" }}>Filter Openings</h3>
                <FilterControls />
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "#8b6a3f" }}>
                  <Award size={20} /> Why Work With Us?
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Shreedhar Instruments is a leading provider of products and services in the Pharma/Life Science Manufacturing segment. With a group strength of over 80+ people, we have been operating since 1998 and are based in Vadodara, Gujarat. Our expertise extends to instruments for Environment Monitoring and Industrial Health & Safety. We are the exclusive distributors of various leading international manufacturers in India, with a focus on providing technically superior solutions and prompt after-sales service.
                </p>
              </div>
            </div>
          </aside>
          
          {/* Right Column: Job Listings */}
          <main className="lg:col-span-8 xl:col-span-9">
            <div className='mb-8'>
              {/* Mobile Filter Button */}
              <div className="lg:hidden mb-6">
                <button
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold text-white"
                  style={{ background: "linear-gradient(135deg, #b78852 0%, #c9955f 100%)" }}
                >
                  <SlidersHorizontal size={16} /> Filter & Search
                </button>
              </div>

              {/* Mobile Filter Panel */}
              {showMobileFilters && (
                <div className="lg:hidden bg-white p-6 rounded-2xl shadow-lg border mb-6">
                   <h3 className="text-lg font-bold mb-4" style={{ color: "#8b6a3f" }}>Filter Openings</h3>
                  <FilterControls />
                </div>
              )}

              <h2 className='text-2xl font-bold text-gray-900' style={{ color: "#8b6a3f" }}>
                Current Openings ({filteredPositions.length})
              </h2>
            </div>
            
            {loading && <p className='text-center py-10'>Loading job openings...</p>}
            {error && <p className='text-center text-red-500 py-10'>{error}</p>}

            <div className='space-y-6'>
              {!loading && !error && filteredPositions.length > 0 ? (
                filteredPositions.map((job) => (
                  <div
                    key={job.id}
                    className='bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-amber-600 transition-all duration-300'
                  >
                    <div className='p-6'>
                      <div className='flex flex-col lg:flex-row lg:justify-between lg:items-start'>
                        <div className='flex-1'>
                          <h3 className='text-xl font-bold text-gray-900 mb-2' style={{ color: "#8b6a3f" }}>
                            {job.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 mb-4">
                            {job.location && <span className="flex items-center gap-1.5"><MapPin size={14} /> {job.location}</span>}
                          </div>
                          <div
                            className='prose prose-sm text-gray-600 line-clamp-3'
                            style={{ color: "#9c7649" }}
                            dangerouslySetInnerHTML={{ __html: job.description }}
                          />
                        </div>
                        <div className='mt-4 lg:mt-0 lg:ml-6 flex-shrink-0'>
                          <button
                            onClick={() => handleApplyClick(job)}
                            className='text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-amber-700 flex items-center gap-2 transition-all duration-300'
                            style={{ background: "linear-gradient(135deg, #b78852 0%, #c9955f 100%)" }}
                          >
                            <Send size={16} />
                            Apply Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                !loading && (
                  <div className="text-center py-16 bg-white rounded-2xl border">
                    <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold mb-2" style={{ color: "#8b6a3f" }}>No Matching Openings</h3>
                    <p className="text-gray-600 mb-6">
                      There are currently no open positions that match your criteria.
                    </p>
                    <button
                      onClick={clearFilters}
                      className='text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg mx-auto'
                      style={{ background: "linear-gradient(135deg, #b78852 0%, #c9955f 100%)" }}
                    >
                      Clear Filters
                    </button>
                  </div>
                )
              )}
            </div>
            
            <div
              className="mt-12 text-center p-8 rounded-3xl"
              style={{
                backgroundColor: "rgba(183, 136, 82, 0.1)",
                border: "1px solid rgba(183, 136, 82, 0.2)",
              }}
            >
              <h3 className='text-2xl font-bold mb-4' style={{ color: "#8b6a3f" }}>{`Don't See the Perfect Match?`}</h3>
              <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                We are always looking for talented individuals. If you believe you have what it takes, send us your resume for future consideration.
              </p>
              <button
                onClick={() => handleApplyClick()}
                className='text-white px-8 py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg'
                style={{ background: "linear-gradient(135deg, #b78852 0%, #c9955f 100%)" }}
              >
                <Mail size={18} />
                Send Your Resume
              </button>
            </div>
          </main>
        </div>

        {/* What We Look For Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: "#8b6a3f" }}>
              What We Look for in You
            </h2>
            <p className="text-lg max-w-3xl mx-auto" style={{ color: "#9c7649" }}>
              At Shreedhar Instruments, we believe that great people build great companies. Here are the values that matter most to us:
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whatWeLookFor.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                style={{
                  borderLeft: "4px solid",
                  borderLeftColor:
                    index % 3 === 0
                      ? "#3b82f6"
                      : index % 3 === 1
                      ? "#10b981"
                      : "#8b5cf6",
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  {value.icon}
                  <h3 className="text-xl font-bold text-gray-800">
                    {value.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}