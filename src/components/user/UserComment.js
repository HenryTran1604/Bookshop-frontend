import React from "react";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { ReactComponent as IconCheckCircleFill } from "bootstrap-icons/icons/check-circle-fill.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const UserComment = ({ data, user, fetchComments}) => {
  const comment = data;
  const handleDeleteComment = () => {
    if (window.confirm('Bạn có muốn xóa bình luận này không?')) {
      fetch('http://localhost:8081/api/comment/delete/' + comment.id, {
        method: 'DELETE',
        headers: {
          "Authorization": "Bearer your_access_token"
        }
      })
        .then(response => {
          fetchComments()
        })
        .catch(err => console.log(err));
    }
  }

  return (
    <div className="border-bottom mb-3">
      <div className="mb-2">
        <span>
          {Array.from({ length: 5 }, (_, key) => {
            if (key < comment.stars)
              return (
                <IconStarFill className="text-warning me-1" key={key} />
              );
            else
              return (
                <IconStarFill className="text-secondary me-1" key={key} />
              );
          })}
        </span>
        <span className="text-muted">
          <IconCheckCircleFill className="text-success me-1" />
          {comment.user.fullName} | Bình luận vào {" "}
          <i className="fw-bold">{comment.commentDate}</i>
        </span>
      </div>
      <p>{comment.content}</p>
      <div className="mb-2">
        <button className="btn btn-sm btn-outline-success me-2">
          <FontAwesomeIcon icon={faThumbsUp} /> 10
        </button>
        <button className="btn btn-sm btn-outline-danger me-2">
          <FontAwesomeIcon icon={faThumbsDown} /> 5
        </button>
        {(user.id === comment.user.id || user.role === 'admin') && (
          <>
            <button type="button" className="btn btn-sm btn-outline-secondary me-2">
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button type="button" className="btn btn-sm btn-outline-danger mr-0" onClick={handleDeleteComment}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserComment;
