import axios from 'axios';

const url = "https://tang-memories-project.herokuapp.com";  //https://tang-memories-project.herokuapp.com' http://localhost:5000/

const Api = axios.create({ baseURL: url });

Api.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req
})

export const fetchPosts = (page) => Api.get(`/posts?page=${page}`);
export const fetchPost = (id) => Api.get(`/posts/${id}`);

export const fetchPostsBySearch = (searchQuery) => Api.get(`/posts/homepage/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => Api.post('/posts', newPost);
export const updatePost = (id, updatePost) => Api.patch(`/posts/${id}`, updatePost);
export const deletePost = (id) => Api.delete(`/posts/${id}`);
export const likePost = (id) => Api.patch(`/posts/${id}/likePost`);


export const signUp = (formData) => Api.post('/user/signup', formData);
export const signIn = (formData) => Api.post('/user/signin', formData);


export const comment = (value, id) => Api.post(`/posts/${id}/commentPost`, { value });