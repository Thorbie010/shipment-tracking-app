import React from "react";
import { Link } from "react-router-dom";
import QC2 from "../assets/QC2.png"
import menu from "../assets/menu.png"
import close from "../assets/close.png"
import notification from '../assets/notifications.png'
import account from '../assets/account.png'
import drop from '../assets/drop.png'
import { useAppContext } from "../App/AppContext";


function Header() {
    const { isLoggedIn, isOpen, handleSignOut, toggleSidebar, isSidebarOpen, isLargeScreen, toggleDropdown } = useAppContext();

    return (
        <header className="bg-white-800 text-black py-4 px-6">
            <div className={`max-w-screen-xl ${isLargeScreen ? 'mx-30' : 'mx-auto'} h-10 font-semibold flex items-center justify-between`}>
            <Link to="/" ><img alt="logo" src={QC2} className="h-40 w-40"/></Link>
            <div className="flex items-center">
                    {isLargeScreen && (
                        <nav className="hidden md:flex space-x-10">
                            <Link to={''} className="text-l hover:text-gray-300">Home</Link>
                            <Link to={''} className="text-l hover:text-gray-300">About</Link>
                            <Link to={''} className="text-l hover:text-gray-300">Services</Link>
                            <Link to={''} className="text-l hover:text-gray-300">Contact</Link>
                        </nav>
                    )}
                    {!isLoggedIn ? (
                        <Link to="/login" className={`text-red-500 font-semibold ${isLargeScreen ? 'ml-[100px] bg-red-500 text-white h-10 py-5 px-5 flex items-center border rounded' : 'mr-5'}`}>Sign In/Sign Up</Link>
                    ) : (
                        <div className={`${isLargeScreen ? 'ml-60 flex flex-row' : 'flex flex-row' }`}>
                            <Link to={''}><img alt="notification" src={notification} className="h-8 mr-5"/></Link>
                            <button to={''} onClick={toggleDropdown} >
                                <div className="flex flex-row bg-white p-0 h-8" onClick={toggleDropdown}>
                                    <img alt="account" src={account} className={`${isLargeScreen ? 'h-10 self-end' : 'h-8 self-start'}`} />
                                    <img alt="drop" src={drop} />
                                    
                                </div>
                            </button>
                            {isOpen && (
                                <div className="flex flex-col space-y-2 bg-white fixed z-20 mt-10 p-5 items-start">
                                        <Link to={'/EditProfile'}> My Profile</Link>
                                        <Link to={''}> Transactions</Link>
                                        <button onClick={handleSignOut}> Sign Out</button>
                                </div>
                                )}
                        </div>
                    )}
                    {!isLargeScreen && (
                        <button 
                            className=""
                            onClick={toggleSidebar}
                        >
                            {isSidebarOpen ? <img alt="close" src={close} className="h-8" /> : <img alt="menu" src={menu} className="h-8"/>}
                        </button>
                    )}
                </div>
            </div>
            <nav className={`block top-20 right-0 w-full h-full bg-white-800 font-semibold text-black py-4 px-6 md:w-64 ${isSidebarOpen ? 'block' : 'hidden'}`}>
                <ul className="flex flex-col space-y-4">
                    <li>
                        <Link to={''} className="text-l hover:text-gray-300">Home</Link>
                    </li>
                    <li>
                        <Link to={''} className="text-l hover:text-gray-300">About</Link>
                    </li>
                    <li>
                        <Link to={''} className="text-l hover:text-gray-300">Services</Link>
                    </li>
                    <li>
                        <Link to={''} className="text-l hover:text-gray-300">Services</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
