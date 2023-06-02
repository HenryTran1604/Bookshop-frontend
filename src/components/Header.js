import React, { useEffect, useState } from "react";
import '../assets/css/header.css'
import '../assets/css/themify-icons/themify-icons.css'
import { Link } from "react-router-dom";
function Header() {

    const user = JSON.parse(sessionStorage.getItem('user'))
    const [categories, setCategories] = useState([])
    const [authors, setAuthors] = useState([])

    useEffect(() => {
        fetch('http://localhost:8081/api/categories')
            .then(response => response.json())
            .then(categories => setCategories(categories))
            .catch(err => console.error(err))
    }, [])

    useEffect(() => {
        fetch('http://localhost:8081/api/authors')
            .then(response => response.json())
            .then(authors => setAuthors(authors))
            .catch(err => console.error(err))
    }, [])
    const handleSearch = (e) => {

    }
    return (
        <>
            <header className="header">
                <div className="header_main">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="custom_div col-lg-1 col-sm-3 col-3 order-1">
                                <div className="custom_div logo_container">
                                    <Link to="/"><img className="logo" src="/static/web-images/bookshop.png" /></Link>
                                </div>
                            </div>
                            <div className="custom_div col-lg-8 col-sm-6 order-lg-2 order-3 text-lg-left text-right">
                                <div className="custom_div header_search">
                                    <h1>Bookshop</h1>
                                </div>
                            </div>
                            <div className="custom_div col-lg-2 col-sm-2 order-3" style={{ marginTop: "20px" }}>
                                <p>Xin chào {user.fullName}</p>
                            </div>
                            <div className="custom_div col-lg-1 col-sm-1 order-4">
                                <img className="user" src="/static/web-images/user.png" />
                            </div>
                        </div>
                    </div>

                </div>
                {/* Main Navigation */}
                <nav className="main_nav">
                    <div className="custom_div container">
                        <div className=" row">
                            <div className="col-lg-10 col-md-10 col-sm-10">
                                <div className="custom_div main_nav_content d-flex flex-row">
                                    <div className="custom_div main_nav_menu">
                                        <ul className="standard_dropdown main_nav_dropdown">
                                            <li><Link to="#">Home<i className="fas fa-chevron-down" /></Link></li>
                                            <li className="hassubs">
                                                <Link to="/books">All books</Link>
                                            </li>
                                            <li className="hassubs">
                                                <Link to="/categories">Categories<i className="ti ti-angle-down" /></Link>
                                                <ul>
                                                    {
                                                        categories.map(category => (
                                                            <li key={category.id}><Link to={`/books/category/${category.id}`}>{category.categoryName}</Link></li>
                                                        ))
                                                    }
                                                </ul>
                                            </li>
                                            <li className="hassubs">
                                                <Link to="#">Authors<i className="ti ti-angle-down" /></Link>
                                                <ul>
                                                    {
                                                        authors.map(author => (
                                                            <li key={author}><a>{author}</a></li>
                                                        ))

                                                    }
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* Menu Trigger */}
                                    <div className="custom_div menu_trigger_container ml-auto">
                                        <div className="custom_div menu_trigger d-flex flex-row align-items-center justify-content-end">
                                            <div className="custom_div menu_burger">
                                                <div className="custom_div menu_trigger_text">menu</div>
                                                <div className="custom_div cat_burger menu_burger_inner"><span /><span /><span /></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-2 col-sm-2">
                                <div className="cart">
                                    <div className="custom_div cart_container d-flex flex-row align-items-center justify-content-end">
                                        <div className="custom_div cart_icon">
                                            <img src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1560918704/cart.png" alt="" />
                                            <div className="custom_div cart_count"><span>3</span></div>
                                        </div>
                                        <div className="custom_div cart_content">
                                            <div className="custom_div cart_text"><Link to="#">Cart</Link></div>
                                            <div className="custom_div cart_price">$185</div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </nav>
                <div
                    className="p-4 bg-primary bs-cover"
                    style={{
                        backgroundImage: "url(/static/web-images/banner.jpg)",
                        backgroundSize: "cover"
                    }}
                >
                </div>
            </header>
        </>
    )
}
export default Header