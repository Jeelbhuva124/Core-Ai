import api from '../utils/api';

// Example API calls — replace with your actual endpoints
export const exampleAPI = {
    getAll: () => api.get('/Example').then(res => res.data),
    getById: (id) => api.get(`/Example/${id}`).then(res => res.data),
    create: (data) => api.post('/Example', data).then(res => res.data),
    update: (id, data) => api.put(`/Example/${id}`, data).then(res => res.data),
    delete: (id) => api.delete(`/Example/${id}`).then(res => res.data),
};
