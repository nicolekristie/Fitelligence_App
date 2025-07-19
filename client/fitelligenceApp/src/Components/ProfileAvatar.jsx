import React, { useState } from "react";

function ProfileAvatar({ avatarUrl, token, onUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [hasUploaded, setHasUploaded] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("avatar", selectedFile);
    try {
      const res = await fetch("/api/profile/avatar", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.avatar_url) {
        if (onUpload) onUpload();
        setHasUploaded(true);
        setSelectedFile(null); // Clear file selection after upload
        alert("Avatar uploaded!");
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (err) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Always use backend URL for avatar if present
  let imgSrc = "/default-avatar.png";
  if (avatarUrl) {
    if (avatarUrl.startsWith("/uploads/")) {
      imgSrc = `http://localhost:3001${avatarUrl}`;
    } else if (avatarUrl.startsWith("http")) {
      imgSrc = avatarUrl;
    } else {
      imgSrc = avatarUrl;
    }
  }

  return (
    <div style={{ textAlign: "center", marginBottom: 24 }}>
      <img
        src={imgSrc}
        alt="Profile"
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          objectFit: "cover",
          border: "2px solid #eee",
        }}
      />
      <div style={{ marginTop: 8 }}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button
          onClick={handleUpload}
          disabled={uploading || !selectedFile}
          style={{ marginLeft: 8 }}
        >
          {uploading ? "Uploading..." : hasUploaded ? "Change Photo" : "Upload"}
        </button>
      </div>
    </div>
  );
}

export default ProfileAvatar;
