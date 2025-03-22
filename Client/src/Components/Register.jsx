import React, { useState } from 'react';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', email: '', password: '', image: null });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({ ...formData, [name]: files ? files[0] : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('username', formData.username);
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('image', formData.image);
        await axios.post('http://localhost:4000/register', data, { withCredentials: true });
        setFormData({ username: '', email: '', password: '', image: null });
        navigate('/login');
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 shadow-lg">
            <h1 className='font-bold  text-3xl mb-3 text-slate-800'>WelCome To ChatSphare</h1>
            <div className="bg-white p-8 rounded-2xl w-3/4 shadow-lg max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-800  mb-6">Register</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {[{ type: "text", name: "username", placeholder: "Enter name" }, { type: "email", name: "email", placeholder: "Enter email" }, { type: "password", name: "password", placeholder: "Enter password" }, { type: "file", name: "image" }].map((input, index) => (
                        <input key={index} {...input} value={input.type !== "file" ? formData[input.name] : undefined} onChange={handleChange} required className="w-full p-3 border border-sky-800  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    ))}
                    <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition">Register</button>
                </form>
                <p className="text-center px-2 text-gray-700 mt-4">Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link></p>
            </div>
        </div >
    )
}

export default Register