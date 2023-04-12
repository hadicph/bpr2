import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMenuClick = () => {
        setIsOpen(!isOpen);
    }

    //ToDo Change dropdown or replace it all toghether
    return (
        <div className="navbar bg-base-100">
            <div className="flex-none">
                <button className="btn btn-square btn-ghost" onClick={handleMenuClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
                {/* DropDown Menu */}
                {isOpen && (
                    <div className="absolute top-20 left-14 mt-2 space-y-2 bg-white text-black rounded-md shadow-md" style={{ zIndex: '9999' }}>
                        <a href="/" className="block px-4 py-2">Home</a>
                        <a href="/edit" className="block px-4 py-2">Edit Profile</a>
                        <a href="/adresses" className="block px-4 py-2">Start & End Adresses</a>
                        <a href="/statistics" className="block px-4 py-2">Statistics</a>
                        <a href="/settings" className="block px-4 py-2">Settings</a>
                        <a href="/signout" className="block px-4 py-2">Sign Out</a>
                    </div>
                )}
            </div>
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost normal-case text-xl">Your choise</Link> {/* Use Link instead of anchor tag */}
            </div>

        </div>
    );
};

export default NavBar;
