export const API_BASE = import.meta.env.VITE_API_URL || 'https://asr-academic-research-rncf.vercel.app/api';

export const api = {
  // Auth
  async adminLogin(username, password) {
    try {
      const res = await fetch(`${API_BASE}/auth/admin-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      return await res.json();
    } catch (e) {
      console.warn('Admin login fetch error:', e);
      return { success: false, message: 'Server communication error.' };
    }
  },

  async requestOtp(email) {
    try {
      const res = await fetch(`${API_BASE}/auth/request-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      return await res.json();
    } catch (e) {
      console.warn('API error sending OTP:', e);
      return { success: false, message: 'Server communication error while dispatching OTP.' };
    }
  },

  async verifyOtp(email, otp) {
    try {
      const res = await fetch(`${API_BASE}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      return await res.json();
    } catch (e) {
      console.warn('API error verifying OTP:', e);
      return {
        success: false,
        message: 'Network error. Please check your connection and retry.'
      };
    }
  },

  // Papers
  async getMyPapers(token) {
    try {
      const res = await fetch(`${API_BASE}/papers/my-papers`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  async getAllDocumentsForAdmin(token) {
    try {
      const res = await fetch(`${API_BASE}/staff/documents`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  async getAllPapersForAdmin(token) {
    try {
      const res = await fetch(`${API_BASE}/staff/papers`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  async registerPaper(token, paperData) {
    try {
      const res = await fetch(`${API_BASE}/papers/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paperData)
      });
      return await res.json();
    } catch (e) {
      return { success: false, message: 'Server communication error.' };
    }
  },

  async bulkUploadPapers(token, payload) {
    try {
      const res = await fetch(`${API_BASE}/papers/bulk-upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      return await res.json();
    } catch (e) {
      return { success: false, message: 'Server communication error during bulk upload.' };
    }
  },

  async updatePaperStatus(token, paperId, statusData) {
    try {
      const res = await fetch(`${API_BASE}/papers/${paperId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(statusData)
      });
      return await res.json();
    } catch (e) {
      return { success: false, message: 'Server communication error.' };
    }
  },

  // Staff & Admin Management
  async getStaffCoordinators(token) {
    try {
      const res = await fetch(`${API_BASE}/staff/coordinators`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  async getAllAuthors(token) {
    try {
      const res = await fetch(`${API_BASE}/staff/authors`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  async createAuthorProfile(token, authorData) {
    try {
      const res = await fetch(`${API_BASE}/staff/authors/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(authorData)
      });
      return await res.json();
    } catch (e) {
      return { success: false, message: 'Failed to create author profile.' };
    }
  },

  async getAllPaymentsForAdmin(token) {
    try {
      const res = await fetch(`${API_BASE}/staff/payments`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  async createPaymentRecord(token, paymentData) {
    try {
      const res = await fetch(`${API_BASE}/staff/payments/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
      });
      return await res.json();
    } catch (e) {
      return { success: false, message: 'Failed to create payment record.' };
    }
  },

  async createCoordinator(token, coordData) {
    try {
      const res = await fetch(`${API_BASE}/staff/coordinators/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(coordData)
      });
      return await res.json();
    } catch (e) {
      return { success: false, message: 'Failed to create coordinator.' };
    }
  },

  async updatePaymentStatus(token, paymentId, paymentData) {
    try {
      const res = await fetch(`${API_BASE}/staff/payments/${paymentId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
      });
      return await res.json();
    } catch (e) {
      return { success: false, message: 'Failed to update payment status.' };
    }
  },

  async assignCoordinator(token, paperId, coordData) {
    try {
      const res = await fetch(`${API_BASE}/staff/papers/${paperId}/assign-coordinator`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(coordData)
      });
      return await res.json();
    } catch (e) {
      return { success: false, message: 'Failed to assign coordinator.' };
    }
  },

  // Documents
  async getDocuments(token) {
    try {
      const res = await fetch(`${API_BASE}/documents`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  async downloadDocument(token, docId) {
    try {
      const res = await fetch(`${API_BASE}/documents/download/${docId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return await res.json();
    } catch (e) {
      return { success: false, message: 'Download verification failed' };
    }
  },

  // Payments
  async getPayments(token) {
    try {
      const res = await fetch(`${API_BASE}/payments`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  // Notifications
  async getNotifications(token) {
    try {
      const res = await fetch(`${API_BASE}/notifications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  async markNotificationRead(token, notifId) {
    try {
      const res = await fetch(`${API_BASE}/notifications/${notifId}/read`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  }
};
