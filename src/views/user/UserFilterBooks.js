import React from "react";
import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faBars } from "@fortawesome/free-solid-svg-icons";
import UserBookCardList from "../../components/user/UserBookCardList";
import UserBookCardGrid from "../../components/user/UserBookCardGrid"

import Header from "../../components/Header";


const UserFilterBooksView = () => {
    const { id } = useParams()
    const [books, setBooks] = useState([])
    const [category, setCategory] = useState([])
    const [view, setView] = useState("list")
    const [search, setSearch] = useState('')
    const fetchCategory = () => {
        fetch('http://localhost:8081/api/category/' + id)
            .then((response) => response.json())
            .then((category) => setCategory(category))
            .catch((err) => console.log(err))
    }
    const fetchBooks = () => {
        fetch('http://localhost:8081/api/category/' + id + '/books')
            .then((response) => response.json())
            .then((books) => setBooks(books))
            .catch((err) => console.log(err))
    }
    useEffect(() => {
        fetchCategory()
        fetchBooks()
    }, [id]);

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
                        <Link to="/" title="Home">
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        category
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {category.categoryName}
                    </li>
                </ol>
            </nav>
            <div className="container-fluid mb-3">
                <div className="row">
                    <div className="col-7">
                        <span className="align-middle fw-bold">
                            Thể loại {" "}
                            <span className="text-warning">{category.categoryName}</span>
                        </span>
                    </div>
                    <div className="col-5 d-flex justify-content-end">
                        <input type="text" className="form-control" placeholder="Search book by title..." onChange={(e) => setSearch(e.target.value)} />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button">Search</button>
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
                                <div key={idx} className="col-md-3">
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
            </div>
        </React.Fragment>
    );

}

export default UserFilterBooksView;
