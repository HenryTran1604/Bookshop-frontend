import React, { lazy, Component } from "react";
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faBars } from "@fortawesome/free-solid-svg-icons";
import UserReview from "./UserReview";
import UserBookCardList from "./UserBookCardList";
import UserBookCardGrid from "./UserBookCardGrid"

import UserBookCardServices from './UserBookCardService'
import Header from "../Header";
// const Paging = lazy(() => import("../../components/Paging"));
const UserCategories = lazy(() => import("./UserCategories"));



const UserBooks = ({data, filter}) => {
  const books = data
  const [search, setSearch] = useState('')
  const [view, setView] = useState("list")
  // useEffect(() => {
  //   fetch('http://localhost:8081/api/books')
  //     .then((response) => response.json())
  //     .then((books) => setBooks(books))
  //     .catch((err) => console.log(err))
  // }, []);
  console.log(books)


  const handleSearch = () => {
    if (search !== '') {
      console.log('http://localhost:8081/api/book/search?key=' + `${search}`)
      fetch('http://localhost:8081/api/book/search?key=' + search)
        .then((response) => response.json())
        .then((books) => {
          setBooks(books)
        })
        .catch((err) => console.log(err))
    }
  }

  const onChangeView = (view) => {
    setView(view);
  };


  return (
    <React.Fragment>
      <div className="container-fluid mb-3">
        <div className="row">
          <div className="col-md-3">
            <UserCategories />
            <UserReview />
            <UserBookCardServices />
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-7">
                <span className="align-middle fw-bold">
                  Results for{" "}
                  <span className="text-warning">{filter}</span>
                </span>
              </div>
              <div className="col-5 d-flex justify-content-end">
                <input type="text" className="form-control" placeholder="Search book by title..." onChange={handleInputChange} />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>Search</button>
                </div>
                <div className="btn-group ms-3" role="group">
                  <button
                    aria-label="Grid"
                    type="button"
                    onClick={() => onChangeView("grid")}
                    className={`btn ${view === "grid"
                      ? "btn-primary"
                      : "btn-outline-primary"
                      }`}
                  >
                    <FontAwesomeIcon icon={faTh} />
                  </button>
                  <button
                    aria-label="List"
                    type="button"
                    onClick={() => onChangeView("list")}
                    className={`btn ${view === "list"
                      ? "btn-primary"
                      : "btn-outline-primary"
                      }`}
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </button>
                </div>
              </div>
            </div>
            <hr />
            <div className="row g-3">
              {view === "grid" &&
                books.filter((book) => {
                  return book.title.toLowerCase().includes(search.toLowerCase())
                }).map((book, idx) => {
                  return (
                    <div key={idx} className="col-md-4">
                      <UserBookCardGrid data={book} />
                    </div>
                  );
                })}
              {view === "list" &&
                books.filter((book) => {
                  return book.title.toLowerCase().includes(search.toLowerCase())
                }).map((book, idx) => {
                  return (
                    <div key={idx} className="col-md-12">
                      <UserBookCardList data={book} />
                    </div>
                  );
                })}
            </div>
            <hr />
            {/* <Paging
              totalRecords={totalItems}
              pageLimit={9}
              pageNeighbours={3}
              onPageChanged={onPageChanged}
              sizing=""
              alignment="justify-content-center"
            /> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );

}

export default UserBooks;
