import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ManageInstitutes() {
  const [institutes, setInstitutes] = useState([]);
  const [mediaList, setMediaList] = useState([]);
  const [branchesList, setBranchesList] = useState([]);
  const [coursesList, setCoursesList] = useState([]);

  // ==================== Institute Form ====================
  const [newInstitute, setNewInstitute] = useState({
    name: "",
    description: "",
    category: "",
    fees: "",
    facilities: "",
    benefits: "",
    accreditation: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone1: "",
    phone2: "",
    email: "",
    website: "",
    openTime: "",
    closeTime: "",
    imageUrl: "" // card image URL
  });

  // ==================== Course Form ====================
  const [course, setCourse] = useState({
    instituteId: "",
    courseName: "",
    courseCode: "",
    description: "",
    duration: "",
    fees: ""
  });

  // ==================== Branch Form ====================
  const [branch, setBranch] = useState({
    instituteId: "",
    branchName: "",
    address: "",
    city: "",
    state: "",
    phone: ""
  });

  // ==================== Media Form ====================
  const [media, setMedia] = useState({
    instituteId: "",
    fileUrl: ""
  });

  // ==================== Fetch Institutes ====================
  const fetchInstitutes = async () => {
    try {
      const res = await axios.get("http://localhost:8088/api/institutes");
      setInstitutes(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch institutes");
    }
  };

  // ==================== Fetch Branches ====================
  const fetchBranches = async (instituteId) => {
    if (!instituteId) return;
    try {
      const res = await axios.get(
        `http://localhost:8088/api/institutes/${instituteId}/branches`
      );
      setBranchesList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ==================== Fetch Courses ====================
  const fetchCourses = async (instituteId) => {
    if (!instituteId) return;
    try {
      const res = await axios.get(
        `http://localhost:8088/api/institutes/${instituteId}/courses`
      );
      setCoursesList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ==================== Fetch Media ====================
  const fetchMedia = async (instituteId) => {
    if (!instituteId) return;
    try {
      const res = await axios.get(
        `http://localhost:8088/api/institutes/${instituteId}/media`
      );
      setMediaList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInstitutes();
  }, []);

  // ==================== Add Institute ====================
  const handleAddInstitute = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8088/api/institutes", newInstitute);
      alert("Institute added!");
      setNewInstitute({
        name: "", description: "", category: "", fees: "", facilities: "",
        benefits: "", accreditation: "", address: "", city: "", state: "",
        pincode: "", phone1: "", phone2: "", email: "", website: "",
        openTime: "", closeTime: "", imageUrl: ""
      });
      fetchInstitutes();
    } catch (err) {
      console.error(err);
      alert("Failed to add institute: " + (err.response?.data?.message || err.message));
    }
  };

  // ==================== Add Course ====================
  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (!course.instituteId) return alert("Select an institute");
    try {
      await axios.post(
        `http://localhost:8088/api/institutes/${course.instituteId}/courses`,
        course
      );
      alert("Course added!");
      setCourse({
        instituteId: "",
        courseName: "",
        courseCode: "",
        description: "",
        duration: "",
        fees: ""
      });
      fetchCourses(course.instituteId);
    } catch (err) {
      console.error(err);
      alert("Failed to add course: " + (err.response?.data?.message || err.message));
    }
  };

  // ==================== Add Branch ====================
  const handleAddBranch = async (e) => {
    e.preventDefault();
    if (!branch.instituteId) return alert("Select an institute");
    try {
      await axios.post(
        `http://localhost:8088/api/institutes/${branch.instituteId}/branches`,
        branch
      );
      alert("Branch added!");
      setBranch({
        instituteId: "",
        branchName: "",
        address: "",
        city: "",
        state: "",
        phone: ""
      });
      fetchBranches(branch.instituteId);
    } catch (err) {
      console.error(err);
      alert("Failed to add branch: " + (err.response?.data?.message || err.message));
    }
  };

  // ==================== Add Media URL ====================
  const handleAddMedia = async (e) => {
    e.preventDefault();
    if (!media.instituteId || !media.fileUrl) return alert("Select institute and enter media URL");
    try {
      await axios.post(
        `http://localhost:8088/api/institutes/${media.instituteId}/media`,
        null,
        { params: { url: media.fileUrl } }
      );
      alert("Media added!");
      setMedia({ instituteId: "", fileUrl: "" });
      fetchMedia(media.instituteId);
    } catch (err) {
      console.error(err);
      alert("Failed to add media: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="p-6 ml-64 space-y-6">
      <h2 className="text-3xl font-bold mb-6">Manage Institutes</h2>

      {/* ==================== Add Institute Form ==================== */}
      <div className="bg-white p-4 rounded shadow space-y-3">
        <h3 className="font-semibold mb-2">Add New Institute</h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-3" onSubmit={handleAddInstitute}>
          <input type="text" placeholder="Name" value={newInstitute.name}
            onChange={(e) => setNewInstitute({ ...newInstitute, name: e.target.value })} required className="border px-3 py-2 rounded" />
          <input type="text" placeholder="Category" value={newInstitute.category}
            onChange={(e) => setNewInstitute({ ...newInstitute, category: e.target.value })} className="border px-3 py-2 rounded" />
          <input type="text" placeholder="Fees" value={newInstitute.fees}
            onChange={(e) => setNewInstitute({ ...newInstitute, fees: e.target.value })} className="border px-3 py-2 rounded" />
          <input type="text" placeholder="Address" value={newInstitute.address}
            onChange={(e) => setNewInstitute({ ...newInstitute, address: e.target.value })} className="border px-3 py-2 rounded" />
          <input type="text" placeholder="City" value={newInstitute.city}
            onChange={(e) => setNewInstitute({ ...newInstitute, city: e.target.value })} className="border px-3 py-2 rounded" />
          <input type="text" placeholder="State" value={newInstitute.state}
            onChange={(e) => setNewInstitute({ ...newInstitute, state: e.target.value })} className="border px-3 py-2 rounded" />
          <input type="text" placeholder="Pincode" value={newInstitute.pincode}
            onChange={(e) => setNewInstitute({ ...newInstitute, pincode: e.target.value })} className="border px-3 py-2 rounded" />
          <input type="text" placeholder="Phone 1" value={newInstitute.phone1}
            onChange={(e) => setNewInstitute({ ...newInstitute, phone1: e.target.value })} className="border px-3 py-2 rounded" />
          <input type="text" placeholder="Phone 2" value={newInstitute.phone2}
            onChange={(e) => setNewInstitute({ ...newInstitute, phone2: e.target.value })} className="border px-3 py-2 rounded" />
          <input type="email" placeholder="Email" value={newInstitute.email}
            onChange={(e) => setNewInstitute({ ...newInstitute, email: e.target.value })} className="border px-3 py-2 rounded" />
          <input type="text" placeholder="Website" value={newInstitute.website}
            onChange={(e) => setNewInstitute({ ...newInstitute, website: e.target.value })} className="border px-3 py-2 rounded" />
          <input type="text" placeholder="Card Image URL" value={newInstitute.imageUrl}
            onChange={(e) => setNewInstitute({ ...newInstitute, imageUrl: e.target.value })} className="border px-3 py-2 rounded" />

          <div className="flex gap-3 md:col-span-2">
            <div className="flex flex-col flex-1">
              <label>Open Time</label>
              <input type="time" className="border px-3 py-2 rounded"
                value={newInstitute.openTime} onChange={(e) => setNewInstitute({ ...newInstitute, openTime: e.target.value })} required />
            </div>
            <div className="flex flex-col flex-1">
              <label>Close Time</label>
              <input type="time" className="border px-3 py-2 rounded"
                value={newInstitute.closeTime} onChange={(e) => setNewInstitute({ ...newInstitute, closeTime: e.target.value })} required />
            </div>
          </div>

          <textarea placeholder="Description" value={newInstitute.description}
            onChange={(e) => setNewInstitute({ ...newInstitute, description: e.target.value })} className="border px-3 py-2 rounded md:col-span-2" />
          <textarea placeholder="Facilities" value={newInstitute.facilities}
            onChange={(e) => setNewInstitute({ ...newInstitute, facilities: e.target.value })} className="border px-3 py-2 rounded md:col-span-2" />
          <textarea placeholder="Benefits" value={newInstitute.benefits}
            onChange={(e) => setNewInstitute({ ...newInstitute, benefits: e.target.value })} className="border px-3 py-2 rounded md:col-span-2" />
          <input type="text" placeholder="Accreditation" value={newInstitute.accreditation}
            onChange={(e) => setNewInstitute({ ...newInstitute, accreditation: e.target.value })} className="border px-3 py-2 rounded md:col-span-2" />

          <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded md:col-span-2">Add Institute</button>
        </form>
      </div>

      {/* ==================== Add Course Form ==================== */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Add Course</h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-3" onSubmit={handleAddCourse}>
          <select value={course.instituteId} onChange={(e) => setCourse({ ...course, instituteId: e.target.value })} required className="border px-3 py-2 rounded">
            <option value="">Select Institute</option>
            {institutes.map(inst => <option key={inst.id} value={inst.id}>{inst.name}</option>)}
          </select>
          <input type="text" placeholder="Course Name" value={course.courseName} onChange={(e) => setCourse({ ...course, courseName: e.target.value })} required className="border px-3 py-2 rounded" />
          <input type="text" placeholder="Course Code" value={course.courseCode} onChange={(e) => setCourse({ ...course, courseCode: e.target.value })} required className="border px-3 py-2 rounded" />
          <textarea placeholder="Description" value={course.description} onChange={(e) => setCourse({ ...course, description: e.target.value })} className="border px-3 py-2 rounded md:col-span-2" />
          <input type="text" placeholder="Duration" value={course.duration} onChange={(e) => setCourse({ ...course, duration: e.target.value })} className="border px-3 py-2 rounded" />
          <input type="number" placeholder="Fees" value={course.fees} onChange={(e) => setCourse({ ...course, fees: e.target.value })} className="border px-3 py-2 rounded" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded md:col-span-2">Add Course</button>
        </form>
      </div>

      {/* ==================== Add Branch Form ==================== */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Add Branch</h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-3" onSubmit={handleAddBranch}>
          <select value={branch.instituteId} onChange={(e) => setBranch({ ...branch, instituteId: e.target.value })} required className="border px-3 py-2 rounded">
            <option value="">Select Institute</option>
            {institutes.map(inst => <option key={inst.id} value={inst.id}>{inst.name}</option>)}
          </select>
          <input type="text" placeholder="Branch Name" value={branch.branchName} onChange={(e) => setBranch({ ...branch, branchName: e.target.value })} className="border px-3 py-2 rounded" required />
          <input type="text" placeholder="Address" value={branch.address} onChange={(e) => setBranch({ ...branch, address: e.target.value })} className="border px-3 py-2 rounded" required />
          <input type="text" placeholder="City" value={branch.city} onChange={(e) => setBranch({ ...branch, city: e.target.value })} className="border px-3 py-2 rounded" required />
          <input type="text" placeholder="State" value={branch.state} onChange={(e) => setBranch({ ...branch, state: e.target.value })} className="border px-3 py-2 rounded" required />
          <input type="text" placeholder="Phone" value={branch.phone} onChange={(e) => setBranch({ ...branch, phone: e.target.value })} className="border px-3 py-2 rounded" required />
          <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded md:col-span-2">Add Branch</button>
        </form>
      </div>

      {/* ==================== Add Media URL Form ==================== */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Add Media URL</h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-3" onSubmit={handleAddMedia}>
          <select value={media.instituteId} onChange={(e) => setMedia({ ...media, instituteId: e.target.value })} required className="border px-3 py-2 rounded">
            <option value="">Select Institute</option>
            {institutes.map(inst => <option key={inst.id} value={inst.id}>{inst.name}</option>)}
          </select>
          <input type="text" placeholder="Media URL" value={media.fileUrl} onChange={(e) => setMedia({ ...media, fileUrl: e.target.value })} required className="border px-3 py-2 rounded" />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded md:col-span-2">Add Media</button>
        </form>
      </div>

      {/* ==================== Institutes Table ==================== */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">All Institutes</h3>
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">City</th>
              <th className="p-2 border">Card Image URL</th>
            </tr>
          </thead>
          <tbody>
            {institutes.map(inst => (
              <tr key={inst.id}>
                <td className="p-2 border">{inst.id}</td>
                <td className="p-2 border">{inst.name}</td>
                <td className="p-2 border">{inst.category}</td>
                <td className="p-2 border">{inst.city}</td>
                <td className="p-2 border">{inst.imageUrl || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}