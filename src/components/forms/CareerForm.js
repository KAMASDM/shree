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
  Loader2,
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        setError(`File size too large. Maximum size is 5MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB.`);
        setResumeFile(null);
        e.target.value = ''; // Clear the input
        return;
      }
      
      // Check file type (optional but recommended)
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      if (!allowedTypes.includes(file.type)) {
        setError('Invalid file type. Please upload a PDF or Word document.');
        setResumeFile(null);
        e.target.value = '';
        return;
      }
      
      setResumeFile(file);
      setError(null); // Clear any previous errors
    }
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

    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      console.log('📤 Submitting job application via API service...');
      console.log('📋 Form data:', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        job: formData.job,
        resumeFileName: resumeFile.name,
        resumeFileSize: resumeFile.size,
      });
      
      // Simulate progress for better UX (since we can't get real upload progress through fetch)
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90; // Stop at 90%, complete when response received
          }
          return prev + 10;
        });
      }, 300);
      
      const response = await apiService.submitJobApplication(submissionData);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      console.log('✅ Job application submitted successfully:', response);

      setIsSubmitted(true);
      setTimeout(() => {
        onClose && onClose();
      }, 4000);
    } catch (err) {
      setIsSubmitting(false);
      setUploadProgress(0);
      console.error("💥 Job application submission error:", err);
      
      // More detailed error handling
      if (err.message.includes('408') || err.message.includes('timeout')) {
        setError("Upload timeout. Your file might be too large. Please try with a smaller resume (max 5MB).");
      } else if (err.response?.data) {
        const errorData = err.response.data;
        if (typeof errorData === 'object') {
          const errorMessages = Object.entries(errorData)
            .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
            .join('\n');
          setError(`Validation errors:\n${errorMessages}`);
        } else {
          setError("An error occurred. Please check all fields and try again.");
        }
      } else {
        setError("Network error. Please check your connection and try again.");
      }
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
            (PDF, DOCX) * <span className='text-xs text-gray-500'>(Max 5MB)</span>
          </label>
          <input
            type='file'
            name='resume'
            onChange={handleFileChange}
            required
            accept='.pdf,.doc,.docx'
            className='w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 cursor-pointer'
          />
          {resumeFile && (
            <div className='mt-2 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2'>
              <CheckCircle size={16} className='text-green-600' />
              <div className='flex-1'>
                <p className='text-sm font-medium text-green-800'>{resumeFile.name}</p>
                <p className='text-xs text-green-600'>
                  {(resumeFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
          )}
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

        {error && <p className='text-red-500 text-sm text-center whitespace-pre-line'>{error}</p>}

        {/* Upload Progress Bar */}
        {isSubmitting && (
          <div className='space-y-2'>
            <div className='flex items-center justify-between text-sm'>
              <span className='text-amber-700 font-medium flex items-center gap-2'>
                <Loader2 size={16} className='animate-spin' />
                Uploading resume...
              </span>
              <span className='text-amber-600 font-semibold'>{uploadProgress}%</span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2.5 overflow-hidden'>
              <div 
                className='bg-gradient-to-r from-amber-500 to-orange-500 h-2.5 rounded-full transition-all duration-300 ease-out'
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className='text-xs text-gray-500 text-center'>
              Please wait while we upload your application. This may take a few moments...
            </p>
          </div>
        )}

        <div className='flex gap-4'>
          <button
            type='submit'
            disabled={isSubmitting}
            className={`flex-1 py-4 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:shadow-lg'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className='animate-spin' />
                Submitting...
              </>
            ) : (
              <>
                <Send size={20} />
                Submit Application
              </>
            )}
          </button>
          {onClose && (
            <button
              type='button'
              onClick={onClose}
              disabled={isSubmitting}
              className={`px-6 py-4 border-2 rounded-lg font-semibold transition-all duration-200 ${
                isSubmitting
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 text-gray-700 hover:border-amber-600 hover:text-amber-600'
              }`}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
