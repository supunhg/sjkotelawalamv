import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Users, 
  GraduationCap, 
  Bell, 
  Image as ImageIcon, 
  BarChart3, 
  LogOut, 
  Plus, 
  Trash2, 
  CheckCircle, 
  Clock, 
  Search, 
  Upload, 
  Key, 
  RefreshCw, 
  ExternalLink, 
  ShieldCheck, 
  Menu, 
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { 
  api, 
  authStorage, 
  User, 
  AdmissionInquiry, 
  AnnouncementItem, 
  GalleryItem, 
  DashboardStats 
} from '../../api/client';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'admissions' | 'users' | 'announcements' | 'gallery'>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Data states
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [admissions, setAdmissions] = useState<AdmissionInquiry[]>([]);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Admission filters
  const [admissionFilter, setAdmissionFilter] = useState({ status: 'all', grade: 'all', search: '' });
  const [selectedInquiry, setSelectedInquiry] = useState<AdmissionInquiry | null>(null);

  // Announcement modal state
  const [isAnnounceModalOpen, setIsAnnounceModalOpen] = useState(false);
  const [announceForm, setAnnounceForm] = useState({
    id: 0,
    title: '',
    category: 'Admissions',
    summary: '',
    content: '',
    isUrgent: false
  });

  // Gallery upload modal state
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [galleryUpload, setGalleryUpload] = useState<{ title: string; category: string; description: string; file: File | null }>({
    title: '',
    category: 'Campus',
    description: '',
    file: null
  });

  // New User modal state
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [newUserForm, setNewUserForm] = useState({
    username: '',
    password: '',
    role: 'digital_team' as 'admin' | 'digital_team',
    fullName: ''
  });

  // Authenticate session on mount
  useEffect(() => {
    const currentUser = authStorage.getUser();
    const token = authStorage.getToken();

    if (!token || !currentUser) {
      navigate('/admin/login');
      return;
    }

    if (currentUser.mustChangePassword) {
      navigate('/admin/change-password');
      return;
    }

    setUser(currentUser);
    loadAllData(currentUser);
  }, [navigate]);

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const loadAllData = async (currUser: User) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const [statsRes, annRes, galRes] = await Promise.all([
        api.getStats().catch(() => null),
        api.getAnnouncements().catch(() => []),
        api.getGallery().catch(() => [])
      ]);

      if (statsRes) setStats(statsRes);
      setAnnouncements(annRes);
      setGallery(galRes);

      if (currUser.role === 'admin') {
        const [admRes, usrRes] = await Promise.all([
          api.getAdmissions().catch(() => []),
          api.getUsers().catch(() => [])
        ]);
        setAdmissions(admRes);
        setUsersList(usrRes);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error loading dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authStorage.logout();
    navigate('/admin/login');
  };

  // --- Admission Actions ---
  const handleUpdateAdmissionStatus = async (id: number, status: string, notes?: string) => {
    try {
      await api.updateAdmission(id, { status, adminNotes: notes });
      setAdmissions(prev => prev.map(a => a.id === id ? { ...a, status: status as any, admin_notes: notes ?? a.admin_notes } : a));
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(prev => prev ? { ...prev, status: status as any, admin_notes: notes ?? prev.admin_notes } : null);
      }
      showSuccess(`Inquiry #${id} marked as ${status}`);
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  const handleDeleteAdmission = async (id: number) => {
    if (!confirm('Are you sure you want to permanently delete this registration inquiry?')) return;
    try {
      await api.deleteAdmission(id);
      setAdmissions(prev => prev.filter(a => a.id !== id));
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
      showSuccess('Inquiry deleted successfully');
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  // --- Announcement Actions ---
  const handleSaveAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (announceForm.id) {
        await api.updateAnnouncement(announceForm.id, {
          title: announceForm.title,
          category: announceForm.category,
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          summary: announceForm.summary,
          content: announceForm.content,
          isUrgent: announceForm.isUrgent
        });
        showSuccess('Announcement updated');
      } else {
        await api.createAnnouncement({
          title: announceForm.title,
          category: announceForm.category,
          summary: announceForm.summary,
          content: announceForm.content,
          isUrgent: announceForm.isUrgent
        });
        showSuccess('New announcement published to the school website');
      }
      setIsAnnounceModalOpen(false);
      const updated = await api.getAnnouncements();
      setAnnouncements(updated);
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  const handleDeleteAnnouncement = async (id: number) => {
    if (!confirm('Are you sure you want to remove this announcement?')) return;
    try {
      await api.deleteAnnouncement(id);
      setAnnouncements(prev => prev.filter(a => a.id !== id));
      showSuccess('Announcement removed');
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  // --- Gallery Actions ---
  const handleUploadGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryUpload.file) {
      alert('Please select an image file first');
      return;
    }

    const formData = new FormData();
    formData.append('title', galleryUpload.title);
    formData.append('category', galleryUpload.category);
    formData.append('description', galleryUpload.description);
    formData.append('image', galleryUpload.file);

    try {
      await api.uploadGalleryImage(formData);
      showSuccess('Image successfully uploaded and added to the college showcase!');
      setIsGalleryModalOpen(false);
      setGalleryUpload({ title: '', category: 'Campus', description: '', file: null });
      const updated = await api.getGallery();
      setGallery(updated);
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  const handleDeleteGallery = async (id: number) => {
    if (!confirm('Delete this image from the gallery archive?')) return;
    try {
      await api.deleteGalleryImage(id);
      setGallery(prev => prev.filter(g => g.id !== id));
      showSuccess('Gallery item removed');
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  // --- User Management Actions ---
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createUser(newUserForm);
      showSuccess(`Digital Team user "${newUserForm.username}" created successfully!`);
      setIsUserModalOpen(false);
      setNewUserForm({ username: '', password: '', role: 'digital_team', fullName: '' });
      const updatedUsers = await api.getUsers();
      setUsersList(updatedUsers);
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  const handleDeleteUser = async (id: number, username: string) => {
    if (!confirm(`Delete user account "${username}"?`)) return;
    try {
      await api.deleteUser(id);
      setUsersList(prev => prev.filter(u => u.id !== id));
      showSuccess(`User "${username}" deleted.`);
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  // Filtered admissions list
  const filteredAdmissions = admissions.filter(item => {
    if (admissionFilter.status !== 'all' && item.status !== admissionFilter.status) return false;
    if (admissionFilter.grade !== 'all' && item.grade_applying !== admissionFilter.grade) return false;
    if (admissionFilter.search) {
      const q = admissionFilter.search.toLowerCase();
      const match = item.student_name.toLowerCase().includes(q) ||
                    item.parent_name.toLowerCase().includes(q) ||
                    item.phone.includes(q) ||
                    (item.email && item.email.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  if (!user) return null;

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col">
      
      {/* Top Application Bar */}
      <header className="bg-[#3D0707] text-white border-b-2 border-[#C8872B] sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-1.5 text-amber-200 hover:text-white rounded-md"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link to="/" className="flex items-center gap-2.5 group">
              <img src="/images/logo-color.png" alt="Crest" className="w-8 h-8 object-contain" />
              <div>
                <span className="font-bold text-sm sm:text-base text-[#FAF2DF] block leading-tight">
                  Sir John Kotelawala
                </span>
                <span className="text-[10px] text-[#E1B463] uppercase tracking-wider block">
                  Administrative Portal
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-bold text-amber-100">{user.fullName || user.username}</span>
              <span className="text-[10px] uppercase tracking-widest text-[#E1B463] font-semibold">
                {user.role === 'admin' ? 'Administrator' : 'Digital Media Team'}
              </span>
            </div>

            <button
              onClick={() => navigate('/admin/change-password')}
              className="p-2 text-amber-200/80 hover:text-white rounded-lg hover:bg-black/20 text-xs flex items-center gap-1.5"
              title="Change Password"
            >
              <Key className="w-4 h-4" />
              <span className="hidden md:inline">Password</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 hover:bg-black/60 text-amber-200 text-xs font-semibold border border-[#C8872B]/40 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6">
        
        {/* Sidebar Nav (Desktop) */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-2">
          <nav className="bg-white rounded-xl shadow-subtle border border-stone-200 p-3 space-y-1">
            
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'overview'
                  ? 'bg-[#560D0D] text-amber-200 shadow-sm'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Overview & Stats</span>
            </button>

            {user.role === 'admin' && (
              <button
                onClick={() => setActiveTab('admissions')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'admissions'
                    ? 'bg-[#560D0D] text-amber-200 shadow-sm'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-4 h-4" />
                  <span>Admissions Inquiries</span>
                </div>
                {stats?.pendingAdmissions ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#C8872B] text-white font-extrabold">
                    {stats.pendingAdmissions}
                  </span>
                ) : null}
              </button>
            )}

            {user.role === 'admin' && (
              <button
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'users'
                    ? 'bg-[#560D0D] text-amber-200 shadow-sm'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Digital Team Accounts</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('announcements')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'announcements'
                  ? 'bg-[#560D0D] text-amber-200 shadow-sm'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>Notice Board / Circulars</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'gallery'
                  ? 'bg-[#560D0D] text-amber-200 shadow-sm'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Photo Gallery Uploads</span>
            </button>

          </nav>

          {/* Quick Info Box */}
          <div className="p-4 bg-[#FAF9F5] rounded-xl border border-stone-200 text-xs text-stone-600 space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-bold">
              <ShieldCheck className="w-4 h-4 text-[#C8872B]" />
              <span>Database Status</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Native SQLite ACID storage active on VPS. All registration submissions and digital team assets are persisted directly in server storage.
            </p>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div className="fixed inset-0 bg-black/60" onClick={() => setMobileSidebarOpen(false)} />
            <div className="relative w-4/5 max-w-xs bg-white h-full p-4 flex flex-col justify-between shadow-2xl z-10">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <div className="font-bold text-stone-900 text-sm">Dashboard Navigation</div>
                  <button onClick={() => setMobileSidebarOpen(false)} className="p-1">
                    <X className="w-5 h-5 text-stone-500" />
                  </button>
                </div>
                <div className="space-y-1">
                  <button
                    onClick={() => { setActiveTab('overview'); setMobileSidebarOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold"
                  >
                    Overview & Stats
                  </button>
                  {user.role === 'admin' && (
                    <>
                      <button
                        onClick={() => { setActiveTab('admissions'); setMobileSidebarOpen(false); }}
                        className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold"
                      >
                        Admissions Inquiries
                      </button>
                      <button
                        onClick={() => { setActiveTab('users'); setMobileSidebarOpen(false); }}
                        className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold"
                      >
                        Digital Team Accounts
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => { setActiveTab('announcements'); setMobileSidebarOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold"
                  >
                    Notice Board / Circulars
                  </button>
                  <button
                    onClick={() => { setActiveTab('gallery'); setMobileSidebarOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold"
                  >
                    Photo Gallery Uploads
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 space-y-6 min-w-0">
          
          {/* Messages */}
          {errorMsg && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center justify-between">
              <span>{errorMsg}</span>
              <button onClick={() => setErrorMsg(null)} className="text-red-500 font-bold ml-2">Dismiss</button>
            </div>
          )}
          {successMsg && (
            <div className="p-3.5 bg-green-50 border border-green-200 rounded-xl text-xs text-green-800 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-subtle border border-stone-200">
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                  Welcome, {user.fullName || user.username}
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  Sir John Kotelawala Maha Vidyalaya Secretariat & Content Management Console.
                </p>

                {/* Metric Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                  {user.role === 'admin' && (
                    <div className="bg-[#FAF9F5] p-4 rounded-xl border border-stone-200">
                      <div className="text-xs text-stone-500 font-semibold uppercase">Pending Inquiries</div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-[#7E1313] mt-1">
                        {stats?.pendingAdmissions || 0}
                      </div>
                      <div className="text-[11px] text-stone-400 mt-0.5">Need Secretariat review</div>
                    </div>
                  )}

                  {user.role === 'admin' && (
                    <div className="bg-[#FAF9F5] p-4 rounded-xl border border-stone-200">
                      <div className="text-xs text-stone-500 font-semibold uppercase">Total Applications</div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-[#8A5217] mt-1">
                        {stats?.totalAdmissions || 0}
                      </div>
                      <div className="text-[11px] text-stone-400 mt-0.5">Recorded in SQLite database</div>
                    </div>
                  )}

                  <div className="bg-[#FAF9F5] p-4 rounded-xl border border-stone-200">
                    <div className="text-xs text-stone-500 font-semibold uppercase">Live Notices</div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">
                      {announcements.length}
                    </div>
                    <div className="text-[11px] text-stone-400 mt-0.5">Notice board circulars</div>
                  </div>

                  <div className="bg-[#FAF9F5] p-4 rounded-xl border border-stone-200">
                    <div className="text-xs text-stone-500 font-semibold uppercase">Gallery Photos</div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">
                      {gallery.length}
                    </div>
                    <div className="text-[11px] text-stone-400 mt-0.5">Active campus photographs</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => {
                    setAnnounceForm({ id: 0, title: '', category: 'Admissions', summary: '', content: '', isUrgent: false });
                    setIsAnnounceModalOpen(true);
                  }}
                  className="bg-white p-5 rounded-xl border border-stone-200 hover:border-[#C8872B] hover:shadow-md transition-all text-left flex items-start gap-4"
                >
                  <div className="p-2.5 bg-amber-50 text-[#8A5217] rounded-lg">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-stone-900">Post New Notice</h3>
                    <p className="text-xs text-stone-500 mt-0.5">Publish examination circulars, admissions deadlines or event notices.</p>
                  </div>
                </button>

                <button
                  onClick={() => setIsGalleryModalOpen(true)}
                  className="bg-white p-5 rounded-xl border border-stone-200 hover:border-[#C8872B] hover:shadow-md transition-all text-left flex items-start gap-4"
                >
                  <div className="p-2.5 bg-amber-50 text-[#8A5217] rounded-lg">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-stone-900">Upload Campus Photos</h3>
                    <p className="text-xs text-stone-500 mt-0.5">Add photographs from sports meets, religious ceremonies, and celebrations.</p>
                  </div>
                </button>

                {user.role === 'admin' && (
                  <button
                    onClick={() => setIsUserModalOpen(true)}
                    className="bg-white p-5 rounded-xl border border-stone-200 hover:border-[#C8872B] hover:shadow-md transition-all text-left flex items-start gap-4"
                  >
                    <div className="p-2.5 bg-amber-50 text-[#8A5217] rounded-lg">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-stone-900">Add Digital Team Member</h3>
                      <p className="text-xs text-stone-500 mt-0.5">Issue credentials for media unit students or teachers to update website content.</p>
                    </div>
                  </button>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: ADMISSIONS INQUIRIES (ADMIN ONLY) */}
          {activeTab === 'admissions' && user.role === 'admin' && (
            <div className="space-y-4">
              
              <div className="bg-white rounded-2xl p-6 shadow-subtle border border-stone-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-stone-900">
                      Admission Inquiries & Registration Records
                    </h2>
                    <p className="text-xs text-stone-500">
                      Live submissions from the website registration form stored in the VPS database.
                    </p>
                  </div>

                  <button
                    onClick={() => loadAllData(user)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Refresh</span>
                  </button>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search student, parent or phone..."
                      value={admissionFilter.search}
                      onChange={(e) => setAdmissionFilter({ ...admissionFilter, search: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C8872B]"
                    />
                  </div>

                  <select
                    value={admissionFilter.status}
                    onChange={(e) => setAdmissionFilter({ ...admissionFilter, status: e.target.value })}
                    className="px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending Review</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="contacted">Contacted</option>
                    <option value="admitted">Admitted</option>
                    <option value="archived">Archived</option>
                  </select>

                  <select
                    value={admissionFilter.grade}
                    onChange={(e) => setAdmissionFilter({ ...admissionFilter, grade: e.target.value })}
                    className="px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none"
                  >
                    <option value="all">All Grades</option>
                    <option value="Grade 1">Grade 1</option>
                    <option value="Grade 6">Grade 6</option>
                    <option value="Grade 7-9">Grades 7 - 9</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 12 A/L">Grade 12 A/L</option>
                  </select>
                </div>
              </div>

              {/* Admissions Table */}
              <div className="bg-white rounded-2xl shadow-subtle border border-stone-200 overflow-hidden">
                {filteredAdmissions.length === 0 ? (
                  <div className="p-12 text-center text-xs text-stone-500">
                    No admission inquiries found matching your filters.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#FAF9F5] border-b border-stone-200 text-[#3D0707] font-bold uppercase tracking-wider text-[11px]">
                        <tr>
                          <th className="py-3 px-4">Ref #</th>
                          <th className="py-3 px-4">Student Name</th>
                          <th className="py-3 px-4">Parent / Guardian</th>
                          <th className="py-3 px-4">Grade & Stream</th>
                          <th className="py-3 px-4">Phone Contact</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {filteredAdmissions.map((item) => (
                          <tr key={item.id} className="hover:bg-stone-50 transition-colors">
                            <td className="py-3 px-4 font-mono font-bold text-stone-500">#{item.id}</td>
                            <td className="py-3 px-4 font-bold text-stone-900">{item.student_name}</td>
                            <td className="py-3 px-4 text-stone-700">{item.parent_name}</td>
                            <td className="py-3 px-4">
                              <span className="font-semibold text-[#8A5217]">{item.grade_applying}</span>
                              {item.stream && <span className="block text-[10px] text-stone-500">{item.stream}</span>}
                            </td>
                            <td className="py-3 px-4 font-medium text-stone-800">
                              <a href={`tel:${item.phone.replace(/\s+/g, '')}`} className="hover:text-[#560D0D] underline">
                                {item.phone}
                              </a>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                item.status === 'pending'
                                  ? 'bg-amber-100 text-amber-800'
                                  : item.status === 'contacted'
                                  ? 'bg-blue-100 text-blue-800'
                                  : item.status === 'admitted'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-stone-100 text-stone-600'
                              }`}>
                                {item.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right space-x-2">
                              <button
                                onClick={() => setSelectedInquiry(item)}
                                className="px-2.5 py-1 rounded bg-[#FAF2DF] text-[#8A5217] font-semibold hover:bg-[#C8872B] hover:text-white transition-colors"
                              >
                                View
                              </button>
                              <button
                                onClick={() => handleDeleteAdmission(item.id)}
                                className="p-1 text-red-500 hover:text-red-700"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5 inline" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 3: DIGITAL TEAM & USER MANAGEMENT (ADMIN ONLY) */}
          {activeTab === 'users' && user.role === 'admin' && (
            <div className="space-y-4">
              
              <div className="bg-white rounded-2xl p-6 shadow-subtle border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-stone-900">
                    Digital Media Team & Staff Credentials
                  </h2>
                  <p className="text-xs text-stone-500">
                    Create and manage authorized accounts for students and faculty who upload gallery images and circulars.
                  </p>
                </div>

                <button
                  onClick={() => setIsUserModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#560D0D] text-amber-200 hover:bg-[#3D0707] text-xs font-bold shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Digital Team User</span>
                </button>
              </div>

              {/* Users List */}
              <div className="bg-white rounded-2xl shadow-subtle border border-stone-200 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF9F5] border-b border-stone-200 text-[#3D0707] font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-4">User</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4">Full Name / Designation</th>
                      <th className="py-3 px-4">Password Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {usersList.map((u) => (
                      <tr key={u.id} className="hover:bg-stone-50">
                        <td className="py-3 px-4 font-bold text-stone-900 font-mono">{u.username}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            u.role === 'admin' ? 'bg-[#560D0D] text-amber-200' : 'bg-amber-100 text-[#8A5217]'
                          }`}>
                            {u.role === 'admin' ? 'Administrator' : 'Digital Team'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-stone-700">{u.fullName || '—'}</td>
                        <td className="py-3 px-4">
                          {u.mustChangePassword ? (
                            <span className="text-amber-600 font-semibold text-[10px]">Must Change on Login</span>
                          ) : (
                            <span className="text-green-600 font-semibold text-[10px]">Active</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          {u.id !== user.id && (
                            <button
                              onClick={() => handleDeleteUser(u.id, u.username)}
                              className="text-red-500 hover:text-red-700 font-semibold text-xs ml-3"
                            >
                              Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 4: ANNOUNCEMENTS / CIRCULARS */}
          {activeTab === 'announcements' && (
            <div className="space-y-4">
              
              <div className="bg-white rounded-2xl p-6 shadow-subtle border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-stone-900">
                    Notice Board & Circular Management
                  </h2>
                  <p className="text-xs text-stone-500">
                    Publish urgent alerts, term circulars, and sports dates live to the home page notice board.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setAnnounceForm({ id: 0, title: '', category: 'Admissions', summary: '', content: '', isUrgent: false });
                    setIsAnnounceModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#560D0D] text-amber-200 hover:bg-[#3D0707] text-xs font-bold shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish New Circular</span>
                </button>
              </div>

              <div className="space-y-3">
                {announcements.map((item) => (
                  <div key={item.id} className="bg-white p-5 rounded-xl border border-stone-200 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                          {item.category}
                        </span>
                        {Boolean(item.is_urgent) && (
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-red-100 text-red-800 animate-pulse">
                            Urgent Notice
                          </span>
                        )}
                        <span className="text-xs text-stone-400">• {item.date}</span>
                      </div>
                      <h3 className="font-bold text-sm text-stone-900">{item.title}</h3>
                      <p className="text-xs text-stone-600 line-clamp-2">{item.summary}</p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => {
                          setAnnounceForm({
                            id: Number(item.id),
                            title: item.title,
                            category: item.category,
                            summary: item.summary,
                            content: item.content || '',
                            isUrgent: Boolean(item.is_urgent)
                          });
                          setIsAnnounceModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-semibold hover:bg-stone-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAnnouncement(Number(item.id))}
                        className="p-1.5 text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 5: PHOTO GALLERY MANAGER */}
          {activeTab === 'gallery' && (
            <div className="space-y-4">
              
              <div className="bg-white rounded-2xl p-6 shadow-subtle border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-stone-900">
                    College Photo Gallery Archive
                  </h2>
                  <p className="text-xs text-stone-500">
                    Upload and manage high-resolution photographs documented by the Digital Media Team.
                  </p>
                </div>

                <button
                  onClick={() => setIsGalleryModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#560D0D] text-amber-200 hover:bg-[#3D0707] text-xs font-bold shadow-sm"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload New Photograph</span>
                </button>
              </div>

              {/* Photos Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {gallery.map((g) => (
                  <div key={g.id} className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-subtle group flex flex-col justify-between">
                    <div className="relative aspect-video bg-stone-100 overflow-hidden">
                      <img 
                        src={g.image_url} 
                        alt={g.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-black/60 text-white">
                        {g.category}
                      </span>
                    </div>

                    <div className="p-3">
                      <h4 className="font-bold text-xs text-stone-900 line-clamp-1">{g.title}</h4>
                      {g.description && (
                        <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">{g.description}</p>
                      )}
                      <div className="pt-2 mt-2 border-t border-stone-100 flex items-center justify-between">
                        <span className="text-[10px] text-stone-400">By {g.created_by || 'Admin'}</span>
                        <button
                          onClick={() => handleDeleteGallery(Number(g.id))}
                          className="text-red-500 hover:text-red-700 text-xs p-1"
                          title="Delete photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </main>

      </div>

      {/* MODAL: ADMISSION INQUIRY DETAILS */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <span className="text-[10px] font-mono text-stone-400">Ref #{selectedInquiry.id}</span>
                <h3 className="font-bold text-base text-stone-900">Student Admission Record</h3>
              </div>
              <button onClick={() => setSelectedInquiry(null)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#FAF9F5] rounded-lg border border-stone-200 space-y-1">
                <div className="text-[10px] uppercase font-bold text-[#8A5217]">Applicant Student:</div>
                <div className="text-sm font-bold text-stone-900">{selectedInquiry.student_name}</div>
                <div className="font-semibold text-stone-700">Grade: {selectedInquiry.grade_applying} {selectedInquiry.stream ? `(${selectedInquiry.stream})` : ''}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="text-[10px] uppercase font-bold text-stone-500 block">Parent / Guardian:</span>
                  <span className="font-bold text-stone-900">{selectedInquiry.parent_name}</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="text-[10px] uppercase font-bold text-stone-500 block">Contact Phone:</span>
                  <a href={`tel:${selectedInquiry.phone}`} className="font-bold text-[#560D0D] underline">
                    {selectedInquiry.phone}
                  </a>
                </div>
              </div>

              {selectedInquiry.email && (
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="text-[10px] uppercase font-bold text-stone-500 block">Email:</span>
                  <span className="font-medium text-stone-800">{selectedInquiry.email}</span>
                </div>
              )}

              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <span className="text-[10px] uppercase font-bold text-stone-500 block">Residential Address:</span>
                <span className="text-stone-800 leading-relaxed">{selectedInquiry.residential_address}</span>
              </div>

              {selectedInquiry.message && (
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="text-[10px] uppercase font-bold text-stone-500 block">Parent Note / Message:</span>
                  <span className="text-stone-800 italic">"{selectedInquiry.message}"</span>
                </div>
              )}

              {/* Status Update Dropdown */}
              <div className="pt-2">
                <label className="block text-[11px] font-bold text-stone-700 mb-1">
                  Change Registration Status:
                </label>
                <div className="flex gap-2 flex-wrap">
                  {['pending', 'reviewed', 'contacted', 'admitted', 'archived'].map((st) => (
                    <button
                      key={st}
                      onClick={() => handleUpdateAdmissionStatus(selectedInquiry.id, st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                        selectedInquiry.status === st
                          ? 'bg-[#560D0D] text-amber-200 shadow-sm'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: POST / EDIT ANNOUNCEMENT */}
      {isAnnounceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="font-bold text-base text-stone-900">
                {announceForm.id ? 'Edit Notice Circular' : 'Publish New Notice'}
              </h3>
              <button onClick={() => setIsAnnounceModalOpen(false)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAnnouncement} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Notice Title *
                </label>
                <input
                  type="text"
                  required
                  value={announceForm.title}
                  onChange={(e) => setAnnounceForm({ ...announceForm, title: e.target.value })}
                  placeholder="e.g. Term Examination Timetable Released"
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-1 focus:ring-[#C8872B] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={announceForm.category}
                    onChange={(e) => setAnnounceForm({ ...announceForm, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none"
                  >
                    <option value="Admissions">Admissions</option>
                    <option value="Examination">Examination</option>
                    <option value="Sports">Sports</option>
                    <option value="Event">Event</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="urgentCheck"
                    checked={announceForm.isUrgent}
                    onChange={(e) => setAnnounceForm({ ...announceForm, isUrgent: e.target.checked })}
                    className="w-4 h-4 rounded text-[#C8872B] focus:ring-[#C8872B]"
                  />
                  <label htmlFor="urgentCheck" className="text-xs font-bold text-red-700 cursor-pointer">
                    Mark as Urgent Notice
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Summary (Displayed on Notice Card) *
                </label>
                <textarea
                  required
                  rows={2}
                  value={announceForm.summary}
                  onChange={(e) => setAnnounceForm({ ...announceForm, summary: e.target.value })}
                  placeholder="Concise overview for students and parents..."
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-1 focus:ring-[#C8872B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Full Details / Instructions
                </label>
                <textarea
                  rows={4}
                  value={announceForm.content}
                  onChange={(e) => setAnnounceForm({ ...announceForm, content: e.target.value })}
                  placeholder="Detailed circular content..."
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-1 focus:ring-[#C8872B] focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAnnounceModalOpen(false)}
                  className="px-4 py-2 bg-stone-100 text-stone-700 text-xs font-bold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#560D0D] text-amber-200 text-xs font-bold rounded-lg hover:bg-[#3D0707]"
                >
                  {announceForm.id ? 'Save Updates' : 'Publish Notice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: UPLOAD GALLERY PHOTOGRAPH */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="font-bold text-base text-stone-900">Upload Campus Photograph</h3>
              <button onClick={() => setIsGalleryModalOpen(false)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadGallery} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Select Image File (Max 5MB) *
                </label>
                <input
                  type="file"
                  required
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(e) => {
                    const f = e.target.files?.[0] || null;
                    setGalleryUpload({ ...galleryUpload, file: f });
                  }}
                  className="w-full text-xs text-stone-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#FAF2DF] file:text-[#8A5217] hover:file:bg-[#C8872B] hover:file:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Title / Event Name *
                </label>
                <input
                  type="text"
                  required
                  value={galleryUpload.title}
                  onChange={(e) => setGalleryUpload({ ...galleryUpload, title: e.target.value })}
                  placeholder="e.g. All-Island Athletic Championship"
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={galleryUpload.category}
                  onChange={(e) => setGalleryUpload({ ...galleryUpload, category: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none"
                >
                  <option value="Campus">Campus & Grounds</option>
                  <option value="Sports">Sports & Athletics</option>
                  <option value="Tradition">Tradition & Religious</option>
                  <option value="Culture">Performing Arts & Culture</option>
                  <option value="Academics">Academics & Labs</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Caption / Description
                </label>
                <input
                  type="text"
                  value={galleryUpload.description}
                  onChange={(e) => setGalleryUpload({ ...galleryUpload, description: e.target.value })}
                  placeholder="Optional brief description..."
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsGalleryModalOpen(false)}
                  className="px-4 py-2 bg-stone-100 text-stone-700 text-xs font-bold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#560D0D] text-amber-200 text-xs font-bold rounded-lg hover:bg-[#3D0707]"
                >
                  Upload & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREATE DIGITAL TEAM USER */}
      {isUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="font-bold text-base text-stone-900">Create Staff / Digital Team Account</h3>
              <button onClick={() => setIsUserModalOpen(false)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Username *
                </label>
                <input
                  type="text"
                  required
                  value={newUserForm.username}
                  onChange={(e) => setNewUserForm({ ...newUserForm, username: e.target.value })}
                  placeholder="e.g. digital_media or teacher_admin"
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Full Name / Note
                </label>
                <input
                  type="text"
                  value={newUserForm.fullName}
                  onChange={(e) => setNewUserForm({ ...newUserForm, fullName: e.target.value })}
                  placeholder="e.g. Media Unit Officer / S. Perera"
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Role Permission *
                </label>
                <select
                  value={newUserForm.role}
                  onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none"
                >
                  <option value="digital_team">Digital Team (Uploads, Gallery & Circulars)</option>
                  <option value="admin">Administrator (Full Access & User Control)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Initial Password (Min 8 Characters) *
                </label>
                <input
                  type="password"
                  required
                  value={newUserForm.password}
                  onChange={(e) => setNewUserForm({ ...newUserForm, password: e.target.value })}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUserModalOpen(false)}
                  className="px-4 py-2 bg-stone-100 text-stone-700 text-xs font-bold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#560D0D] text-amber-200 text-xs font-bold rounded-lg hover:bg-[#3D0707]"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
