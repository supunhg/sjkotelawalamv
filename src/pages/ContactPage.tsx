import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  ChevronDown, 
  HelpCircle, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { schoolInfo, faqData } from '../data/schoolData';
import { SectionHeader } from '../components/common/SectionHeader';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
    }, 700);
  };

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      
      {/* PAGE HEADER HERO */}
      <section className="bg-gradient-to-b from-[#4A0A0A] via-[#560D0D] to-[#380606] text-white py-16 lg:py-20 border-b-4 border-[#C8872B] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C8872B_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 border border-[#C8872B]/40 text-amber-200 text-xs font-semibold uppercase tracking-wider mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#C8872B]" />
            <span>Campus Location & Support</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#FAF2DF] tracking-tight">
            Contact & Location Information
          </h1>

          <p className="mt-3 text-sm sm:text-base text-amber-100/80 max-w-2xl mx-auto font-serif italic">
            "Kolamunna, Piliyandala • Western Province, Sri Lanka"
          </p>

          <p className="mt-2 text-xs sm:text-sm text-amber-200/60 max-w-xl mx-auto">
            Get in touch with the Principal's Secretariat, Sports Council, or Admissions Department.
          </p>
        </div>
      </section>

      {/* CONTACT INFORMATION CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Postal Location */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-subtle border border-stone-200 hover:shadow-elevated hover:border-[#C8872B] transition-all text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-[#FAF2DF] text-[#8A5217] flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-[#C8872B]" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#3D0707] mb-2">Campus Address</h3>
            <p className="text-xs text-stone-600 leading-relaxed mb-4">
              Sir John Kotelawala Maha Vidyalaya<br />
              Kolamunna, Piliyandala<br />
              Western Province, Sri Lanka
            </p>
            <span className="text-[11px] text-[#8A5217] font-semibold bg-[#FAF9F5] px-3 py-1 rounded-full border border-stone-200">
              Kesbewa Education Division
            </span>
          </div>

          {/* Card 2: Phone Hotline */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-subtle border border-stone-200 hover:shadow-elevated hover:border-[#C8872B] transition-all text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-[#FAF2DF] text-[#8A5217] flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-[#C8872B]" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#3D0707] mb-2">Telephone Hotline</h3>
            <p className="text-xs text-stone-600 leading-relaxed mb-4">
              Direct institutional line for administrative inquiries and admissions.
            </p>
            <a
              href={`tel:${schoolInfo.contact.phone.replace(/\s+/g, '')}`}
              className="text-base font-serif font-bold text-[#560D0D] hover:text-[#C8872B] transition-colors"
            >
              {schoolInfo.contact.phone}
            </a>
            <span className="text-[11px] text-stone-400 mt-2">
              Weekdays: 7:30 AM – 3:30 PM
            </span>
          </div>

          {/* Card 3: Official Email */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-subtle border border-stone-200 hover:shadow-elevated hover:border-[#C8872B] transition-all text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-[#FAF2DF] text-[#8A5217] flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-[#C8872B]" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#3D0707] mb-2">Email Correspondence</h3>
            <p className="text-xs text-stone-600 leading-relaxed mb-4">
              Official school email address for formal correspondence and circular requests.
            </p>
            <a
              href={`mailto:${schoolInfo.contact.email}`}
              className="text-xs font-semibold text-[#560D0D] hover:text-[#C8872B] transition-colors break-all"
            >
              {schoolInfo.contact.email}
            </a>
            <span className="text-[11px] text-stone-400 mt-2">
              Response within 24-48 business hours
            </span>
          </div>

        </div>
      </section>

      {/* INTERACTIVE FORM & GOOGLE MAPS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-elevated border border-stone-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left: Contact Form */}
            <div className="lg:col-span-6 p-6 sm:p-10 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8A5217]">
                  Send a Message
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#3D0707] mt-1">
                  Inquire with the Administration
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Have questions about academics, sports facilities, or student admissions? Reach out directly.
                </p>
              </div>

              {isSent ? (
                <div className="bg-[#FAF2DF] border-2 border-[#C8872B] rounded-xl p-8 text-center space-y-3">
                  <CheckCircle className="w-12 h-12 text-[#560D0D] mx-auto" />
                  <h4 className="font-serif font-bold text-lg text-[#3D0707]">
                    Message Sent Successfully
                  </h4>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. Your correspondence has been directed to the school secretariat.
                  </p>
                  <button
                    onClick={() => {
                      setIsSent(false);
                      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                    }}
                    className="text-xs font-bold text-[#560D0D] underline pt-2"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priyantha Jayasuriya"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8872B] focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8872B] focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 071 234 5678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8872B] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Admissions Inquiry / Sports Training"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8872B] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Write your detailed query here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8872B] focus:bg-white"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full py-3 bg-[#560D0D] hover:bg-[#3D0707] text-amber-200 font-bold text-xs uppercase tracking-wider rounded-lg shadow transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSending ? 'Sending Message...' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </div>

            {/* Right: Map & Directions */}
            <div className="lg:col-span-6 bg-stone-100 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-stone-200">
              <div className="h-72 sm:h-96 w-full relative">
                <iframe
                  title="Sir John Kotelawala Maha Vidyalaya Map"
                  src={schoolInfo.contact.mapEmbedUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="p-6 bg-[#FAF9F5] border-t border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-sm text-[#3D0707]">
                    Location & Transit Directions
                  </h4>
                  <a
                    href="https://maps.google.com/?q=Sir+John+Kotalawala+Maha+Vidyalaya+Piliyandala"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#8A5217] hover:underline"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Located conveniently in Kolamunna, within 5 minutes from Piliyandala town center, easily accessible via Kesbewa-Piliyandala main bus routes.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <SectionHeader
          badge="Parent & Student Guidance"
          title="Frequently Asked Questions"
          subtitle="Answers to common queries regarding admissions, school sessions, and student life."
        />

        <div className="space-y-3">
          {faqData.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-subtle transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-serif font-bold text-sm sm:text-base text-[#3D0707] hover:bg-[#FAF9F5] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#C8872B] shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#C8872B] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 bg-[#FAF9F5]/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
