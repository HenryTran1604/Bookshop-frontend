import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { ReactComponent as IconTruckFill } from "bootstrap-icons/icons/truck.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";

const UserBookCardList = (props) => {
  const discount = Math.floor(Math.random() * 10);
  const book = props.data
  return (
    <div className="card">
      <div className="row g-0 h-200">
        <div className="col-md-3 text-center">
          <img src={book.imageUrl} className="img-fluid" alt="..." style={{ height: "197px" }} />
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h6 className="card-subtitle me-2 d-inline">
              <Link to={`/bookdetail/${book.id}`} className="text-decoration-none">
                {book.title}
              </Link>
            </h6>

            <div>
              {book.rate > 0 &&
                Array.from({ length: 5 }, (_, key) => {
                  if (key < book.rate)
                    return (
                      <IconStarFill className="text-warning me-1" key={key} />
                    );
                  else
                    return (
                      <IconStarFill className="text-secondary me-1" key={key} />
                    );
                })}
            </div>
            <span className="badge bg-success me-2">Thể loại: {book.category.categoryName}</span>

            <p className="small mt-2">{book.description}</p>

          </div>
        </div>
        <div className="col-md-3">
          <div className="card-body">
            <div className="mb-2">
              <span className="fw-bold h5">VND {book.price}</span>
              <span className={`rounded p-1 bg-warning ms-2 small`}>
                -
                {discount + "%"}
              </span>
            </div>
            <div className="mb-2">
              <span className="fw-bold h6">{"Đã bán " + book.sold}</span>
            </div>
            <p className="text-success small mb-2">
              <IconTruckFill /> Miễn phí ship
            </p>

            <div className="btn-group d-flex" role="group">
              <Link to={`/bookdetail/${book.id}`}
                type="button"
                className="btn btn-sm btn-primary"
                title="Add to cart"
              >
                <FontAwesomeIcon icon={faCartPlus} />
              </Link>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                title="Add to wishlist"
              >
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBookCardList;
