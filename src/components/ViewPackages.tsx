import React, { useState, useEffect } from 'react';
// import { HeadlessButton } from '@locoworks/reusejs-react-button';

interface Package {
    name: string;
    reason: string;
}

const ViewPackages: React.FC = () => {
    const [favPackages, setFavPackages] = useState<Package[]>([]);
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [editReason, setEditReason] = useState<string>('');

    useEffect(() => {
        const storedFavPackages = localStorage.getItem('myFavPackages');
        if (storedFavPackages) {
            setFavPackages(JSON.parse(storedFavPackages));
        }
    }, []);

    const handleDelete = (name: string) => {
        const updatedPackages = favPackages.filter(pkg => pkg.name !== name);
        setFavPackages(updatedPackages);
        localStorage.setItem('myFavPackages', JSON.stringify(updatedPackages));
    };

    const handleEdit = (pkg: Package) => {
        setIsEditing(pkg.name);
        setEditReason(pkg.reason);
    };

    const handleSave = (name: string) => {
        const updatedPackages = favPackages.map(pkg =>
            pkg.name === name ? { ...pkg, reason: editReason } : pkg
        );
        setFavPackages(updatedPackages);
        localStorage.setItem('myFavPackages', JSON.stringify(updatedPackages));
        setIsEditing(null);
        setEditReason('');
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Welcome to Favorite NPM Packages</h1>
            {favPackages.length === 0 ? (
                <div className="border rounded p-4 text-center">
                    <p className="mb-4">You don't have any favs yet. Please add.</p>
                    {/* <HeadlessButton className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add Fav
                    </HeadlessButton> */}
                </div>
            ) : (
                <div>
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Package Name</th>
                                <th className="py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {favPackages.map(pkg => (
                                <tr key={pkg.name}>
                                    <td className="py-2 px-4 border-b">
                                        {pkg.name}
                                    </td>
                                    <td className="py-2 px-4 border-b flex justify-around">
                                        <button
                                            className="text-blue-500 hover:text-blue-700"
                                            onClick={() => alert(`Reason: ${pkg.reason}`)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="text-yellow-500 hover:text-yellow-700"
                                            onClick={() => handleEdit(pkg)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => handleDelete(pkg.name)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {isEditing && (
                        <div className="mt-4">
                            <label htmlFor="editReason" className="block text-gray-700 text-sm font-bold mb-2">
                                Edit Reason
                            </label>
                            <input
                                id="editReason"
                                type="text"
                                value={editReason}
                                onChange={(e) => setEditReason(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <div className="flex justify-end mt-2">
                                <button
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    onClick={() => handleSave(isEditing)}
                                >
                                    Save
                                </button>
                                <button
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => {
                                        setIsEditing(null);
                                        setEditReason('');
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ViewPackages;


