import React from 'react'
import { useAuth } from '../context/AuthContext'


export default function AdminDashboard(){
const { user } = useAuth()


return (
<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
<aside className="md:col-span-1 bg-white p-4 rounded shadow">
<h4 className="font-semibold">Admin Menu</h4>
<nav className="mt-2 flex flex-col gap-2">
<a className="text-sm">Manage Users</a>
<a className="text-sm">Manage Courses</a>
<a className="text-sm">Settings</a>
</nav>
</aside>


<section className="md:col-span-3 bg-white p-4 rounded shadow">
<h2 className="text-xl font-bold">Admin Panel — {user?.name}</h2>
<p>Use this area to manage institute data, approvals, and system settings.</p>


<div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
<div className="p-4 border rounded">User requests</div>
<div className="p-4 border rounded">Course approvals</div>
</div>
</section>
</div>
)
}