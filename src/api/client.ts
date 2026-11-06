// API Client for Sir John Kotelawala Maha Vidyalaya Backend

const API_BASE = '/api';

export interface User {
  id: number;
  username: string;
  role: 'admin' | 'digital_team';
  fullName: string;
  mustChangePassword?: boolean;
}

export interface AdmissionInquiry {
  id: number;
  student_name: string;
  parent_name: string;
  phone: string;
  email?: string;
  grade_applying: string;
  stream?: string;
  residential_address: string;
  message?: string;
  status: 'pending' | 'reviewed' | 'contacted' | 'admitted' | 'archived';
  admin_notes?: string;
  ip_address?: string;
  created_at: string;
}

export interface AnnouncementItem {
  id: number | string;
  title: string;
  category: string;
  date: string;
  summary: string;
  content?: string;
  is_urgent: number | boolean;
  created_by?: string;
  created_at: string;
}

export interface GalleryItem {
  id: number | string;
  title: string;
  category: string;
  image_url: string;
  description?: string;
  created_by?: string;
  created_at: string;
}

export interface DashboardStats {
  totalAdmissions: number;
  pendingAdmissions: number;
  totalAnnouncements: number;
  totalGallery: number;
  totalUsers: number;
}

export const authStorage = {
  getToken: (): string | null => localStorage.getItem('sjkmv_auth_token'),
  setToken: (token: string) => localStorage.setItem('sjkmv_auth_token', token),
  clearToken: () => localStorage.removeItem('sjkmv_auth_token'),
  getUser: (): User | null => {
    const raw = localStorage.getItem('sjkmv_auth_user');
    return raw ? JSON.parse(raw) : null;
  },
  setUser: (user: User) => localStorage.setItem('sjkmv_auth_user', JSON.stringify(user)),
  clearUser: () => localStorage.removeItem('sjkmv_auth_user'),
  logout: () => {
    localStorage.removeItem('sjkmv_auth_token');
    localStorage.removeItem('sjkmv_auth_user');
  }
};

async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = authStorage.getToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    if (res.status === 401 && !endpoint.includes('/auth/login')) {
      authStorage.logout();
      window.location.href = '/admin/login';
    }
    throw new Error(data.error || data.message || `Request failed with status ${res.status}`);
  }

  return data as T;
}

export const api = {
  // Auth
  login: (credentials: { username: string; password: string }) =>
    apiFetch<{ token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  changePassword: (data: { currentPassword?: string; newPassword: string }) =>
    apiFetch<{ success: boolean; message: string; token: string; user: User }>('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getMe: () => apiFetch<User>('/auth/me'),

  // Users (Admin Only)
  getUsers: () => apiFetch<User[]>('/users'),
  createUser: (userData: { username: string; password: string; role: 'admin' | 'digital_team'; fullName?: string }) =>
    apiFetch<{ success: boolean; message: string; id: number }>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  deleteUser: (id: number) =>
    apiFetch<{ success: boolean; message: string }>(`/users/${id}`, {
      method: 'DELETE',
    }),
  resetUserPassword: (id: number, newPassword: string) =>
    apiFetch<{ success: boolean; message: string }>(`/users/${id}/reset-password`, {
      method: 'POST',
      body: JSON.stringify({ newPassword }),
    }),

  // Admissions
  submitAdmission: (form: {
    studentName: string;
    parentName: string;
    phone: string;
    email?: string;
    gradeApplying: string;
    stream?: string;
    residentialAddress: string;
    message?: string;
  }) =>
    apiFetch<{ success: boolean; message: string; inquiryId: number }>('/admissions', {
      method: 'POST',
      body: JSON.stringify(form),
    }),

  getAdmissions: (filter?: { status?: string; grade?: string }) => {
    const params = new URLSearchParams();
    if (filter?.status) params.set('status', filter.status);
    if (filter?.grade) params.set('grade', filter.grade);
    const qs = params.toString() ? `?${params.toString()}` : '';
    return apiFetch<AdmissionInquiry[]>(`/admissions${qs}`);
  },

  updateAdmission: (id: number, update: { status?: string; adminNotes?: string }) =>
    apiFetch<{ success: boolean; message: string }>(`/admissions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(update),
    }),

  deleteAdmission: (id: number) =>
    apiFetch<{ success: boolean; message: string }>(`/admissions/${id}`, {
      method: 'DELETE',
    }),

  // Announcements
  getAnnouncements: () => apiFetch<AnnouncementItem[]>('/announcements'),

  createAnnouncement: (item: {
    title: string;
    category: string;
    date?: string;
    summary: string;
    content?: string;
    isUrgent?: boolean;
  }) =>
    apiFetch<{ success: boolean; id: number; message: string }>('/announcements', {
      method: 'POST',
      body: JSON.stringify(item),
    }),

  updateAnnouncement: (id: number, item: {
    title: string;
    category: string;
    date: string;
    summary: string;
    content?: string;
    isUrgent?: boolean;
  }) =>
    apiFetch<{ success: boolean; message: string }>(`/announcements/${id}`, {
      method: 'PUT',
      body: JSON.stringify(item),
    }),

  deleteAnnouncement: (id: number) =>
    apiFetch<{ success: boolean; message: string }>(`/announcements/${id}`, {
      method: 'DELETE',
    }),

  // Gallery
  getGallery: () => apiFetch<GalleryItem[]>('/gallery'),

  uploadGalleryImage: (formData: FormData) =>
    apiFetch<{ success: boolean; message: string; item: GalleryItem }>('/gallery/upload', {
      method: 'POST',
      body: formData,
    }),

  deleteGalleryImage: (id: number) =>
    apiFetch<{ success: boolean; message: string }>(`/gallery/${id}`, {
      method: 'DELETE',
    }),

  // Stats
  getStats: () => apiFetch<DashboardStats>('/stats'),
};
