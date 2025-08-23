"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Send, Mail, Heart, Award, TrendingUp } from "lucide-react";
import CareerForm from "../forms/CareerForm";

export default function CareersPage() {
  const [openPositions, setOpenPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null); // Will hold the full job object

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "https://sweekarme.in/shree/api/hr/jobs/"
        );
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

  const careerValues = [
    {
      title: "Long-Term Association",
      description: "We invest in people who are ready to grow with us.",
      icon: <Heart size={32} className="text-red-400" />,
    },
    {
      title: "Solution-Oriented Mindset",
      description: "Challenges are opportunities in disguise.",
      icon: <Award size={32} className="text-blue-400" />,
    },
    {
      title: "Human Touch in Every Action",
      description:
        "We appreciate empathy, humility, and genuine care in every interaction.",
      icon: <TrendingUp size={32} className="text-purple-400" />,
    },
  ];

  if (showForm) {
    return (
      <div className='pt-32 pb-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <CareerForm
            selectedJob={selectedJob} // Pass the full job object
            allJobs={openPositions} // Pass the list of all jobs
            onClose={() => setShowForm(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className='pt-32 pb-20' style={{ background: "linear-gradient(135deg, #fefcf8 0%, #fdf8f0 50%, #fcf4e8 100%)" }}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
            Join Our Team of Excellence
          </h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: "#9c7649" }}>
            Shape your career with a leader in pharmaceutical analytical solutions and service.
          </p>
        </div>

        {/* Redesigned Greeting Text Section */}
        <div 
          className="mb-20 p-8 rounded-3xl shadow-lg text-center"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            border: "1px solid rgba(183, 136, 82, 0.15)",
            backdropFilter: "blur(10px)"
          }}
        >
          <p className="text-lg leading-relaxed max-w-4xl mx-auto" style={{ color: "#8b6a3f" }}>
            <span className="font-bold text-xl" style={{ color: "#b78852" }}>Greetings!</span>
            <br/><br/>
            Shreedhar Instruments is a leading provider of products and services in the Pharma/Life Science Manufacturing segment. With a group strength of over 80+ people, we have been operating since 1998 and are based in Vadodara, Gujarat. Our expertise extends to instruments for Environment Monitoring and Industrial Health & Safety. We are the exclusive distributors of various leading international manufacturers in India, with a focus on providing technically superior solutions and prompt after-sales service.
          </p>
        </div>

        <div className='mb-20'>
          <h2 className='text-3xl font-bold text-gray-900 mb-12 text-center' style={{ color: "#8b6a3f" }}>
            Current Openings
          </h2>
          {loading && <p className='text-center'>Loading job openings...</p>}
          {error && <p className='text-center text-red-500'>{error}</p>}

          <div className='space-y-8'>
            {openPositions.length > 0 &&
              openPositions.map((job) => (
                <div
                  key={job.id}
                  className='bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-amber-600 transition-all duration-300'
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid rgba(183, 136, 82, 0.15)",
                    backdropFilter: "blur(10px)"
                  }}
                >
                  <div className='p-6'>
                    <div className='flex flex-col lg:flex-row lg:justify-between lg:items-start'>
                      <div className='flex-1'>
                        <h3 className='text-xl font-bold text-gray-900 mb-2' style={{ color: "#8b6a3f" }}>
                          {job.title}
                        </h3>
                        <div
                          className='prose prose-sm text-gray-600'
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
              ))}
          </div>
        </div>

        {/* Call to Action for General Application */}
        <div 
          className="text-center p-8 rounded-3xl"
          style={{
            backgroundColor: "rgba(183, 136, 82, 0.1)",
            border: "1px solid rgba(183, 136, 82, 0.2)",
          }}
        >
          <h3 className='text-2xl font-bold mb-4' style={{ color: "#8b6a3f" }}>{`Don't See the Perfect Match?`}</h3>
          <button
            onClick={() => handleApplyClick()}
            className='text-white px-8 py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg'
            style={{ background: "linear-gradient(135deg, #b78852 0%, #c9955f 100%)" }}
          >
            <Mail size={18} />
            Send Your Resume
          </button>
        </div>
      </div>
    </div>
  );
}