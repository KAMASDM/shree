"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Send, Mail } from "lucide-react";
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
      icon: "🤝",
    },
    {
      title: "Solution-Oriented Mindset",
      description: "Challenges are opportunities in disguise.",
      icon: "💡",
    },
    {
      title: "Human Touch in Every Action",
      description:
        "We appreciate empathy, humility, and genuine care in every interaction.",
      icon: "❤️",
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
    <div className='pt-32 pb-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
            Join Our Team of Excellence
          </h1>
        </div>

        <div className='mb-20'>
          <h2 className='text-3xl font-bold text-gray-900 mb-12 text-center'>
            Current Openings
          </h2>
          {loading && <p className='text-center'>Loading job openings...</p>}
          {error && <p className='text-center text-red-500'>{error}</p>}

          <div className='space-y-8'>
            {openPositions.length > 0 &&
              openPositions.map((job) => (
                <div
                  key={job.id}
                  className='bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-amber-600'
                >
                  <div className='p-6'>
                    <div className='flex flex-col lg:flex-row lg:justify-between lg:items-start'>
                      <div className='flex-1'>
                        <h3 className='text-xl font-bold text-gray-900 mb-2'>
                          {job.title}
                        </h3>
                        <div
                          className='prose prose-sm text-gray-600'
                          dangerouslySetInnerHTML={{ __html: job.description }}
                        />
                      </div>
                      <div className='mt-4 lg:mt-0 lg:ml-6 flex-shrink-0'>
                        <button
                          onClick={() => handleApplyClick(job)}
                          className='bg-amber-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-amber-700 flex items-center gap-2'
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

        <div className='text-center bg-gray-900 text-white rounded-2xl p-8'>
          <h3 className='text-2xl font-bold mb-4'>{`Don't See the Perfect Match?`}</h3>
          <button
            onClick={() => handleApplyClick()}
            className='bg-amber-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-700 flex items-center justify-center gap-2'
          >
            <Mail size={18} />
            Send Your Resume
          </button>
        </div>
      </div>
    </div>
  );
}
