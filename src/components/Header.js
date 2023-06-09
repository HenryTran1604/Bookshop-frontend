import React from "react";
import '../assets/css/header.css'
import { Link } from "react-router-dom";
import AdminNavigator from "./admin/AdminNavigator";
import UserNavigator from "./user/UserNavigator";
function Header() {
    const user = JSON.parse(localStorage.getItem('user'))
    
    return (
        <header className="header header_section">
            <div className="header_main">
                <div className="container-fluid">
                    <div className="row">
                        <div className="custom_div col-lg-1 col-sm-3 col-3 order-1">
                            <div className="custom_div logo_container">
                                {user.role === 'admin' ? (
                                    <Link to="/admin/books">
                                        <img className="logo" src="/static/web-images/bookshop.png" />
                                    </Link>
                                ) : (
                                    <Link to="/">
                                        <img className="logo" src="/static/web-images/bookshop.png" />
                                    </Link>
                                )}

                            </div>
                        </div>
                        <div className="custom_div col-lg-8 col-sm-6 order-lg-2 order-3 text-lg-left text-right">
                            <div className="custom_div header_search text-white">
                                <h1><Link to="/" className="text-white">Bookshop</Link></h1>
                            </div>
                        </div>
                        <div className="custom_div col-lg-2 col-sm-2 order-3" style={{ marginTop: "20px" }}>
                            <p className="text-white">Xin chào {user.fullName}</p>
                        </div>
                        <div className="custom_div col-lg-1 col-sm-1 order-4">

                            <Link to="/profile">
                                <img className="user standard_dropdown main_nav_dropdown" style={{marginTop: "10px", width: "60%"}} src="/static/web-images/user.png" />
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
            {
                user.role === 'admin' ? (
                    <AdminNavigator/>
                ) : (
                    <UserNavigator/>
                )
            }
            
            <div
                className="p-3 bg-primary bs-cover"
                style={{
                    backgroundImage: "url(/static/web-images/banner.jpg)",
                    backgroundSize: "cover"
                }}
            >
            </div>
        </header>
    )
}
export default Header