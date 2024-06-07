import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";

function RegistrationForm({ onRegister }) {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState('');
    const [error, setError] = useState(null);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            console.error('Passwords do not match');
            return;
        }

        try {
            const userData = { firstname, lastname, email, phonenumber, password };
            const response = await fetch('', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(userData),
            });
            
            if (response.ok) {
              console.log('Registration successful!');
              setRegistrationSuccess(true);
              onRegister(true);
            } else {
              console.error('Registration failed.');
              return;
            }
          } catch (error) {
            console.error('Error during registration:', error);
            return;
          }
        
    };

    if (registrationSuccess) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="max-w-md mx-auto mb-10 mt-8 p-6 bg-white shadow-md">
            <h2 className="text-2xl font-sembold mb-4 font-bold text-center">Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input 
                        type="text" 
                        id="firstname" 
                        value={firstname} 
                        placeholder="First Name"
                        onChange={(e) => setFirstname(e.target.value)} 
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
                    />
                    </div>
                <div className="mb-4">
                    <input 
                        type="text" 
                        id="lastname" 
                        value={lastname} 
                        placeholder="Last Name"
                        onChange={(e) => setLastname(e.target.value)} 
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
                    />
                </div>
                <div className="mb-4">
                    <input 
                        type="text" 
                        id="email" 
                        value={email} 
                        placeholder="Enter Your Email Address"
                        onChange={(e) => setEmail(e.target.value)} 
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
                    />
                </div>
                <div className="mb-4">
                    <input 
                        type="text" 
                        id="phoneNumber" 
                        value={phonenumber} 
                        placeholder="Enter Phone number"
                        onChange={(e) => setPhoneNumber(e.target.value)} 
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        id="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mt-5 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400" 
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full mt-5 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400" 
                    />
                </div>
                <button type="submit" disabled={isLoading} className="w-full mt-5 text-md font-semibold bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Register</button>
                {error && <p>{error}</p>}
            </form>
            <p className="text-center mt-5">Already have an account? <Link to={'/Login'}><span className="font-semibold underline">Log In</span></Link></p>
        </div>
    );
};

export default RegistrationForm;
