/** @format */

import "./Edit.css";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Edit() {
  const location = useLocation();
  const navigate = useNavigate();

  const [title, setTitle] = useState(location.state.data.title);
  const [description, setDescription] = useState(location.state.data.title);

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

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

    navigate("/scrollView");
  }

  return (
    <div className="EditMain">
      <div>
        <div>
          <h2>Edit Image {location.state.data.title}</h2>
          <form method="#" className="FormMain">
            <input type="hidden" />
            <div className="form-group">
              <label>Title</label>
              <input
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <span className="text-danger">{titleError}</span>
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <span className="text-danger">{descriptionError}</span>
            </div>
            <div className="form-group">
              <label>Current Image:</label>
              <br />
              <img src={location.state.data.thumbnailUrl} alt="Current Image" />
            </div>
            <div className="buttons">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpload}
              >
                Update
              </button>
              <a href="/scrollView" class="btn btn-secondary">
                Cancel
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Edit;
