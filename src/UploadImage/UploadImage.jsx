/** @format */

import "./UploadImage.css";

function UploadImage() {
  return (
    <div className="UploadMain">
      <h2>Upload Image</h2>

      <form className="FormMain" enctype="multipart/form-data" method="post">
        <div className="form-group">
          <label for="title">Title:</label>
          <input type="text" name="title" className="form-control" required />
        </div>
        <div className="form-group">
          <label for="description">Description:</label>
          <input name="description" className="form-control" required></input>
        </div>
        <div className="form-group">
          <label for="imageFile">Select Image:</label>
          <input
            type="file"
            accept=" image/png, image/gif, image/jpeg"
            name="imageFile"
            className="form-control"
            required
          />
        </div>
        <div className="Buttons">
          <a href="/scrollView">
            <button type="button" className="btn btn-primary">
              Upload
            </button>
          </a>
        </div>
      </form>
    </div>
  );
}

export default UploadImage;
