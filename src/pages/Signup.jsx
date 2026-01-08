import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        
        // VALIDATION: Check password length
        if(password.length < 6) {
            toast.error("Password must be at least 6 characters.");
            return;
        }

        try {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Account created successfully!");
        navigate('/'); // Go to dashboard
        } catch (error) {
        console.error(error);
        if (error.code === 'auth/email-already-in-use') {
            toast.error("Email is already in use.");
        } else {
            toast.error("Failed to create account.");
        }
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
            
            <form onSubmit={handleSignup} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                type="email"
                required
                className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                type="password"
                required
                className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                Create Account
            </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
            </p>
        </div>
        </div>
    );
}