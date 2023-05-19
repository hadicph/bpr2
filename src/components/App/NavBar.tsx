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
                        <Link to="/" className="block px-4 py-2">Home</Link>
                        <Link to="/edit" className="block px-4 py-2">Edit Profile</Link>
                        <Link to="/default-address" className="block px-4 py-2">Start & End Addresses</Link>
                        <Link to="/statistics" className="block px-4 py-2">Statistics</Link>
                        <Link to="/settings" className="block px-4 py-2">Settings</Link>
                        <Link to="/signout" className="block px-4 py-2">Sign Out</Link>
                    </div>
                )}
            </div>
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost normal-case text-xl">Your Choice</Link> {/* Use Link instead of anchor tag */}
            </div>

        </div>
    );
};

export default NavBar;
