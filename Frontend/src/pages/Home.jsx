import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        setUsers(res.data);
        // setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching users", error);
        // setLoading(false); // Set loading to false even if error occurs
      });
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/users/${id}`);
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <Link to="/create" className="bg-blue-500 text-white px-4 py-2 rounded">
        ➕ Add User
      </Link>
      <table className="w-full mt-4 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Gender</th>
            <th className="border p-2">Language</th>
            <th className="border p-2">PROFILE</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.phone}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.gender}</td>
              <td className="p-2">{user.language}</td>
              <td className="p-2">
                <img
                  src={user.profilePicture} // Directly use Base64 string
                  alt="Profile"
                  className="w-12 h-12 rounded-full border"
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/50")
                  } // Fallback Image
                />
              </td>

              <td className="p-2">
                <Link
                  to={`/create/${user.id}`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                  ✏️ Edit
                </Link>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
