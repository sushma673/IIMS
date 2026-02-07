import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ========= LocalTime FIX ========= */
// Convert 08:00 → 08:00:00

// Background image for Manage Institutes
const BG_IMAGE =
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1920&auto=format&fit=crop";

export default function ManageInstitutes() {
  const [institutes, setInstitutes] = useState([]);
  const [courses, setCourses] = useState([]);

  /* ================= INSTITUTE ================= */
  const [newInstitute, setNewInstitute] = useState({
    name: "", description: "", category: "", fees: "",
    facilities: "", benefits: "", accreditation: "",
    address: "", city: "", state: "", pincode: "",
    phone1: "", phone2: "", email: "", website: "",
    openTime: "", closeTime: "", imageUrl: ""
  });

  /* ================= BRANCH ================= */
  const [branch, setBranch] = useState({
    instituteId: "", branchName: "", address: "", city: "", state: "", phone: ""
  });

  /* ================= COURSE ================= */
 const [course, setCourse] = useState({
  instituteId: "",courseName: "",courseCode: "",duration: "",fees: "",description: ""
});


  /* ================= SYLLABUS ================= */
  const [syllabus, setSyllabus] = useState({
    instituteId: "", courseId: "",
    topicName: "", description: "", duration: ""
  });

  /* ================= MEDIA ================= */
  const [media, setMedia] = useState({
    instituteId: "", url: ""
  });

  /* ================= FETCH INSTITUTES ================= */
  const fetchInstitutes = async () => {
    const res = await axios.get("http://localhost:8090/api/institutes");
    setInstitutes(res.data);
  };

  useEffect(() => {
    fetchInstitutes();
  }, []);

  /* ================= LOAD COURSES FOR SYLLABUS ================= */
  useEffect(() => {
    if (syllabus.instituteId) {
      axios
        .get(`http://localhost:8090/api/institutes/${syllabus.instituteId}/courses`)
        .then(res => {
          setCourses(res.data);
          setSyllabus(s => ({ ...s, courseId: "" }));
        });
    } else {
      setCourses([]);
    }
  }, [syllabus.instituteId]);

  /* ================= ADD INSTITUTE ================= */
  const handleAddInstitute = async (e) => {
    e.preventDefault();

    if (!newInstitute.openTime || !newInstitute.closeTime) {
    toast.error("Please select open and close time");
    return;
  }

  if (newInstitute.closeTime <= newInstitute.openTime) {
    toast.error("Close time must be after Open time");
    return;
  }

    await axios.post("http://localhost:8090/api/institutes", {
      ...newInstitute,
      fees: Number(newInstitute.fees),
   openTime: newInstitute.openTime + ":00",
closeTime: newInstitute.closeTime + ":00",


      imageUrls: [newInstitute.imageUrl],
      branches: []
    });

    toast.success("Institute added");
    fetchInstitutes();
  };

  /* ================= ADD BRANCH ================= */
  const handleAddBranch = async () => {
    await axios.put(
      `http://localhost:8090/api/institutes/${branch.instituteId}/branches`,
      [{
        branchName: branch.branchName,
        address: branch.address,
        city: branch.city,
        state: branch.state,
        phone: branch.phone
      }]
    );

    toast.success("Branch added");
    fetchInstitutes();
  };

  /* ================= ADD COURSE ================= */
  const handleAddCourse = async () => {
  await axios.post(
    `http://localhost:8090/api/institutes/${course.instituteId}/courses`,
    {
      courseName: course.courseName,
      courseCode: course.courseCode,
      duration: course.duration,
      fees: Number(course.fees),
      description: course.description
    }
  );

  toast.success("Course added");
  fetchInstitutes();
};


  /* ================= ADD SYLLABUS ================= */
  const handleAddSyllabus = async () => {
    await axios.post(
      `http://localhost:8090/api/institutes/${syllabus.instituteId}/courses/${syllabus.courseId}/syllabus`,
      {
        topicName: syllabus.topicName,
        description: syllabus.description,
        duration: syllabus.duration
      }
    );

    toast.success("Syllabus added");
    fetchInstitutes();
  };

  /* ================= ADD MEDIA ================= */
  const handleAddMedia = async () => {
    await axios.post(
      `http://localhost:8090/api/institutes/${media.instituteId}/media`,
      null,
      { params: { url: media.url } }
    );

    toast.success("Media added");
    fetchInstitutes();
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative p-6"
      style={{ backgroundImage: `url(${BG_IMAGE})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65"></div>

      {/* Page Content */}
      <div className="relative space-y-6">
        <ToastContainer />

        <h1 className="text-3xl font-bold text-white">
          Manage Institutes
        </h1>

        {/* ================= ADD INSTITUTE ================= */}
        <form
          onSubmit={handleAddInstitute}
          className="grid grid-cols-2 gap-2 bg-white p-4 rounded"
        >
          {Object.keys(newInstitute).map(k => (
            <input
              key={k}
              type={k.includes("Time") ? "time" : k === "fees" ? "number" : "text"}
              placeholder={k}
              value={newInstitute[k]}
              onChange={e =>
                setNewInstitute({ ...newInstitute, [k]: e.target.value })
              }
              className="border p-2"
              required
            />
          ))}

          <button className="col-span-2 bg-orange-600 text-white p-2">
            Add Institute
          </button>
        </form>

        {/* ================= ADD BRANCH ================= */}
        <Section title="Add Branch">
          <InstituteSelect
            institutes={institutes}
            onChange={(id) =>
              setBranch({ ...branch, instituteId: id })
            }
          />
          {["branchName", "address", "city", "state", "phone"].map(f => (
            <Input
              key={f}
              placeholder={f}
              onChange={e =>
                setBranch({ ...branch, [f]: e.target.value })
              }
            />
          ))}
          <Button onClick={handleAddBranch} text="Add Branch" color="blue" />
        </Section>

        {/* ================= ADD COURSE ================= */}
        <Section title="Add Course">
          <InstituteSelect
            institutes={institutes}
            onChange={(id) =>
              setCourse({ ...course, instituteId: id })
            }
          />
          {["courseName", "courseCode", "duration", "fees", "description"].map(f => (
            <Input
              key={f}
              placeholder={f}
              onChange={e =>
                setCourse({ ...course, [f]: e.target.value })
              }
            />
          ))}
          <Button onClick={handleAddCourse} text="Add Course" color="green" />
        </Section>

        {/* ================= ADD SYLLABUS ================= */}
        <Section title="Add Syllabus">
          <InstituteSelect
            institutes={institutes}
            onChange={(id) =>
              setSyllabus({ ...syllabus, instituteId: id })
            }
          />

          <select
            className="border p-2 w-full mt-2"
            value={syllabus.courseId}
            onChange={e =>
              setSyllabus({ ...syllabus, courseId: e.target.value })
            }
          >
            <option value="">Select Course</option>
            {courses.map(c => (
              <option key={c.id} value={c.id}>
                {c.courseName}
              </option>
            ))}
          </select>

          {["topicName", "description", "duration"].map(f => (
            <Input
              key={f}
              placeholder={f}
              onChange={e =>
                setSyllabus({ ...syllabus, [f]: e.target.value })
              }
            />
          ))}
          <Button onClick={handleAddSyllabus} text="Add Syllabus" color="purple" />
        </Section>

        {/* ================= ADD MEDIA ================= */}
        <Section title="Add Media">
          <InstituteSelect
            institutes={institutes}
            onChange={(id) =>
              setMedia({ ...media, instituteId: id })
            }
          />
          <Input
            placeholder="Media URL"
            onChange={e =>
              setMedia({ ...media, url: e.target.value })
            }
          />
          <Button onClick={handleAddMedia} text="Add Media" color="red" />
        </Section>
      </div>
    </div>
  );
}

/* ================= UI HELPERS ================= */

const Section = ({ title, children }) => (
  <div className="bg-white p-4 rounded shadow">
    <h3 className="font-semibold mb-2">{title}</h3>
    {children}
  </div>
);

const InstituteSelect = ({ institutes, onChange }) => (
  <select className="border p-2 w-full"
    onChange={e => onChange(e.target.value)}>
    <option value="">Select Institute</option>
    {institutes.map(i => (
      <option key={i.id} value={i.id}>
        {i.name}
      </option>
    ))}
  </select>
);

const Input = (props) => (
  <input {...props} className="border p-2 w-full mt-2" />
);

const Button = ({ onClick, text, color }) => {
  const colors = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    purple: "bg-purple-600",
    red: "bg-red-600"
  };

  return (
    <button
      onClick={onClick}
      className={`${colors[color]} text-white p-2 mt-2`}
    >
      {text}
    </button>
  );
};