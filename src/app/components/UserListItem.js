'use client';

import React, { useState } from 'react';
import { updateUser, deleteUser } from "@/app/actions/users";
import { useFormStatus } from 'react-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

// Loading button component
function Button({ children, ...props }) {
    const { pending } = useFormStatus();

    return (
        <button
            {...props}
            disabled={pending}
            className={`px-3 py-1 rounded text-white disabled:opacity-50 ${props.className}`}
        >
            {pending ? <FontAwesomeIcon icon={faSpinner} spinPulse /> : children}
        </button>
    );
}

export default function UserListItem({ user }) {
    const [isEditing, setIsEditing] = useState(false);

    if (!user) return null;

    if (isEditing) {
        return (
            <li className='p-4 bg-gray-100 rounded shadow-md'>
                <form action={updateUser} className='space-y-2'>
                    <input type='hidden' name='id' value={user.id} />
                    <div>
                        <input
                            type='text'
                            name='name'
                            defaultValue={user.name}
                            className='border p-2 rounded w-full text-gray-500'
                            required
                        />
                    </div>
                    <div>
                        <input
                            type='email'
                            name='email'
                            defaultValue={user.email}
                            className='border p-2 rounded w-full text-gray-500'
                            required
                        />
                    </div>
                    {/* ---- buttons */}
                    <div className='space-x-2'>
                        <Button type="submit" className="bg-green-500 hover:bg-green-700">
                            Save
                        </Button>
                        <button
                            type='button'
                            className='bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600'
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </li>
        );
    }

    return (
        <li className='p-4 bg-gray-100 rounded flex justify-between items-center shadow-md'>
            {/* --------------- list user data from database */}
            <div className='flex flex-col'>
                <span className="font-bold text-gray-800">{user.name}</span> <br />
                <span className="text-gray-600">{user.email}</span>
                <span className='font-extralight text-gray-600'> Account Created:
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "no date"}
                </span>
            </div>
                {/* ---------- actions buttons */}
            <div className='space-x-2'>
                <button
                    onClick={() => setIsEditing(true)}
                    className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'
                >
                    Edit
                </button>
                <form action={deleteUser}>
                    <input type='hidden' name='id' value={user.id} />
                    <Button
                        type='submit'
                        className="bg-red-500 rounded hover:bg-red-600"
                        onClick={(e) => {
                            if (!confirm('Are you sure?')) {
                                e.preventDefault();
                            }
                        }}
                    >
                        Delete
                    </Button>
                </form>
            </div>
        </li>
    );
}
