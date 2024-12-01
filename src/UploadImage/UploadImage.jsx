/** @format */

import "./UploadImage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function UploadImage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [upload, setUpload] = useState(null);

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [uploadError, setUploadError] = useState("");

  function handleUpload() {
    if (title.trim().length === 0) {
      setTitleError("Write in the title");
      return;
    } else {
      setTitleError("");
    }

    if (description.trim().length === 0) {
      setDescriptionError("Please write a description of picture");
      return;
    } else {
      setDescriptionError("");
    }

    if (upload === null) {
      setUploadError("Upload a file");
      return;
    } else {
      setUploadError("");
    }

    navigate("/scrollView");
  }

  return (
    <div className="UploadMain">
      <h2>Upload Image</h2>

      <div className="form-group">
        <label for="title">Title:</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <span className="text-danger">{titleError}</span>
      </div>
      <div className="form-group">
        <label for="description">Description:</label>
        <input
          name="description"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <span className="text-danger">{descriptionError}</span>
      </div>
      <div className="form-group">
        <label for="imageFile">Select Image:</label>
        <input
          type="file"
          accept=" image/png, image/gif, image/jpeg"
          name="imageFile"
          className="form-control"
          value={upload}
          onChange={(e) => setUpload(e.target.value)}
        />
        <span className="text-danger">{uploadError}</span>
      </div>
      <div className="Buttons">
        <button
          type="button"
          className="btn btn-primary my-2"
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default UploadImage;
