import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editProfileThunk } from "../../store/session";
import { useModal } from "../../context/Modal";

const EditProfile = ({ sessionUser }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [profilePic, setProfilePic] = useState(sessionUser.profile_pic);
  const [name, setName] = useState(sessionUser.name);
  const [bio, setBio] = useState(sessionUser.bio);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      ...sessionUser,
      profile_pic: profilePic || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      name: name || "Set a profile name.",
      bio: bio || "No bio yet.",
    };

    const errors = {};
    if (name.length > 25) {
      errors.name = "Name can not have more than 25 characters";
    }
    if (bio.length > 50) {
      errors.name = "Bio can not have more than 50 characters";
    }
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      await dispatch(editProfileThunk(user));
      closeModal();
    }
  };

  return (
    <div className="log-in-modal">
      <h1>Edit your Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Profile Picture
            <input
              placeholder="Enter your profile picture here"
              value={profilePic}
              onChange={(e) => setProfilePic(e.target.value)}
            />
          </label>
          <label>
            Name
            <h4 className="formErrors">{errors?.name}</h4>
            <input
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Bio
            <h4 className="formErrors">{errors?.bio}</h4>
            <textarea
              placeholder="Enter your bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </label>
          <button
            className="createbutton-post"
            type="submit"
            // disabled={!!Object.values(errors).length}
          >
            Save
          </button>
          <button onClick={() => closeModal()}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditProfile;
