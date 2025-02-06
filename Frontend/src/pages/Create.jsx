import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Create = () => {
  const { id } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [profilePreview, setProfilePreview] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/api/${id}`).then((res) => {
        setEditing(true);
        setValue("name", res.data.name);
        setValue("phone", res.data.phone);
        setValue("email", res.data.email);
        setValue("gender", res.data.gender);
        setValue("language", res.data.language);
        setValue("profilePicture", res.data.profilePicture);
        setProfilePreview(res.data.profilePicture);
      });
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    if (editing) {
      await axios.put(`http://localhost:5000/users/${id}`, data);
    } else {
      await axios.post("http://localhost:5000/users", data);
    }
    navigate("/");
  };

  // // Handle Profile Picture Upload
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setProfilePreview(reader.result);
  //       setValue("profilePicture", reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleFileChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    // Optional: Check file size (e.g., limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("File size exceeds 2MB. Please upload a smaller image.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1]; // Remove 'data:image/*;base64,' prefix
      setProfilePreview(`data:image/jpeg;base64,${base64String}`);
      setValue("profilePicture", `data:image/jpeg;base64,${base64String}`);
    };
    reader.readAsDataURL(file);
  }
};


  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {editing ? "Edit User" : "Add User"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          {...register("name")}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          {...register("phone")}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full p-2 border rounded"
          required
        />

        {/* Gender Selection */}
        <div className="flex space-x-4">
          <label>
            <input type="radio" {...register("gender")} value="male" /> Male
          </label>
          <label>
            <input type="radio" {...register("gender")} value="female" /> Female
          </label>
          <label>
            <input type="radio" {...register("gender")} value="other" /> Other
          </label>
        </div>

        {/* Language Dropdown */}
        <select {...register("language")} className="w-full p-2 border rounded">
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Spanish">Spanish</option>
        </select>

        {/* Profile Picture Upload */}
        <div>
          {profilePreview && (
            <img
              src={profilePreview}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full mb-2 border"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {editing ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Create;