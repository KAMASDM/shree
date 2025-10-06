"use client";
import { useState } from "react";
import { apiService } from "../../lib/api";
import {
  Send,
  User,
  Mail,
  Phone,
  Briefcase,
  FileText,
  UploadCloud,
  CheckCircle,
} from "lucide-react";

export default function CareerForm({ selectedJob, allJobs, onClose }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    job: selectedJob ? selectedJob.id : "", // Pre-select the job ID
    cover_letter: "",
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      setError("A resume file is required.");
      return;
    }
    setError(null);

    const submissionData = new FormData();
    // Append all the fields the backend model expects
    submissionData.append("first_name", formData.firstName);
    submissionData.append("last_name", formData.lastName);
    submissionData.append("email", formData.email);
    submissionData.append("phone", formData.phone);
    submissionData.append("job", formData.job);
    submissionData.append("cover_letter", formData.cover_letter);
    submissionData.append("resume", resumeFile);

    try {
      console.log('📤 Submitting job application via API service...');
      const response = await apiService.submitJobApplication(submissionData);
      console.log('✅ Job application submitted successfully:', response);

      setIsSubmitted(true);
      setTimeout(() => {
        onClose && onClose();
      }, 4000);
    } catch (err) {
      setError("An error occurred. Please check all fields and try again.");
      console.error("💥 Job application submission error:", err);
    }
  };

  if (isSubmitted) {
    return (
      <div className='bg-white p-8 rounded-2xl shadow-xl max-w-2xl mx-auto'>
        <div className='text-center'>
          <CheckCircle className='mx-auto text-green-600 mb-4' size={64} />
          <h3 className='text-2xl font-bold text-gray-900 mb-4'>
            Application Submitted!
          </h3>
          <p className='text-gray-600'>
            Thank you for your interest. Our HR team will review your profile
            and contact you if your qualifications match our requirements.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white p-8 rounded-2xl shadow-xl max-w-4xl mx-auto'>
      <h3 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2'>
        <Briefcase className='text-amber-600' /> Job Application Form
      </h3>

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='grid md:grid-cols-2 gap-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              First Name *
            </label>
            <input
              type='text'
              name='firstName'
              onChange={handleInputChange}
              required
              className='w-full px-4 py-3 border border-gray-300 rounded-lg'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Last Name *
            </label>
            <input
              type='text'
              name='lastName'
              onChange={handleInputChange}
              required
              className='w-full px-4 py-3 border border-gray-300 rounded-lg'
            />
          </div>
        </div>

        <div className='grid md:grid-cols-2 gap-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Email Address *
            </label>
            <input
              type='email'
              name='email'
              onChange={handleInputChange}
              required
              className='w-full px-4 py-3 border border-gray-300 rounded-lg'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Phone Number *
            </label>
            <input
              type='tel'
              name='phone'
              onChange={handleInputChange}
              required
              className='w-full px-4 py-3 border border-gray-300 rounded-lg'
            />
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Position Applying For *
          </label>
          <select
            name='job'
            value={formData.job}
            onChange={handleInputChange}
            required
            className='w-full px-4 py-3 border border-gray-300 rounded-lg'
          >
            <option value=''>Select a position...</option>
            {allJobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title}
              </option>
            ))}
            {!selectedJob && (
              <option value=''>Other / General Application</option>
            )}
          </select>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            <UploadCloud size={16} className='inline mr-2' /> Upload Resume
            (PDF, DOCX) *
          </label>
          <input
            type='file'
            name='resume'
            onChange={handleFileChange}
            required
            accept='.pdf,.doc,.docx'
            className='w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            <FileText size={16} className='inline mr-2' /> Cover Letter /
            Additional Information
          </label>
          <textarea
            rows={4}
            name='cover_letter'
            onChange={handleInputChange}
            className='w-full px-4 py-3 border border-gray-300 rounded-lg'
            placeholder="Tell us anything else you'd like us to know..."
          ></textarea>
        </div>

        {error && <p className='text-red-500 text-sm text-center'>{error}</p>}

        <div className='flex gap-4'>
          <button
            type='submit'
            className='flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 rounded-lg text-lg font-semibold flex items-center justify-center gap-2'
          >
            <Send size={20} />
            Submit Application
          </button>
          {onClose && (
            <button
              type='button'
              onClick={onClose}
              className='px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold'
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
