/** @format */

import "./Edit.css";
import React, { useEffect, useState } from "react";

function Edit() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch("http://jsonplaceholder.typicode.com/photos?_start=0&_limit=5")
      .then((response) => response.json())
      .then((data) => setUserData(data));
  });

  return (
    <div className="EditMain">
      {userData && (
        <div>
          {userData.map((userData) => (
            <div>
              <h2>Edit Image: {userData.title}</h2>
              <form method="post" className="FormMain">
                <input type="hidden" />
                <div className="form-group">
                  <label></label>
                  <input className="form-control" />
                  <span className="text-danger"></span>
                </div>
                <div className="form-group">
                  <label></label>
                  <input className="form-control"></input>
                  <span className="text-danger"></span>
                </div>
                <div className="form-group">
                  <label>Current Image:</label>
                  <br />
                  <img
                    src="@Url.Content(Model.ImagePath)"
                    alt="Current Image"
                  />
                </div>
                <div className="buttons">
                  <a href="/scrollView">
                    <button type="submit" className="btn btn-primary">
                      Update
                    </button>
                  </a>
                  <a href="/scrollView" class="btn btn-secondary">
                    Cancel
                  </a>
                </div>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Edit;

/*


*/
