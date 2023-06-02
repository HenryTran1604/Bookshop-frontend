import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const UserCategories = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        fetch('http://localhost:8081/api/categories')
            .then((response) => response.json())
            .then((categories) => setCategories(categories))
            .catch((err) => console.log(err))
    }, []);
    console.log(categories)
    return (
        <div className="card mb-3 accordion">
            <div
                className="card-header fw-bold text-uppercase accordion-icon-button"
                data-bs-toggle="collapse"
                data-bs-target="#filterCategory"
                aria-expanded="true"
                aria-controls="filterCategory"
            >
                Categories
            </div>
            <ul className="list-group list-group-flush show" id="filterCategory">
                {
                    categories.map((category, index) => (
                        <li key = {index} className="list-group-item">
                            <Link to="/" className="text-decoration-none stretched-link">
                                {category.categoryName}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default UserCategories;
