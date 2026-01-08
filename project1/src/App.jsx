import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import ReviewsAndRatings from './pages/ReviewsAndRatings'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'
import Contacts from './pages/Contacts'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import ProtectedRoute from './routes/ProtectedRoute'



export default function App() {
return (
<div className="min-h-screen flex flex-col">
<Navbar />
<main className="flex-1 container mx-auto p-4">
<Routes>
<Route path="/" element={<Home />} />
<Route path="/about" element={<About />} />
<Route path="/contact" element={<Contacts />} />

<Route
path="/user-dashboard/*"
element={
<ProtectedRoute allowedRoles={["user","admin"]}>
<UserDashboard />
</ProtectedRoute>
}
/>


<Route
path="/admin-dashboard/*"
element={
<ProtectedRoute allowedRoles={["admin"]}>
<AdminDashboard />
</ProtectedRoute>
}
/>
<Route path="*" element={<NotFound />} />
<Route path="/reviews" element={<ReviewsAndRatings />} />

</Routes>
</main>
</div>
)
}