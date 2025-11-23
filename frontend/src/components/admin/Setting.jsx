import React, { useState } from "react";
import { Bell, Shield, User, Palette, X } from "lucide-react";
import { useUser } from "../../context/userontext.jsx";

const Setting = () => {
  const { user, updateProfile, changePassword } = useUser();
  const [activeModal, setActiveModal] = useState(null);

  // Form states
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const settingsOptions = [
    {
      name: "Profile Settings",
      description: "Update your name, email, and personal details.",
      icon: <User className="text-pink-600" />,
      key: "profile",
    },
    {
      name: "Security",
      description: "Manage your password and two-factor authentication.",
      icon: <Shield className="text-pink-600" />,
      key: "security",
    },
    {
      name: "Notifications",
      description: "Configure how you receive alerts and updates.",
      icon: <Bell className="text-pink-600" />,
      key: "notifications",
    },
    {
      name: "Appearance",
      description: "Customize the dashboard theme and color preferences.",
      icon: <Palette className="text-pink-600" />,
      key: "appearance",
    },
  ];

  const closeModal = () => setActiveModal(null);

  // Handle profile form submission
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(profileForm);
    closeModal();
  };

  // Handle password form submission
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    await changePassword(passwordForm);
    setPasswordForm({ currentPassword: "", newPassword: "" });
    closeModal();
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case "profile":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-red-500 mb-2">
              Profile Settings
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Update your name and email.
            </p>
            <form className="space-y-4" onSubmit={handleProfileSubmit}>
              <div>
                <label className="block text-sm mb-1 text-gray-600">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, name: e.target.value })
                  }
                  className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, email: e.target.value })
                  }
                  className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-linear-to-r from-pink-300 to-red-500 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-red-600 text-sm shadow-md"
              >
                Save Changes
              </button>
            </form>
          </div>
        );

      case "security":
        return (
          <div>
            <h3 className="text-xl font-semibold text-red-500 mb-2">
              Security Settings
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Change your password.
            </p>
            <form className="space-y-4" onSubmit={handlePasswordSubmit}>
              <div>
                <label className="block text-sm mb-1 text-gray-600">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      currentPassword: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-600">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-linear-to-r from-pink-300 to-red-300 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-red-600 text-sm shadow-md"
              >
                Update Password
              </button>
            </form>
          </div>
        );

      case "notifications":
        return (
          <div>
            <h3 className="text-xl font-semibold text-red-500 mb-2">
              Notification Settings
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Manage your email and push notification preferences.
            </p>
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-gray-700">
                <input type="checkbox" className="accent-pink-500" defaultChecked />{" "}
                Email Notifications
              </label>
              <label className="flex items-center gap-2 text-gray-700">
                <input type="checkbox" className="accent-pink-500" /> Push
                Notifications
              </label>
              <button className="bg-linear-to-r from-pink-300 to-red-500 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-red-600 text-sm shadow-md">
                Save Preferences
              </button>
            </div>
          </div>
        );

      case "appearance":
        return (
          <div>
            <h3 className="text-xl font-semibold text-red-500 mb-2">
              Appearance Settings
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Choose between light and dark themes.
            </p>
            <div className="flex gap-4">
              <button className="border border-pink-400 text-pink-500 px-4 py-2 rounded-lg hover:bg-pink-50 text-sm transition-all">
                Light Mode
              </button>
              <button className="border border-red-400 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 text-sm transition-all">
                Dark Mode
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-pink-100 relative">
      <h2 className="text-3xl font-bold mb-4 bg-linear-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
        Settings
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Manage your account preferences and system configurations.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {settingsOptions.map((option, index) => (
          <div
            key={index}
            onClick={() => setActiveModal(option.key)}
            className="p-5 border border-pink-100 rounded-xl hover:shadow-md hover:border-pink-300 transition-all duration-300 cursor-pointer bg-linear-to-br from-white to-pink-50 hover:from-pink-50 hover:to-white"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-pink-100 p-2 rounded-lg">{option.icon}</div>
              <h3 className="text-lg font-medium text-gray-800">{option.name}</h3>
            </div>
            <p className="text-sm text-gray-500">{option.description}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white/95 border border-pink-100 w-full max-w-md rounded-2xl p-6 shadow-xl relative animate-slideUp">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
            >
              <X size={22} />
            </button>
            {renderModalContent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Setting;
