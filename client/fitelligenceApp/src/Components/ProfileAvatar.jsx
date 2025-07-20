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
        setHasUploaded(true);
        setSelectedFile(null); // Clear file selection after upload
        alert("Avatar uploaded!");
        // Call onUpload after state updates, so parent can fetch new avatar
        if (onUpload) setTimeout(onUpload, 0);
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
      // Add cache-busting query string to force reload after upload
      imgSrc = `${window.location.origin}${avatarUrl}?t=${Date.now()}`;
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
      <div
        style={{
          marginTop: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <label
          htmlFor="avatar-upload"
          style={{
            background: "linear-gradient(90deg, #ff8a00, #e52e71)",
            color: "#fff",
            padding: "8px 18px",
            borderRadius: "20px",
            cursor: "pointer",
            fontWeight: 600,
            marginRight: 12,
            boxShadow: "0 2px 8px rgba(229,46,113,0.15)",
          }}
        >
          Choose File
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </label>
        <button
          onClick={handleUpload}
          disabled={uploading || !selectedFile}
          style={{
            marginLeft: 8,
            background: "linear-gradient(90deg, #43cea2, #185a9d)",
            color: "#fff",
            border: "none",
            borderRadius: "20px",
            padding: "8px 18px",
            fontWeight: 600,
            cursor: uploading || !selectedFile ? "not-allowed" : "pointer",
            opacity: uploading || !selectedFile ? 0.7 : 1,
            boxShadow: "0 2px 8px rgba(24,90,157,0.15)",
          }}
        >
          {uploading ? "Uploading..." : avatarUrl ? "Change Photo" : "Upload"}
        </button>
      </div>
    </div>
  );
}

export default ProfileAvatar;
