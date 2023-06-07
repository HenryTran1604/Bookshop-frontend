import React from "react";
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";

const UserBookCardGrid = (props) => {
    
    const book = props.data;
    const discount = Math.floor(Math.random() * 10)
    return (
        <div className="card">
            <img src={book.imageUrl === "null" ?  'https://placehold.co/225x350' : book.imageUrl} className="card-img-top mx-auto" 
            style={{height: "350px", width: "225px"}}/>
            <span className="badge bg-success position-absolute mt-2 ms-2">
                New
            </span>
            <span className="badge bg-danger position-absolute mt-2 me-2" style={{right: 0}}>
                Hot
            </span>
            <span className={`rounded position-absolute p-2 bg-warning ms-2 small mt-5`} >
                -{discount + "%"}
            </span>
            <div className="card-body">
                <h6 className="card-subtitle mb-2">
                    <Link to={`/bookdetail/${book.id}`} className="text-decoration-none">
                        {book.title}
                    </Link>
                </h6>
                <div className="my-2">
                    <span className="fw-bold h5">${book.price}</span>
                    <span className="ms-2">
                        {Array.from({ length: book.rate }, (_, key) => (
                            <IconStarFill className="text-warning me-1" key={key} />
                        ))}
                    </span>
                </div>
                <div className="btn-group  d-flex" role="group">
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
    );
};

export default UserBookCardGrid;
