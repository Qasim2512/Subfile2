/** @format */

import "./ScrollView.css";
import React, { useEffect, useState } from "react";

function ScrollView() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch("http://jsonplaceholder.typicode.com/photos?_start=0&_limit=5")
      .then((response) => response.json())
      .then((data) => setUserData(data));
  }, []);

  return (
    <>
      <div className="ScrollviewMain">
        <h2>PixNote: ScrollView</h2>

        <a href="/Identity/Account/Login" className="btn btn-primary mt-4">
          Upload Image (Login required)
        </a>

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

                  <div className="buttons">
                    <a className="btn btn-success" href="/edit">
                      Edit
                    </a>

                    <form method="post">
                      <input type="hidden" name="id" value="@image.ImageId" />
                      <button type="submit" className="btn btn-danger">
                        Delete
                      </button>
                    </form>
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
                        <form method="post">
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
                          <button type="submit" className="btn btn-primary">
                            Send Comment
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
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
<p>You must be logged in to edit or delete an image.</p>

                      <p>
                        Please <a href="/Identity/Account/Login">login</a> to
                        post a comment.
                      </p>

@if (User.Identity.IsAuthenticated)
    {
        
        <a href="@Url.Action("Upload", "Image")" classNameName="btn btn-primary mt-4">Upload Image</a>
    }
    else
    {
        
        <a href="/Identity/Account/Login" classNameName="btn btn-primary mt-4">Upload Image (Login required)</a>
    } 
        
    
    @if (Model.Images != null && Model.Images.Any())
    {
    
                @foreach (var image in Model.Images)
            {
                

                                                                }
                        else
                        {
                            <p>You must be logged in to edit or delete an image.</p>
                        }

                                                    @foreach (var comment in Model.Comments.Where(c => c.ImageId == image.ImageId))
                            {
                                @if (User.Identity.IsAuthenticated)
                            {
    
    
    
                                else
                            {
                                <p>Please <a href="/Identity/Account/Login">login</a> to post a comment.</p>
                            }
    
        else
    {
        <p>No images available.</p>
        <p>Still in progress</p>
    }
    
    */
