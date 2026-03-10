import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {

  const { loading, handleRegister } = useAuth();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("gender", gender);

    if (profileImage) {
        formData.append("profileImage", profileImage);
    }

    await handleRegister(formData);
    navigate('/');
  }

  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    )
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>

        <form onSubmit={handleFormSubmit} encType="multipart/form-data">

          {/*  Profile Image Upload */}
          <div className="image-upload">
            <label htmlFor="profileUpload">
              <div className="image-preview">
                {preview ? (
                  <img src={preview} alt="Preview" />
                ) : (
                  <span>Upload Profile</span>
                )}
              </div>
            </label>

            <input
              type="file"
              id="profileUpload"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </div>

          <input
            type="text"
            placeholder="Enter full name"
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <select
            defaultValue=""
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="" disabled>Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Not prefer to say">Not prefer to say</option>
          </select>

          <button className='primary-button' type='submit'>
            Register
          </button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  )
}

export default Register