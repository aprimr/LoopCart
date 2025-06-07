"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Trash2,
  Pencil,
  X,
  Calendar,
  Check,
  AlertCircle,
  UserCheck,
  Shield,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import axios from "../../services/axios";
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
      setFilteredUsers(
        users.filter((user) => user.email.toLowerCase().includes(search))
      );
    } else {
      setFilteredUsers(users);
    }
  }, [search, users]);

  // pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentUsers = filteredUsers.slice(firstPostIndex, lastPostIndex);
  const totalPages = Math.ceil(filteredUsers.length / postsPerPage);

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

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/admin/users");
      setUsers(res.data);
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to fetch users");
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/admin/user/${id}`);
      if (response.status === 200) {
        setUsers(users.filter((user) => user._id !== id));
        toast.success("User deleted successfully");
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
        return "bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-900/50 dark:text-blue-200 dark:border-blue-800";
      case "user":
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
    }
  };

  const roleIcon = (role) => {
    switch (role) {
      case "admin":
        return <Shield className="w-3 h-3" />;
      case "user":
      default:
        return <User className="w-3 h-3" />;
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white">
      <div
        className={`p-3 sm:p-4 md:p-6 w-full max-w-full mx-auto space-y-4 sm:space-y-6 ${
          isEditModalOpen ? "blur-sm" : ""
        }`}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4">
          {/* Header */}
          <div className="mb-2 md:mb-4">
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-4">
                <div>
                  <h1 className="text-4xl font-semibold font-poppins text-gray-900 dark:text-white">
                    User Management
                  </h1>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value.toLowerCase());
              }}
              placeholder="Search user by Email"
              className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {isLoading ? (
          <UsersSkeleton />
        ) : (
          <>
            {/* Desktop Table View - With horizontal scroll */}
            <div className="hidden md:block overflow-scroll rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
              <div className="w-full overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                        Profile
                      </th>
                      <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                        Full Name
                      </th>
                      <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                        Email
                      </th>
                      <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                        Role
                      </th>
                      <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                        Verified
                      </th>
                      <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                        Status
                      </th>
                      <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                        Joined
                      </th>
                      <th className="px-4 py-3.5 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                    {currentUsers.map((user) => (
                      <tr
                        key={user._id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                            <img
                              src={
                                user.profilePic ||
                                "/placeholder.svg?height=40&width=40"
                              }
                              alt={user.fullName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.fullName}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {user.email}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium capitalize whitespace-nowrap">
                            <span
                              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${roleColor(
                                user.role
                              )}`}
                            >
                              {roleIcon(user.role)}
                              {user.role}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                              user.isVerified
                                ? "bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/50 dark:text-green-200 dark:border-green-800"
                                : "bg-yellow-100 text-yellow-800 border border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-200 dark:border-yellow-800"
                            }`}
                          >
                            {user.isVerified ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <AlertCircle className="w-3 h-3" />
                            )}
                            {user.isVerified ? "Verified" : "Unverified"}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                              user.isActive
                                ? "bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/50 dark:text-green-200 dark:border-green-800"
                                : "bg-red-100 text-red-800 border border-red-200 dark:bg-red-900/50 dark:text-red-200 dark:border-red-800"
                            }`}
                          >
                            {user.isActive ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <X className="w-3 h-3" />
                            )}
                            {user.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(user.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleUpdate(user)}
                              className="p-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                              aria-label={`Edit ${user.fullName}`}
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(user._id)}
                              className="p-1.5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
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
            </div>

            {/* Mobile Card View - Optimized for small screens */}
            <div className="md:hidden space-y-3 w-full">
              {currentUsers.map((user) => (
                <div
                  key={user._id}
                  className="p-3 sm:p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm w-full"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                      <img
                        src={
                          user.profilePic ||
                          "/placeholder.svg?height=48&width=48"
                        }
                        alt={user.fullName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white truncate">
                        {user.fullName}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                    <span
                      className={`flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-xs font-medium ${roleColor(
                        user.role
                      )}`}
                    >
                      {roleIcon(user.role)}
                      {user.role}
                    </span>

                    {/* Separated Verified and Active status */}
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-xs font-medium ${
                        user.isVerified
                          ? "bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/50 dark:text-green-200 dark:border-green-800"
                          : "bg-yellow-100 text-yellow-800 border border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-200 dark:border-yellow-800"
                      }`}
                    >
                      {user.isVerified ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <AlertCircle className="w-3 h-3" />
                      )}
                      {user.isVerified ? "Verified" : "Unverified"}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-xs font-medium ${
                        user.isActive
                          ? "bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/50 dark:text-green-200 dark:border-green-800"
                          : "bg-red-100 text-red-800 border border-red-200 dark:bg-red-900/50 dark:text-red-200 dark:border-red-800"
                      }`}
                    >
                      {user.isActive ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <X className="w-3 h-3" />
                      )}
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="mt-3 flex justify-between items-center">
                    <div className="inline-flex items-center gap-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(user)}
                        className="p-1 sm:p-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                        aria-label={`Edit ${user.fullName}`}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="p-1 sm:p-1.5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
                        aria-label={`Delete ${user.fullName}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination - Responsive */}
            {filteredUsers.length > 0 ? (
              filteredUsers.length > postsPerPage && (
                <div className="flex justify-center mt-4 sm:mt-6">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className={`p-1 sm:p-2 rounded-lg ${
                        currentPage === 1
                          ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg text-xs sm:text-sm font-medium ${
                            currentPage === page
                              ? "bg-blue-600 text-white"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className={`p-1 sm:p-2 rounded-lg ${
                        currentPage === totalPages
                          ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              )
            ) : (
              <div className="text-center py-16">
                <div className="relative inline-flex mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 blur-xl animate-pulse" />
                  <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 shadow-md">
                    <AlertCircle className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>

                <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3 font-">
                  No Users found
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 font-poppins">
                  Try adjusting your search.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Edit Modal - Responsive */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4">
          <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                Update User
              </h2>
              <button
                onClick={closeModal}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit}>
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 max-h-[60vh] overflow-y-auto">
                {/* User Profile */}
                {formData.profilePic && (
                  <div className="flex justify-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden border-4 border-white dark:border-gray-800 shadow-md">
                      <img
                        src={formData.profilePic || "/placeholder.svg"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Read-only Fields */}
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      User ID
                    </label>
                    <input
                      type="text"
                      disabled
                      value={formData._id}
                      className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-500 dark:text-gray-400 cursor-not-allowed text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      disabled
                      value={formData.fullName}
                      className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-500 dark:text-gray-400 cursor-not-allowed text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      disabled
                      value={formData.email}
                      className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-500 dark:text-gray-400 cursor-not-allowed text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Role
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  <div className="flex flex-col space-y-3">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                      Status
                    </label>
                    <div className="flex flex-col gap-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            name="isVerified"
                            checked={formData.isVerified}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div
                            className={`w-8 sm:w-10 h-4 sm:h-5 rounded-full ${
                              formData.isVerified
                                ? "bg-green-500 dark:bg-green-600"
                                : "bg-gray-300 dark:bg-gray-600"
                            } transition-colors`}
                          ></div>
                          <div
                            className={`absolute left-0.5 top-0.5 bg-white w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-transform ${
                              formData.isVerified
                                ? "translate-x-4 sm:translate-x-5"
                                : ""
                            }`}
                          ></div>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                          Verified
                        </span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div
                            className={`w-8 sm:w-10 h-4 sm:h-5 rounded-full ${
                              formData.isActive
                                ? "bg-green-500 dark:bg-green-600"
                                : "bg-gray-300 dark:bg-gray-600"
                            } transition-colors`}
                          ></div>
                          <div
                            className={`absolute left-0.5 top-0.5 bg-white w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-transform ${
                              formData.isActive
                                ? "translate-x-4 sm:translate-x-5"
                                : ""
                            }`}
                          ></div>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                          Active
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-800 flex justify-end gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-xs sm:text-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(formData._id)}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xs sm:text-sm"
                >
                  Delete
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersManagement;
