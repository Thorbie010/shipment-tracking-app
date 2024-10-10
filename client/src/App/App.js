import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import LoginForm from '../LoginForm/LoginForm';
// import Dashboard from '../Dashboard/Dashboard';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import LandingPage from '../LandingPage/LandingPage';
import '../Styles/styles.css';
import ShipmentDetails from "../ShipmentDetails/ShipmentDetails";
import EditProfile from "../Profile/EditProfile";
import { useAppContext, AppProvider } from "./AppContext";

function App() {
    const { isLoggedIn, registrationSuccess } = useAppContext();

    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow bg-gray-100">
                    <Routes>
                        {!isLoggedIn && (
                            <>
                                <Route exact path="/" element={<LandingPage />} />
                                <Route path="/login" element={<LoginForm />} />
                                <Route path="/register" element={<RegistrationForm />} />
                            </>
                        )}
                        {isLoggedIn && (
                            <>
                                <Route path="/" element={<LandingPage />} />
                                <Route path="/EditProfile" element={<EditProfile />} />
                            </>
                        )}
                        <Route path="*" element={<Navigate to="/" />} />
                        <Route path="/shipments" element={<ShipmentDetails />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}


export default function AppWithProvider() {
    return (
        <AppProvider>
            <App />
        </AppProvider>
    );
}
