import { useState } from "react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Trash2, Pencil, X, Calendar, Search } from "lucide-react";
import axios from "../../services/axios";
import Pagination from "../../components/Pagination";
import UsersSkeleton from "../../components/Skeletons/UsersSkeleton";

function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (search) {
      setFilteredUsers(users.filter((user) => user.email.includes(search)));
    } else {
      setFilteredUsers(users);
    }
  }, [search, users]);

  // pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentUsers = filteredUsers.slice(firstPostIndex, lastPostIndex);

  const [formData, setFormData] = useState({
    _id: "",
    profilePic: "",
    fullName: "",
    email: "",
    role: "user",
    isVerified: false,
    isActive: false,
    createdAt: "",
  });

  useEffect(() => {
    setIsLoading(true);
    try {
      axios.get("/admin/users").then((res) => {
        setUsers(res.data);
        setIsLoading(false);
      });
    } catch (error) {
      toast.error("Failed to fetch users");
      setIsLoading(false);
    }
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/admin/user/${id}`);
      if (response.status === 200) {
        setUsers(users.filter((user) => user._id !== id));
        toast.success(`User deleted successfully`);
      }
      setIsEditModalOpen(false);
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const handleUpdate = (user) => {
    setEditingUser(user);
    setFormData({
      _id: user._id,
      profilePic: user.profilePic,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      isActive: user.isActive,
      createdAt: user.createdAt,
    });
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setEditingUser(null);
  };

  const roleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "user":
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!editingUser) return;

    console.log(
      `Form data is:  ${JSON.stringify(formData.role)} ${JSON.stringify(
        formData.isActive
      )} ${JSON.stringify(formData.isVerified)}`
    );

    try {
      const response = await axios.put(
        `/admin/user/${editingUser._id}`,
        formData
      );
      if (response.status === 200) {
        toast.success("User updated successfully");

        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u._id === editingUser._id ? { ...u, ...formData } : u
          )
        );
      }
    } catch (error) {
      toast.error("Failed to update user");
    }

    closeModal();
  };

  if (isLoading) {
    return <UsersSkeleton />;
  }

  return (
    <>
      <div
        className={`p-4 sm:p-6 w-full max-w-full mx-auto space-y-6 ${
          isEditModalOpen ? "blur-sm" : ""
        }`}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-4xl font-roboto font-bold text-gray-800 dark:text-white">
            User Management
          </h1>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <div className="absolute left-1 top-1/2 -translate-y-1/2  p-[6px] rounded-full ">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value.toLowerCase());
              }}
              placeholder="Search user by Email"
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 p-[6px] rounded-full hover:text-blue-600 dark:hover:text-blue-400"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Desktop Table View */}
        <div
          className="hidden md:flex max-w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700"
          style={{ width: "calc(100vw - 9rem)" }}
        >
          <table className="min-w-[900px] w-full table-auto bg-white dark:bg-gray-900 text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">
                  Profile
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase max-w-[150px] truncate">
                  Full Name
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase max-w-[200px] truncate">
                  Email
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">
                  Role
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">
                  Verified
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">
                  Status
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap flex items-center space-x-1">
                  Joined
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentUsers.map((user, idx) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-3 py-2 whitespace-nowrap">
                    <img
                      src={user.profilePic}
                      alt={user.fullName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap max-w-[150px] truncate text-gray-900 dark:text-white font-medium text-sm">
                    {user.fullName}
                  </td>
                  <td className="px-3 py-2 text-gray-500 dark:text-gray-400 max-w-[200px] truncate break-words text-sm">
                    {user.email}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm">
                    <span
                      className={`inline-block px-2 py-1 rounded-md font-semibold capitalize ${roleColor(
                        user.role
                      )}`}
                      title={user.role}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm">
                    <span
                      className={`inline-block px-2 py-1 rounded-md font-semibold ${
                        user.isVerified
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}
                      title={user.isVerified ? "Verified" : "Not Verified"}
                    >
                      {user.isVerified ? "Verified" : "Not Verified"}
                    </span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm">
                    <span
                      className={`inline-block px-2 py-1 rounded-md font-semibold ${
                        user.isActive
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                      title={user.isActive ? "Active" : "Inactive"}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-gray-500 dark:text-gray-400 text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUpdate(user)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        aria-label={`Edit ${user.fullName}`}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        aria-label={`Delete ${user.fullName}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {currentUsers.map((user, idx) => (
            <div
              key={user._id}
              className="p-3 bg-white dark:bg-gray-900 rounded-lg shadow"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={user.profilePic}
                  alt={user.fullName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-800 dark:text-white truncate">
                    {user.fullName}
                  </h3>
                  <p className="text-xs font-poppins text-gray-500 dark:text-gray-400 break-all truncate">
                    {user.email}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1 text-xs text-gray-700 dark:text-gray-300">
                <span
                  className={`inline-block px-2 py-0.5 rounded-md font-semibold capitalize ${roleColor(
                    user.role
                  )}`}
                  title={user.role}
                >
                  {user.role}
                </span>
                <span
                  className={`inline-block px-2 py-0.5 rounded-md font-semibold ${
                    user.isVerified
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                  }`}
                  title={user.isVerified ? "Verified" : "Not Verified"}
                >
                  {user.isVerified ? "Verified" : "Not Verified"}
                </span>
                <span
                  className={`inline-block px-2 py-0.5 rounded-md font-semibold ${
                    user.isActive
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }`}
                  title={user.isActive ? "Active" : "Inactive"}
                >
                  {user.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="mt-2 flex justify-between items-end space-x-1 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="mt-2 flex gap-3">
                  <button
                    onClick={() => handleUpdate(user)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    aria-label={`Edit ${user.fullName}`}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    onClick={() => handleDelete(user._id)}
                    aria-label={`Delete ${user.fullName}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers.length > 0 ? (
          filteredUsers.length > postsPerPage && (
            <div className=" mt-4 flex justify-center">
              <Pagination
                currentPage={currentPage}
                postsPerPage={postsPerPage}
                totalPosts={users.length}
                onPageChange={setCurrentPage}
              />
            </div>
          )
        ) : (
          <p className="mt-4 w-full flex justify-center text-sm text-gray-600 dark:text-gray-400">
            No users found.
          </p>
        )}
      </div>

      {/* Update / Delete User Popup */}
      {isEditModalOpen && (
        <div
          className="fixed inset-0 z-50  flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="editUserTitle"
        >
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-gray-900 relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              aria-label="Close edit modal"
            >
              <X size={22} />
            </button>

            {/* Modal Title */}
            <h2
              id="editUserTitle"
              className="text-xl font-semibold text-gray-900 dark:text-white mb-5 font-poppins"
            >
              Update User
            </h2>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {formData.profilePic && (
                <img
                  src={formData.profilePic}
                  alt="profile"
                  className="w-24 h-24 rounded-full border-2 border-gray-300 dark:border-gray-600 object-cover mx-auto mb-4"
                />
              )}

              {/* Read-only Fields */}
              {[
                { id: "_id", label: "User ID", type: "text" },
                { id: "fullName", label: "Full Name", type: "text" },
                { id: "email", label: "Email", type: "email" },
              ].map(({ id, label, type }) => (
                <div key={id}>
                  <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 "
                  >
                    {label}
                  </label>
                  <input
                    id={id}
                    name={id}
                    type={type}
                    disabled
                    value={formData[id]}
                    className="w-full rounded-md bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 px-3 py-2 text-gray-600 dark:text-gray-400 font-poppins cursor-not-allowed"
                  />
                </div>
              ))}

              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full font-poppins bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Custom Checkboxes */}
              <div className="flex items-center gap-6 pt-1">
                {[
                  { name: "isVerified", label: "Verified" },
                  { name: "isActive", label: "Active" },
                ].map(({ name, label }) => (
                  <label
                    key={name}
                    className="flex items-center gap-2 cursor-pointer "
                  >
                    <input
                      type="checkbox"
                      name={name}
                      checked={formData[name]}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded-full focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300 font-poppins">
                      {label}
                    </span>
                  </label>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(formData._id)}
                  className="px-4 py-2 rounded-md bg-rose-600 text-white hover:bg-rose-700"
                >
                  Delete
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default UsersManagement;
