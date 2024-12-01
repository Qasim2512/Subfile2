/** @format */

import "./ScrollView.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function ScrollView() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const isLoggedIn = Cookies.get("logginn");

  useEffect(() => {
    fetch("http://jsonplaceholder.typicode.com/photos?_start=0&_limit=5")
      .then((response) => response.json())
      .then((data) => setUserData(data));
  }, []);

  function handleEdit(chosenData) {
    navigate(`/edit`, { state: { data: chosenData } });
  }

  return (
    <>
      <div className="ScrollviewMain">
        <h2>PixNote: ScrollView</h2>
        {isLoggedIn ? (
          <a href="/uploadImage" className="btn btn-primary mt-4">
            Upload Image
          </a>
        ) : (
          <a href="/logginn" className="btn btn-primary mt-4">
            Upload Image(Login required)
          </a>
        )}

        <div className="scroll-container">
          {userData && (
            <div>
              {userData.map((userData, key) => (
                <div className="scroll-item" key={key}>
                  <h5>{userData.title}</h5>
                  <img
                    src={userData.thumbnailUrl}
                    alt="Title"
                    className="imger"
                  />

                  <div className="py-4">
                    <p>@image.Description</p>
                    <small>
                      (Uploaded on: @image.DateUploaded.ToString("g"))
                    </small>
                    <br />

                    <small>
                      Uploaded by: @Model.ImageUploaderNames[image.ImageId]
                    </small>
                  </div>

                  {isLoggedIn ? (
                    <div>
                      <div className="buttons">
                        <a
                          className="btn btn-success"
                          onClick={() => handleEdit(userData)}
                        >
                          Edit
                        </a>

                        <input type="hidden" name="id" value="@image.ImageId" />
                        <button type="button" className="btn btn-danger">
                          Delete
                        </button>
                      </div>

                      <div className="CommentsMain">
                        <b>Comments:</b>
                        <div className="Scrollview-comment-section">
                          <div className="comment">
                            <strong>@comment.User:</strong>
                            <p>@comment.CommentText</p>
                            <small>
                              Posted on: @comment.CommentDate.ToString("g")
                            </small>
                          </div>

                          <div className="comment-form">
                            <h6>Share your thoughts:</h6>

                            <input
                              type="hidden"
                              name="ImageId"
                              value="@image.ImageId"
                            />
                            <textarea
                              name="CommentText"
                              className="form-control"
                              placeholder="Write a comment..."
                              required
                            ></textarea>
                            <br />
                            <button type="button" className="btn btn-primary">
                              Send Comment
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p>
                      Please <a href="/logginn">login</a> to post a comment.
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ScrollView;

/*    
todo delete button with backend 
send comment with backend
    }
    
    */
