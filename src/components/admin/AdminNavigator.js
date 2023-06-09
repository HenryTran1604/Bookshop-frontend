import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AdminNavigator = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        fetch('http://localhost:8081/api/categories')
            .then(response => response.json())
            .then(categories => setCategories(categories))
            .catch(err => console.error(err))
    }, [])
    return (
        <>
            <nav className="main_nav">
                <div className="custom_div container">
                    <div className=" row">
                        <div className="col-lg-10 col-md-10 col-sm-10">
                            <div className="custom_div main_nav_content d-flex flex-row">
                                <div className="custom_div main_nav_menu">
                                    <ul className="standard_dropdown main_nav_dropdown">
                                        <li><Link to="#">Home<i className="fas fa-chevron-down" /></Link></li>
                                        <li className="hassubs">
                                            <Link to="">Quản lý <FontAwesomeIcon icon={faAngleDown}/></Link>
                                            <ul>
                                                <li><Link to="/admin/books">Sách</Link></li>
                                                <li><Link to="/admin/categories">Thể loại</Link></li>
                                                <li><Link to="/admin/users">Người dùng</Link></li>
                                            </ul>
                                        </li>
                                        <li className="hassubs">
                                            <Link to="/">Hiển thị</Link>
                                        </li>
                                        <li className="hassubs">
                                            <Link to="/">Thể loại <FontAwesomeIcon icon={faAngleDown}/></Link>
                                            <ul>
                                                {
                                                    categories.map(category => (
                                                        <li key={category.id}><Link to={`/category/${category.id}/books`}>{category.categoryName}</Link></li>
                                                    ))
                                                }
                                            </ul>
                                        </li>
                                        <li className="hassubs">
                                            <Link to="/">Thống kê</Link>
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
                    </div>
                </div>
            </nav>
        </>

    )

}
export default AdminNavigator