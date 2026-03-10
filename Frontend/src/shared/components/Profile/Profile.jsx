import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./profile.scss";

const Profile = () => {

  const { username } = useParams();

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(
          `http://localhost:5000/api/profile/${username}`,
          { credentials: "include" }
        );

        const data = await res.json();
        setProfile(data.user);
        setPosts(data.posts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [username]);

  if (loading) return <h1>Loading...</h1>;

  if (!profile) return <h1>User not found</h1>;

  return (
    <main className="profile-page">
      <div className="profile-card">
        <img
          src={profile.profileImage}
          alt="profile"
          className="profile-img"
        />
        <h2>{profile.username}</h2>
        <p>{profile.bio}</p>
      </div>

      <div className="posts-grid">
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="post-card">
              <img src={post.imgUrl} alt="post" />
              <div className="post-info">
                <p>{post.caption}</p>
                <span>❤️ {post.likesCount}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default Profile;