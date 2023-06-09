import React, { lazy, Component } from "react";
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faBars } from "@fortawesome/free-solid-svg-icons";
import UserReview from "../../components/user/UserReview";
import UserBookCardList from "../../components/user/UserBookCardList";
import UserBookCardGrid from "../../components/user/UserBookCardGrid"

import UserBookCardServices from '../../components/user/UserBookCardService'
import Header from "../../components/Header";
// const Paging = lazy(() => import("../../components/Paging"));
const UserCategories = lazy(() => import("../../components/user/UserCategories"));


const UserBooksView = () => {
  const [books, setBooks] = useState([])
  const [number, setNumber] = useState()
  const [search, setSearch] = useState('')
  const [view, setView] = useState("list")
  useEffect(() => {
    fetch('http://localhost:8081/api/books')
      .then((response) => response.json())
      .then((books) => setBooks(books))
      .catch((err) => console.log(err))
  }, []);

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
      <Header />

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb rounded-0">
          <li className="breadcrumb-item">
            <Link to="/books" title="Home">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            All books
          </li>
        </ol>
      </nav>
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
                  <span className="text-warning">{search === '' ? 'all book' : search}</span>
                </span>
              </div>
              <div className="col-5 d-flex justify-content-end">
                <input type="text" className="form-control" placeholder="Search book by title..." onChange={(e) => setSearch(e.target.value)} />
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

export default UserBooksView;
