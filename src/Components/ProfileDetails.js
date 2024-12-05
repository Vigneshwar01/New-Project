// src/Components/ProfileDetails.js
import React from 'react';

const ProfileDetails = ({ user }) => {
  return (
    <div>
      <h2>Profile Details</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      {/* Add any other profile details you'd like to display */}
    </div>
  );
};

export default ProfileDetails;
