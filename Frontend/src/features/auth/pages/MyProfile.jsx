import React from "react";
import { useAuth } from "../hooks/useAuth";
import "../style/profile.scss";

const MyProfile = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  if (!user) {
    return (
      <main>
        <h1>User not found</h1>
      </main>
    );
  }

  return (
    <main>
      <div className="profile-container">

        <div className="profile-header">
          <div className="profile-image">
            {user.profileImage ? (
              <img src={user.profileImage} alt="profile" />
            ) : (
              <span>No Image</span>
            )}
          </div>

          <h2>@{user.username}</h2>
        </div>

        <div className="profile-info">
          <div className="info-item">
            <label>Email</label>
            <p>{user.email}</p>
          </div>

          <div className="info-item">
            <label>Bio</label>
            <p>{user.bio || "No bio added yet."}</p>
          </div>
        </div>

        <button className="button primary-button">
          Edit Profile
        </button>

      </div>
    </main>
  );
};

export default MyProfile;