import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


export default function UserDashboard(){
const { user } = useAuth()


return (
<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
<aside className="md:col-span-1 bg-white p-4 rounded shadow">
<h4 className="font-semibold">User Menu</h4>
<nav className="mt-2 flex flex-col gap-2">
<Link to="/user-dashboard/profile" className="text-sm">Profile</Link>
<Link to="/user-dashboard/courses" className="text-sm">Courses</Link>
</nav>
</aside>


<section className="md:col-span-3 bg-white p-4 rounded shadow">
<h2 className="text-xl font-bold">Welcome, {user?.name}</h2>
<p>Your role: {user?.role}</p>


<div className="mt-4 space-y-3">
<div className="p-3 border rounded">Notifications / Quick actions</div>
<div className="p-3 border rounded">Enrolled courses list</div>
</div>
</section>
</div>
)
}