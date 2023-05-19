import React from "react";
import { ReactElement } from "react";

type HeaderProps = {
    children?: ReactElement;
    username?: string;
    signOut?: () => void;
  };

const Header: React.FC<HeaderProps> = ({ children, username, signOut }) => {
    return(
        <>
        <div className="py-4 bg-blue-500 text-white flex justify-between items-center">
          <span className="text-xl font-bold">Welcome, {username}</span>
          <button className="px-4 py-2 bg-blue-700 rounded hover:bg-blue-800" onClick={signOut}>
            Sign out
            </button>
            </div>
        </>
      );
}

export default Header;