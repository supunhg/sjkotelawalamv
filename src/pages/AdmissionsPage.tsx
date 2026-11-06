import React, { useState } from 'react';
import { 
  GraduationCap, 
  FileCheck2, 
  CheckCircle, 
  AlertCircle, 
  Send, 
  Phone, 
  Mail, 
  Calendar, 
  Download,
  HelpCircle,
  Clock
} from 'lucide-react';
import { schoolInfo } from '../data/schoolData';
import { SectionHeader } from '../components/common/SectionHeader';
import { PageHeader } from '../components/layout/PageHeader';

export const AdmissionsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    email: '',
    gradeApplying: 'Grade 1',
    stream: 'Biological Science',
    residentialAddress: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      
      {/* INSTITUTIONAL PAGE HEADER */}
      <PageHeader
        title="Admissions & Student Enrollment"
        sinhalaTitle="නව ශිෂ්‍ය ඇතුළත් කිරීම් • Kesbewa Division"
        subtitle="Application guidelines, eligibility criteria, and required documentation for Grade 1, Grade 6 Scholarship transfers, and Grade 12 Advanced Level streams."
        breadcrumbs={[{ label: 'Admissions' }]}
        badges={[
          { icon: GraduationCap, text: 'Grade 1, 6 & 12 Intakes' },
          { icon: FileCheck2, text: 'Ministry Circular Guidelines' },
          { icon: Phone, text: 'Helpdesk: 0112 604 239' },
        ]}
      />

      {/* ADMISSION INTAKE CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Eligibility Categories"
          title="Student Entry Points"
          subtitle="Sir John Kotelawala Maha Vidyalaya enrolls students across three primary national entry avenues."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Intake 1: Grade 1 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-elevated border-t-4 border-[#C8872B] flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8A5217]">Primary Intake</span>
              <h3 className="font-serif text-xl font-bold text-[#3D0707]">
                Grade 1 Admissions
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Conducted annually according to Ministry of Education circular instructions for children reaching 5 years of age.
              </p>
              
              <div className="bg-[#FAF9F5] p-3.5 rounded-lg text-xs text-stone-700 space-y-1.5 border border-stone-200">
                <span className="font-bold text-stone-900 block">Criteria Categories:</span>
                <p>• Proximity of residence to school grounds</p>
                <p>• Children of verified school alumni</p>
                <p>• Siblings of currently enrolled students</p>
                <p>• Children of education & civil service staff</p>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 mt-6 text-xs text-stone-500">
              Applications open annually in <strong>May / June</strong>.
            </div>
          </div>

          {/* Intake 2: Grade 6 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-elevated border-t-4 border-[#560D0D] flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#7E1313]">Scholarship Intake</span>
              <h3 className="font-serif text-xl font-bold text-[#3D0707]">
                Grade 6 Scholarship Transfers
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Placement for Grade 5 Scholarship Examination qualifiers allocated by the Department of Examinations and Ministry of Education.
              </p>
              
              <div className="bg-[#FAF9F5] p-3.5 rounded-lg text-xs text-stone-700 space-y-1.5 border border-stone-200">
                <span className="font-bold text-stone-900 block">Requirements:</span>
                <p>• Official scholarship cutoff score clearance</p>
                <p>• Ministry allocation letter to SJKMV</p>
                <p>• Primary school student clearance report</p>
                <p>• Certified birth certificate</p>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 mt-6 text-xs text-stone-500">
              Allocated following release of <strong>Grade 5 exam results</strong>.
            </div>
          </div>

          {/* Intake 3: Grade 12 (A/L) */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-elevated border-t-4 border-[#C8872B] flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8A5217]">Collegiate Intake</span>
              <h3 className="font-serif text-xl font-bold text-[#3D0707]">
                Grade 12 Advanced Level
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Direct admission for internal candidates and external school transfers into Science, Maths, Commerce, Arts, or Tech streams.
              </p>
              
              <div className="bg-[#FAF9F5] p-3.5 rounded-lg text-xs text-stone-700 space-y-1.5 border border-stone-200">
                <span className="font-bold text-stone-900 block">Minimum Eligibility:</span>
                <p>• 6 Passes at G.C.E. O/L in single sitting</p>
                <p>• Credit ('C') passes in Mother Tongue & Maths</p>
                <p>• Stream prerequisite credits (Science/English)</p>
                <p>• Interview with stream heads and Principal</p>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 mt-6 text-xs text-stone-500">
              Applications open promptly after <strong>O/L results release</strong>.
            </div>
          </div>

        </div>
      </section>

      {/* REQUIRED DOCUMENTATION CHECKLIST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-elevated border border-stone-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8A5217]">
                Verification Procedures
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#3D0707]">
                Required Verification Documents
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Applicants must present both original copies and certified duplicates at the administrative interview with the admissions board.
              </p>
              
              <div className="p-4 bg-[#FAF2DF] rounded-xl border border-[#C8872B]/30 text-xs text-stone-800 space-y-1">
                <span className="font-bold block text-[#3D0707]">Admissions Helpdesk:</span>
                <p>Hotline: {schoolInfo.contact.phone}</p>
                <p>Email: {schoolInfo.contact.email}</p>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-700">
              <div className="bg-[#FAF9F5] p-4 rounded-xl border border-stone-200 space-y-1">
                <div className="flex items-center gap-2 font-bold text-stone-900">
                  <CheckCircle className="w-4 h-4 text-[#C8872B]" />
                  <span>Student Birth Certificate</span>
                </div>
                <p className="text-stone-500 pl-6">Original certified copy issued by the Divisional Registrar.</p>
              </div>

              <div className="bg-[#FAF9F5] p-4 rounded-xl border border-stone-200 space-y-1">
                <div className="flex items-center gap-2 font-bold text-stone-900">
                  <CheckCircle className="w-4 h-4 text-[#C8872B]" />
                  <span>Grama Niladhari Certificate</span>
                </div>
                <p className="text-stone-500 pl-6">Residence verification countersigned by Divisional Secretary.</p>
              </div>

              <div className="bg-[#FAF9F5] p-4 rounded-xl border border-stone-200 space-y-1">
                <div className="flex items-center gap-2 font-bold text-stone-900">
                  <CheckCircle className="w-4 h-4 text-[#C8872B]" />
                  <span>Electoral Register Extract</span>
                </div>
                <p className="text-stone-500 pl-6">Consecutive 5-year certified electoral roll listings.</p>
              </div>

              <div className="bg-[#FAF9F5] p-4 rounded-xl border border-stone-200 space-y-1">
                <div className="flex items-center gap-2 font-bold text-stone-900">
                  <CheckCircle className="w-4 h-4 text-[#C8872B]" />
                  <span>Academic Records / Leaving Certificate</span>
                </div>
                <p className="text-stone-500 pl-6">Past school character certificate and terminal marks.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ONLINE ADMISSION INQUIRY FORM */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-elevated border-2 border-[#C8872B]/40 p-8 sm:p-12">
          
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8A5217]">
              Preliminary Registration
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3D0707]">
              Online Admission Inquiry Form
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              Submit your preliminary details. Our school administrative secretariat will contact you regarding interview schedules and circular instructions.
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-[#FAF2DF] border-2 border-[#C8872B] rounded-xl p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#560D0D] text-amber-300 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-serif font-bold text-xl text-[#3D0707]">
                Inquiry Received Successfully!
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.parentName}</strong>. Your inquiry for <strong>{formData.studentName}</strong> ({formData.gradeApplying}) has been recorded. The Admissions Secretariat will review and respond via <strong>{formData.phone}</strong>.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    studentName: '',
                    parentName: '',
                    phone: '',
                    email: '',
                    gradeApplying: 'Grade 1',
                    stream: 'Biological Science',
                    residentialAddress: '',
                    message: '',
                  });
                }}
                className="px-6 py-2.5 bg-[#560D0D] text-amber-200 text-xs font-bold rounded-lg hover:bg-[#3D0707] transition-all"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kasun Mihiranga Perera"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className="w-full px-4 py-3 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8872B] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                    Parent / Guardian Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. D. M. Perera"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className="w-full px-4 py-3 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8872B] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 077 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8872B] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. parent@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8872B] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                    Grade Applying For *
                  </label>
                  <select
                    value={formData.gradeApplying}
                    onChange={(e) => setFormData({ ...formData, gradeApplying: e.target.value })}
                    className="w-full px-4 py-3 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8872B] focus:bg-white"
                  >
                    <option value="Grade 1">Grade 1 (Primary)</option>
                    <option value="Grade 6">Grade 6 (Scholarship Transfer)</option>
                    <option value="Grade 7-9">Grades 7 - 9 (Middle School)</option>
                    <option value="Grade 10">Grade 10 (G.C.E. O/L)</option>
                    <option value="Grade 12 A/L">Grade 12 (G.C.E. A/L Intake)</option>
                  </select>
                </div>

                {formData.gradeApplying === 'Grade 12 A/L' && (
                  <div>
                    <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                      Selected A/L Stream *
                    </label>
                    <select
                      value={formData.stream}
                      onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                      className="w-full px-4 py-3 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8872B] focus:bg-white"
                    >
                      <option value="Biological Science">Biological Science</option>
                      <option value="Physical Science (Maths)">Physical Science (Maths)</option>
                      <option value="Commerce & Management">Commerce & Management</option>
                      <option value="Humanities & Social Sciences (Arts)">Humanities & Social Sciences (Arts)</option>
                      <option value="Biosystems & Engineering Technology">Biosystems & Engineering Technology</option>
                    </select>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                  Residential Address (Grama Niladhari Division) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. No. 45, Kolamunna Road, Piliyandala"
                  value={formData.residentialAddress}
                  onChange={(e) => setFormData({ ...formData, residentialAddress: e.target.value })}
                  className="w-full px-4 py-3 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8872B] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                  Additional Notes / Inquiries
                </label>
                <textarea
                  rows={3}
                  placeholder="Mention previous school, exam index numbers, or any specific inquiries..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8872B] focus:bg-white"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-gradient-to-r from-[#560D0D] to-[#3D0707] hover:brightness-110 text-amber-200 font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Registering Inquiry...' : 'Submit Admission Inquiry'}</span>
                </button>
              </div>

            </form>
          )}

        </div>
      </section>

    </div>
  );
};
