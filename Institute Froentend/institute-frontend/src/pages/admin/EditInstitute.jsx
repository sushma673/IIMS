import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Background image
const BG_IMAGE =
  "https://img.freepik.com/premium-photo/closeup-educational-items-that-create-warm-atmosphere-studying-working-school_1062399-12416.jpg";

export default function EditInstitute() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [institute, setInstitute] = useState({
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
    imageUrls: [],
    branches: []
  });

  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
  useEffect(() => {
    axios
      .get(`http://localhost:8090/api/institutes/${id}`)
      .then((res) => {
        const d = res.data;

        setInstitute({
          name: d.name || "",
          description: d.description || "",
          category: d.category || "",
          fees: d.fees ?? "",
          facilities: d.facilities || "",
          benefits: d.benefits || "",
          accreditation: d.accreditation || "",
          address: d.address || "",
          city: d.city || "",
          state: d.state || "",
          pincode: d.pincode || "",
          phone1: d.phone1 || "",
          phone2: d.phone2 || "",
          email: d.email || "",
          website: d.website || "",
          openTime: d.openTime ? d.openTime.substring(0, 5) : "",
          closeTime: d.closeTime ? d.closeTime.substring(0, 5) : "",
          imageUrls: d.images || [],
          branches: d.branches || []
        });
      })
      .catch(() => toast.error("Failed to load institute"))
      .finally(() => setLoading(false));
  }, [id]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInstitute({ ...institute, [name]: value });
  };

  /* ---------- IMAGES ---------- */
  const addImage = () => {
    setInstitute({
      ...institute,
      imageUrls: [...institute.imageUrls, ""]
    });
  };

  const handleImageChange = (index, value) => {
    const imgs = [...institute.imageUrls];
    imgs[index] = value;
    setInstitute({ ...institute, imageUrls: imgs });
  };

  const removeImage = (index) => {
    const imgs = institute.imageUrls.filter((_, i) => i !== index);
    setInstitute({ ...institute, imageUrls: imgs });
  };

  /* ---------- BRANCHES ---------- */
  const addBranch = () => {
    setInstitute({
      ...institute,
      branches: [
        ...institute.branches,
        { branchName: "", address: "", city: "", state: "", phone: "" }
      ]
    });
  };

  const handleBranchChange = (index, field, value) => {
    const branches = [...institute.branches];
    branches[index][field] = value;
    setInstitute({ ...institute, branches });
  };

  const removeBranch = (index) => {
    const branches = institute.branches.filter((_, i) => i !== index);
    setInstitute({ ...institute, branches });
  };

  /* ================= SAVE ================= */
  const handleSave = async (e) => {
    e.preventDefault();

    const payload = {
      ...institute,
      fees: institute.fees ? Number(institute.fees) : null,
      openTime: institute.openTime ? institute.openTime + ":00" : null,
      closeTime: institute.closeTime ? institute.closeTime + ":00" : null
    };

    try {
      await axios.put(`http://localhost:8090/api/institutes/${id}`, payload);
      toast.success("Institute updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update institute");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  /* ================= UI ================= */
  return (
    <div className="min-h-screen flex flex-col">

      {/* Background */}
      <div
        className="flex-1 flex items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: `url(${BG_IMAGE})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Card */}
        <div className="relative bg-white p-8 rounded-xl shadow-xl w-full max-w-6xl">

          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 mb-4"
          >
            ← Back
          </button>

          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Edit Institute
          </h2>

          <form
            onSubmit={handleSave}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >

            {/* BASIC */}
            <input name="name" value={institute.name}
              onChange={handleChange}
              placeholder="Name" className="border p-3 rounded" required />

            <input name="category" value={institute.category}
              onChange={handleChange}
              placeholder="Category" className="border p-3 rounded" />

            <input name="fees" value={institute.fees}
              onChange={handleChange}
              type="number"
              placeholder="Fees" className="border p-3 rounded" />

            <input name="city" value={institute.city}
              onChange={handleChange}
              placeholder="City" className="border p-3 rounded" />

            <input name="state" value={institute.state}
              onChange={handleChange}
              placeholder="State" className="border p-3 rounded" />

            <textarea name="description"
              value={institute.description}
              onChange={handleChange}
              placeholder="Description"
              className="border p-3 rounded md:col-span-2" />

            <input name="facilities" value={institute.facilities}
              onChange={handleChange}
              placeholder="Facilities" className="border p-3 rounded" />

            <input name="benefits" value={institute.benefits}
              onChange={handleChange}
              placeholder="Benefits" className="border p-3 rounded" />

            <input name="accreditation"
              value={institute.accreditation}
              onChange={handleChange}
              placeholder="Accreditation"
              className="border p-3 rounded" />

            <input name="address" value={institute.address}
              onChange={handleChange}
              placeholder="Address" className="border p-3 rounded" />

            <input name="pincode" value={institute.pincode}
              onChange={handleChange}
              placeholder="Pincode" className="border p-3 rounded" />

            <input name="phone1" value={institute.phone1}
              onChange={handleChange}
              placeholder="Phone 1" className="border p-3 rounded" />

            <input name="phone2" value={institute.phone2}
              onChange={handleChange}
              placeholder="Phone 2" className="border p-3 rounded" />

            <input name="email" value={institute.email}
              onChange={handleChange}
              placeholder="Email" className="border p-3 rounded" />

            <input name="website" value={institute.website}
              onChange={handleChange}
              placeholder="Website" className="border p-3 rounded" />

            <input type="time" name="openTime"
              value={institute.openTime}
              onChange={handleChange}
              className="border p-3 rounded" />

            <input type="time" name="closeTime"
              value={institute.closeTime}
              onChange={handleChange}
              className="border p-3 rounded" />

            {/* IMAGES */}
            <div className="md:col-span-2">
              <h3 className="font-semibold mb-2">Images</h3>

              {institute.imageUrls.map((img, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    value={img}
                    onChange={(e) =>
                      handleImageChange(i, e.target.value)
                    }
                    className="border p-2 flex-1 rounded"
                    placeholder="Image URL"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="bg-red-600 text-white px-3 rounded"
                  >
                    X
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addImage}
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                + Add Image
              </button>
            </div>

            {/* BRANCHES */}
            <div className="md:col-span-2">
              <h3 className="font-semibold mb-2">Branches</h3>

              {institute.branches.map((b, i) => (
                <div key={i} className="border p-4 mb-3 rounded">

                  <input placeholder="Branch Name"
                    value={b.branchName}
                    onChange={(e) =>
                      handleBranchChange(i, "branchName", e.target.value)
                    }
                    className="border p-2 w-full mb-2 rounded" />

                  <input placeholder="Address"
                    value={b.address}
                    onChange={(e) =>
                      handleBranchChange(i, "address", e.target.value)
                    }
                    className="border p-2 w-full mb-2 rounded" />

                  <input placeholder="City"
                    value={b.city}
                    onChange={(e) =>
                      handleBranchChange(i, "city", e.target.value)
                    }
                    className="border p-2 w-full mb-2 rounded" />

                  <input placeholder="State"
                    value={b.state}
                    onChange={(e) =>
                      handleBranchChange(i, "state", e.target.value)
                    }
                    className="border p-2 w-full mb-2 rounded" />

                  <input placeholder="Phone"
                    value={b.phone}
                    onChange={(e) =>
                      handleBranchChange(i, "phone", e.target.value)
                    }
                    className="border p-2 w-full mb-2 rounded" />

                  <button
                    type="button"
                    onClick={() => removeBranch(i)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Remove Branch
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addBranch}
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                + Add Branch
              </button>
            </div>

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded md:col-span-2"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>

      {/* Toast */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="dark"
      />
    </div>
  );
}
