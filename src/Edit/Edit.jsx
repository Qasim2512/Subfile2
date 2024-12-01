/** @format */

import "./Edit.css";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Edit() {
  const location = useLocation();

  console.log(location);

  return (
    <div className="EditMain">
      <div>
        <div>
          <h2>Edit Image {location.state.data.title}</h2>
          <form method="post" className="FormMain">
            <input type="hidden" />
            <div className="form-group">
              <label>Title</label>
              <input
                className="form-control"
                defaultValue={location.state.data.title}
              />
              <span className="text-danger"></span>
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                className="form-control"
                defaultValue={location.state.data.title}
              ></input>
              <span className="text-danger"></span>
            </div>
            <div className="form-group">
              <label>Current Image:</label>
              <br />
              <img src={location.state.data.thumbnailUrl} alt="Current Image" />
            </div>
            <div className="buttons">
              <a href="/scrollView">
                <button type="button" className="btn btn-primary">
                  Update
                </button>
              </a>
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
