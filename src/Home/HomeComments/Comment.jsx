/** @format */

import "./Comment.css"

export default function Comment() {
  return (
    <div className="col-md-12 CommentMain">
      <div className="comment-section">
        <h5>Comments</h5>
        <div className="comment">
          <strong>Geko:</strong>
          <p>Great picture! &#10084;</p>
        </div>
        <div className="comment">
          <strong>Saim:</strong>
          <p>Love the colors in this one!</p>
        </div>
        <div className="comment-form">
          <h6>Share your thoughts:</h6>
          <input
            type="text"
            className="form-control"
            placeholder="Write a comment..."
          />
        </div>
      </div>
    </div>
  );
}
