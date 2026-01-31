const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://your-vercel-app.vercel.app/api' 
  : 'http://localhost:3000/api';

class ApiService {
  static async request(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(`${API_BASE}${endpoint}`, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    
    return data;
  }

  // Auth
  static signup(userData) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  static signin(credentials) {
    return this.request('/auth/signin', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  static verify(verificationData) {
    return this.request('/auth/verify', {
      method: 'POST',
      body: JSON.stringify(verificationData),
    });
  }

  // User
  static getProfile() {
    return this.request('/user/profile');
  }

  static updateProfile(profileData) {
    return this.request('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  static shortlistUniversity(universityId) {
    return this.request(`/user/shortlist/${universityId}`, {
      method: 'POST',
    });
  }

  static lockUniversity(universityId) {
    return this.request(`/user/lock/${universityId}`, {
      method: 'POST',
    });
  }

  // Todos
  static getTodos() {
    return this.request('/user/todos');
  }

  static createTodo(todoData) {
    return this.request('/user/todos', {
      method: 'POST',
      body: JSON.stringify(todoData),
    });
  }

  static updateTodo(todoId, updates) {
    return this.request(`/user/todos/${todoId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // Universities
  static getUniversities() {
    return this.request('/universities');
  }

  // AI
  static chatWithAI(message) {
    return this.request('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }
}

export default ApiService;