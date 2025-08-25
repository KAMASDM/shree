// src/app/privacy/page.jsx
import React from 'react';
import { Shield, Lock, Eye, UserCheck, FileText, Mail, Phone, MapPin } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div 
      className="min-h-screen pt-32 pb-20"
      style={{ background: "linear-gradient(135deg, #fefcf8 0%, #fdf8f0 50%, #fcf4e8 100%)" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6" style={{ backgroundColor: "rgba(183, 136, 82, 0.1)", color: "#8b6a3f" }}>
            <Shield size={16} />
            Privacy & Data Protection
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "#8b6a3f" }}>
            Privacy Policy
          </h1>
          <p className="text-lg" style={{ color: "#9c7649" }}>
            How we collect, use, and protect your personal information
          </p>
          <p className="text-sm mt-4" style={{ color: "#b78852" }}>
            Last updated: January 2025
          </p>
        </div>

        {/* Content */}
        <div 
          className="prose prose-lg max-w-none rounded-3xl p-8 shadow-sm"
          style={{ 
            backgroundColor: "rgba(255, 255, 255, 0.9)", 
            border: "1px solid rgba(183, 136, 82, 0.15)" 
          }}
        >
          {/* Introduction */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Eye size={24} style={{ color: "#b78852" }} />
              <h2 className="text-2xl font-bold m-0" style={{ color: "#8b6a3f" }}>Introduction</h2>
            </div>
            <p style={{ color: "#9c7649" }}>
              Shreedhar Instruments ("we," "our," or "us") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or interact with us.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText size={24} style={{ color: "#b78852" }} />
              <h2 className="text-2xl font-bold m-0" style={{ color: "#8b6a3f" }}>Information We Collect</h2>
            </div>
            
            <h3 style={{ color: "#8b6a3f" }}>Personal Information</h3>
            <p style={{ color: "#9c7649" }}>We may collect the following types of personal information:</p>
            <ul style={{ color: "#9c7649" }}>
              <li><strong>Contact Information:</strong> Name, email address, phone number, mailing address</li>
              <li><strong>Company Information:</strong> Company name, job title, department</li>
              <li><strong>Professional Information:</strong> Industry, role, specific instrument requirements</li>
              <li><strong>Communication Records:</strong> Inquiry details, service requests, support communications</li>
            </ul>

            <h3 style={{ color: "#8b6a3f" }}>Technical Information</h3>
            <ul style={{ color: "#9c7649" }}>
              <li>IP address, browser type, operating system</li>
              <li>Website usage patterns, pages visited, time spent</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Device information and preferences</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <UserCheck size={24} style={{ color: "#b78852" }} />
              <h2 className="text-2xl font-bold m-0" style={{ color: "#8b6a3f" }}>How We Use Your Information</h2>
            </div>
            
            <p style={{ color: "#9c7649" }}>We use your personal information for the following purposes:</p>
            <ul style={{ color: "#9c7649" }}>
              <li><strong>Service Delivery:</strong> To provide quotes, technical support, and maintenance services</li>
              <li><strong>Communication:</strong> To respond to inquiries, provide updates, and send important notices</li>
              <li><strong>Product Development:</strong> To improve our products and develop new solutions</li>
              <li><strong>Marketing:</strong> To send relevant product information and industry updates (with consent)</li>
              <li><strong>Compliance:</strong> To meet regulatory requirements and legal obligations</li>
              <li><strong>Website Improvement:</strong> To enhance user experience and website functionality</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Lock size={24} style={{ color: "#b78852" }} />
              <h2 className="text-2xl font-bold m-0" style={{ color: "#8b6a3f" }}>Information Sharing and Disclosure</h2>
            </div>
            
            <p style={{ color: "#9c7649" }}>We do not sell, trade, or rent your personal information. We may share your information in the following circumstances:</p>
            <ul style={{ color: "#9c7649" }}>
              <li><strong>Authorized Partners:</strong> With manufacturer partners when necessary for service delivery</li>
              <li><strong>Service Providers:</strong> With third-party providers who assist in our operations (under strict confidentiality)</li>
              <li><strong>Legal Requirements:</strong> When required by law, regulation, or legal process</li>
              <li><strong>Business Protection:</strong> To protect our rights, property, or safety, or that of others</li>
              <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset transfers</li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="mb-8">
            <h2 style={{ color: "#8b6a3f" }}>Data Security</h2>
            <p style={{ color: "#9c7649" }}>
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul style={{ color: "#9c7649" }}>
              <li>Encryption of sensitive data in transit and at rest</li>
              <li>Access controls and authentication systems</li>
              <li>Regular security assessments and updates</li>
              <li>Employee training on data protection practices</li>
              <li>Secure data storage and backup procedures</li>
            </ul>
          </section>

          {/* Data Retention */}
          <section className="mb-8">
            <h2 style={{ color: "#8b6a3f" }}>Data Retention</h2>
            <p style={{ color: "#9c7649" }}>
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Factors affecting retention periods include:
            </p>
            <ul style={{ color: "#9c7649" }}>
              <li>The nature of our relationship with you</li>
              <li>Legal and regulatory requirements</li>
              <li>Legitimate business interests</li>
              <li>Your consent and preferences</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <h2 style={{ color: "#8b6a3f" }}>Your Rights</h2>
            <p style={{ color: "#9c7649" }}>You have the following rights regarding your personal information:</p>
            <ul style={{ color: "#9c7649" }}>
              <li><strong>Access:</strong> Request copies of your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
              <li><strong>Portability:</strong> Request transfer of your data to another service provider</li>
              <li><strong>Objection:</strong> Object to processing for direct marketing purposes</li>
              <li><strong>Consent Withdrawal:</strong> Withdraw consent where processing is based on consent</li>
            </ul>
          </section>

          {/* Cookies and Tracking */}
          <section className="mb-8">
            <h2 style={{ color: "#8b6a3f" }}>Cookies and Tracking Technologies</h2>
            <p style={{ color: "#9c7649" }}>
              We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookie preferences through your browser settings.
            </p>
          </section>

          {/* International Transfers */}
          <section className="mb-8">
            <h2 style={{ color: "#8b6a3f" }}>International Data Transfers</h2>
            <p style={{ color: "#9c7649" }}>
              If we transfer your personal information internationally, we ensure appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.
            </p>
          </section>

          {/* Changes to Policy */}
          <section className="mb-8">
            <h2 style={{ color: "#8b6a3f" }}>Changes to This Privacy Policy</h2>
            <p style={{ color: "#9c7649" }}>
              We may update this Privacy Policy periodically to reflect changes in our practices or applicable laws. We will notify you of material changes by posting the updated policy on our website and updating the "last modified" date.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 style={{ color: "#8b6a3f" }}>Contact Us</h2>
            <p style={{ color: "#9c7649" }}>
              If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
            </p>
            
            <div 
              className="mt-6 p-6 rounded-2xl"
              style={{ backgroundColor: "rgba(183, 136, 82, 0.05)", border: "1px solid rgba(183, 136, 82, 0.2)" }}
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail size={20} style={{ color: "#b78852" }} />
                  <div>
                    <div className="font-semibold" style={{ color: "#8b6a3f" }}>Email</div>
                    <div style={{ color: "#9c7649" }}>privacy@shreedhargroup.com</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone size={20} style={{ color: "#b78852" }} />
                  <div>
                    <div className="font-semibold" style={{ color: "#8b6a3f" }}>Phone</div>
                    <div style={{ color: "#9c7649" }}>+91 7096033001</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 md:col-span-2">
                  <MapPin size={20} style={{ color: "#b78852" }} className="mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold" style={{ color: "#8b6a3f" }}>Address</div>
                    <div style={{ color: "#9c7649" }}>
                      Privacy Officer<br />
                      Shreedhar Instruments<br />
                      15, Shreejikrupa Society<br />
                      Vadodara, Gujarat 390023, India
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}