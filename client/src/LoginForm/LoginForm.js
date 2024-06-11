import React, { useState} from "react";
import { Link } from "react-router-dom";
import "../styles.css"
import { LoadingDots } from "../Utilities/Utilities";

function LoginForm({ onLogin, registrationSuccess }){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try{
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("Invalid email or password");
                }
                throw new Error("Something went wrong");
            }

            setEmail("");
            setPassword("");
            setError(null);
            onLogin();
        } catch (error) {
            console.error("Error:", error);
            setError("Something went wrong. Please try again later.");
            setIsLoading(false);
        } finally{
            setIsLoading(false);
        }
    };
    
    return (
        <div className="login-reg-div">
            <h2 className="form-header">Sign In</h2>
            {registrationSuccess && <p className="text-red-500 mb-4">Please login to continue</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input 
                        type="text" 
                        id="email" 
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)} 
                        className="field-input"
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
                    />
                </div>
                <button type="submit" disabled={isLoading} className={`w-full mt-3 bg-blue-500 text-white px-4 ${isLoading ? 'bg-blue-800 py-4' : 'py-2'} rounded-md hover:bg-blue-800`}>
                    {isLoading? <LoadingDots /> : 'Login'}
                </button>
                {error && <p className="text-red-500">{error}</p>}
                <p className="text-center mt-5">Don't have an account? <Link to={'/Register'}><span className="font-semibold underline">Sign Up</span></Link></p>
            </form>
        </div>
    );
}

export default LoginForm