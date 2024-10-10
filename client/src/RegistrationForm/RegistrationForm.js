import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import '../Styles/styles.css';
import { LoadingDots } from "../Utilities/Utilities";
import { useAppContext } from "../App/AppContext";

function RegistrationForm() {
    const {handleRegister} = useAppContext();
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
            setIsLoading(false);
            return;
        }

        try {
            const userData = { firstname, lastname, email, phonenumber, password };
            const response = await fetch('https://localhost:5000/api/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(userData),
            });
            
            if (response.ok) {
              console.log('Registration successful!');
              setRegistrationSuccess(true);
              handleRegister()
            } else {
              console.error('Registration failed.');
            }
          } catch (error) {
            console.error('Error during registration:', error);
            setIsLoading(false);
          } finally {
            setIsLoading(false);
          }
        
    };

    if (registrationSuccess) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="reg-div">
            <h2 className="form-header">Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col lg:flex-row ">
                    <div className="mb-4">
                        <input 
                            type="text" 
                            id="firstname" 
                            value={firstname} 
                            placeholder="First Name"
                            onChange={(e) => setFirstname(e.target.value)} 
                            className="field-input"
                            required
                        />
                        </div>
                    <div className="mb-4 lg:ml-10">
                        <input 
                            type="text" 
                            id="lastname" 
                            value={lastname} 
                            placeholder="Last Name"
                            onChange={(e) => setLastname(e.target.value)} 
                            className="field-input"
                            required
                        />
                    </div>                 
                </div>
                <div className="mb-4">
                    <input 
                        type="text" 
                        id="email" 
                        value={email} 
                        placeholder="Enter Your Email Address"
                        onChange={(e) => setEmail(e.target.value)} 
                        className="field-input"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input 
                        type="text" 
                        id="phoneNumber" 
                        value={phonenumber} 
                        placeholder="Enter Phone number"
                        onChange={(e) => setPhoneNumber(e.target.value)} 
                        className="field-input"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        id="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="field-input"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="field-input"
                        required
                    />
                </div>
                <button type="submit" disabled={isLoading} className={`w-full mt-3 bg-gray-800 text-white px-4 ${isLoading ? 'bg-gray-600 py-6' : 'py-4'} rounded-md hover:bg-gray-600`}>
                    {isLoading? <LoadingDots /> : 'Register'}
                </button>
                {error && <p>{error}</p>}
            </form>
            <p className="text-center mt-3 ">Already have an account? <Link to={'/Login'}><span className="font-semibold underline">Log In</span></Link></p>
        </div>
    );
};

export default RegistrationForm;
