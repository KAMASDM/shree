// src/app/terms/page.jsx
import React from 'react';
import { FileText, Scale, AlertTriangle, Shield, Gavel, Users, Wrench, Package } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div 
      className="min-h-screen pt-32 pb-20"
      style={{ background: "linear-gradient(135deg, #fefcf8 0%, #fdf8f0 50%, #fcf4e8 100%)" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6" style={{ backgroundColor: "rgba(183, 136, 82, 0.1)", color: "#8b6a3f" }}>
            <Scale size={16} />
            Legal Terms & Conditions
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "#8b6a3f" }}>
            Terms of Service
          </h1>
          <p className="text-lg" style={{ color: "#9c7649" }}>
            Terms and conditions for using our website and services
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
              <FileText size={24} style={{ color: "#b78852" }} />
              <h2 className="text-2xl font-bold m-0" style={{ color: "#8b6a3f" }}>Introduction</h2>
            </div>
            <p style={{ color: "#9c7649" }}>
              Welcome to Shreedhar Instruments. These Terms of Service ("Terms") govern your use of our website, products, and services. By accessing or using our services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services.
            </p>
          </section>

          {/* Definitions */}
          <section className="mb-8">
            <h2 style={{ color: "#8b6a3f" }}>Definitions</h2>
            <ul style={{ color: "#9c7649" }}>
              <li><strong>"Company"</strong> refers to Shreedhar Instruments</li>
              <li><strong>"Services"</strong> refers to our analytical instruments, software, support, and related services</li>
              <li><strong>"User"</strong> refers to any person or entity using our website or services</li>
              <li><strong>"Equipment"</strong> refers to analytical instruments and related hardware</li>
              <li><strong>"Software"</strong> refers to any software applications, systems, or programs provided by us</li>
            </ul>
          </section>

          {/* Use of Services */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Users size={24} style={{ color: "#b78852" }} />
              <h2 className="text-2xl font-bold m-0" style={{ color: "#8b6a3f" }}>Use of Services</h2>
            </div>
            
            <h3 style={{ color: "#8b6a3f" }}>Permitted Use</h3>
            <p style={{ color: "#9c7649" }}>You may use our services for:</p>
            <ul style={{ color: "#9c7649" }}>
              <li>Legitimate business and research purposes</li>
              <li>Pharmaceutical quality control and testing</li>
              <li>Regulatory compliance activities</li>
              <li>Educational and training purposes</li>
              <li>Product evaluation and procurement</li>
            </ul>

            <h3 style={{ color: "#8b6a3f" }}>Prohibited Use</h3>
            <p style={{ color: "#9c7649" }}>You may not use our services for:</p>
            <ul style={{ color: "#9c7649" }}>
              <li>Illegal activities or purposes</li>
              <li>Reverse engineering, decompiling, or disassembling equipment or software</li>
              <li>Interfering with the security or functionality of our systems</li>
              <li>Violating any applicable laws or regulations</li>
              <li>Infringing intellectual property rights</li>
            </ul>
          </section>

          {/* Products and Services */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Package size={24} style={{ color: "#b78852" }} />
              <h2 className="text-2xl font-bold m-0" style={{ color: "#8b6a3f" }}>Products and Services</h2>
            </div>
            
            <h3 style={{ color: "#8b6a3f" }}>Equipment Sales</h3>
            <ul style={{ color: "#9c7649" }}>
              <li>All equipment sales are subject to our standard commercial terms</li>
              <li>Specifications and availability are subject to change</li>
              <li>Installation and qualification services available separately</li>
              <li>Warranty terms vary by product and are specified in individual agreements</li>
            </ul>

            <h3 style={{ color: "#8b6a3f" }}>Service and Support</h3>
            <ul style={{ color: "#9c7649" }}>
              <li>Technical support provided during business hours</li>
              <li>Emergency support available for critical applications</li>
              <li>Service response times vary by location and service level agreement</li>
              <li>Preventive maintenance schedules established by mutual agreement</li>
            </ul>
          </section>

          {/* Payment Terms */}
          <section className="mb-8">
            <h2 style={{ color: "#8b6a3f" }}>Payment Terms</h2>
            <ul style={{ color: "#9c7649" }}>
              <li>Payment terms are specified in individual quotations and agreements</li>
              <li>Prices are subject to change without notice unless confirmed in writing</li>
              <li>All prices are exclusive of taxes unless otherwise stated</li>
              <li>Late payment charges may apply as specified in agreements</li>
              <li>We reserve the right to require payment in advance for certain services</li>
            </ul>
          </section>

          {/* Warranties and Disclaimers */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield size={24} style={{ color: "#b78852" }} />
              <h2 className="text-2xl font-bold m-0" style={{ color: "#8b6a3f" }}>Warranties and Disclaimers</h2>
            </div>
            
            <h3 style={{ color: "#8b6a3f" }}>Equipment Warranties</h3>
            <ul style={{ color: "#9c7649" }}>
              <li>Equipment warranties are provided by manufacturers and vary by product</li>
              <li>We provide additional service warranties as specified in agreements</li>
              <li>Warranty coverage excludes misuse, abuse, or normal wear and tear</li>
              <li>Warranty repairs must be performed by authorized service personnel</li>
            </ul>

            <h3 style={{ color: "#8b6a3f" }}>Service Disclaimers</h3>
            <p style={{ color: "#9c7649" }}>
              While we strive to provide excellent service, we disclaim liability for:
            </p>
            <ul style={{ color: "#9c7649" }}>
              <li>Service delays due to factors beyond our control</li>
              <li>Third-party component failures</li>
              <li>Consequential or indirect damages</li>
              <li>Loss of production or business interruption</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section className="mb-8">
            <h2 style={{ color: "#8b6a3f" }}>Intellectual Property</h2>
            <ul style={{ color: "#9c7649" }}>
              <li>All intellectual property rights in our services remain with us or our licensors</li>
              <li>You are granted a limited, non-exclusive license to use our software and documentation</li>
              <li>Trademarks and brand names are owned by their respective owners</li>
              <li>You may not reproduce, modify, or distribute our proprietary materials without permission</li>
            </ul>
          </section>

          {/* Data and Privacy */}
          <section className="mb-8">
            <h2 style={{ color: "#8b6a3f" }}>Data and Privacy</h2>
            <ul style={{ color: "#9c7649" }}>
              <li>Your use of our services is subject to our Privacy Policy</li>
              <li>We collect and process data necessary to provide services</li>
              <li>You retain ownership of your operational data</li>
              <li>We implement appropriate security measures to protect data</li>
              <li>Data sharing is limited to what is necessary for service delivery</li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle size={24} style={{ color: "#b78852" }} />
              <h2 className="text-2xl font-bold m-0" style={{ color: "#8b6a3f" }}>Limitation of Liability</h2>
            </div>
            <p style={{ color: "#9c7649" }}>
              To the maximum extent permitted by law:
            </p>
            <ul style={{ color: "#9c7649" }}>
              <li>Our total liability is limited to the amount paid for the specific service or product</li>
              <li>We are not liable for indirect, consequential, or punitive damages</li>
              <li>Liability limitations do not apply to cases of gross negligence or willful misconduct</li>
              <li>Some jurisdictions do not allow limitation of certain damages, so limitations may not apply</li>
            </ul>
          </section>

          {/* Service Level Agreements */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Wrench size={24} style={{ color: "#b78852" }} />
              <h2 className="text-2xl font-bold m-0" style={{ color: "#8b6a3f" }}>Service Level Agreements</h2>
            </div>
            <ul style={{ color: "#9c7649" }}>
              <li>Service response times are specified in individual service agreements</li>
              <li>Emergency response available for critical pharmaceutical operations</li>
              <li>Service credits may be available for failure to meet agreed response times</li>
              <li>Force majeure events may excuse performance delays</li>
            </ul>
          </section>

          {/* Compliance and Regulatory */}
          <section className="mb-8">
            <h2 style={{ color: "#8b6a3f" }}>Compliance and Regulatory</h2>
            <ul style={{ color: "#9c7649" }}>
              <li>Our products and services are designed to meet applicable regulatory requirements</li>
              <li>Customers are responsible for ensuring compliance with their specific regulations</li>
              <li>We provide documentation to support validation and compliance activities</li>
              <li>Changes in regulations may require service or product updates</li>
            </ul>
          </section>

          {/* Termination */}
          <section className="mb-8">
            <h2 style={{ color: "#8b6a3f" }}>Termination</h2>
            <ul style={{ color: "#9c7649" }}>
              <li>Either party may terminate service agreements with appropriate notice</li>
              <li>We may suspend services for non-payment or breach of terms</li>
              <li>Termination does not affect accrued rights and obligations</li>
              <li>Equipment ownership and software licenses survive termination as specified</li>
            </ul>
          </section>

          {/* Governing Law */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Gavel size={24} style={{ color: "#b78852" }} />
              <h2 className="text-2xl font-bold m-0" style={{ color: "#8b6a3f" }}>Governing Law</h2>
            </div>
            <ul style={{ color: "#9c7649" }}>
              <li>These Terms are governed by the laws of India</li>
              <li>Disputes shall be subject to the jurisdiction of courts in Vadodara, Gujarat</li>
              <li>We will attempt to resolve disputes through negotiation before litigation</li>
              <li>Arbitration may be required for certain commercial disputes</li>
            </ul>
          </section>

          {/* Changes to Terms */}
          <section className="mb-8">
            <h2 style={{ color: "#8b6a3f" }}>Changes to Terms</h2>
            <p style={{ color: "#9c7649" }}>
              We may update these Terms periodically. We will notify users of material changes by posting updated terms on our website. Continued use of our services after changes constitutes acceptance of the updated Terms.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 style={{ color: "#8b6a3f" }}>Contact Information</h2>
            <p style={{ color: "#9c7649" }}>
              For questions about these Terms or our services, please contact:
            </p>
            
            <div 
              className="mt-6 p-6 rounded-2xl"
              style={{ backgroundColor: "rgba(183, 136, 82, 0.05)", border: "1px solid rgba(183, 136, 82, 0.2)" }}
            >
              <div className="space-y-2" style={{ color: "#9c7649" }}>
                <div><strong style={{ color: "#8b6a3f" }}>Legal Department</strong></div>
                <div>Shreedhar Instruments</div>
                <div>15, Shreejikrupa Society</div>
                <div>Vadodara, Gujarat 390023, India</div>
                <div>Email: legal@shreedhargroup.com</div>
                <div>Phone: +91 7096033001</div>
              </div>
            </div>
          </section>

          {/* Acknowledgment */}
          <section>
            <div 
              className="p-6 rounded-2xl text-center"
              style={{ backgroundColor: "rgba(183, 136, 82, 0.1)", border: "1px solid rgba(183, 136, 82, 0.2)" }}
            >
              <p className="font-semibold" style={{ color: "#8b6a3f" }}>
                By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}