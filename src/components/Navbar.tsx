import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">
                    <Link to="/">Package Manager</Link>
                </div>
                <div className="space-x-4">
                    <Link
                        to="/add-new-package"
                        className="text-white hover:bg-blue-700 px-3 py-2 rounded-md"
                    >
                        Add New Package
                    </Link>
                    <Link
                        to="/view-favorite-packages"
                        className="text-white hover:bg-blue-700 px-3 py-2 rounded-md"
                    >
                        View Favorite Packages
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
