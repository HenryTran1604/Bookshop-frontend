import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const UserNavigator = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const [categories, setCategories] = useState([])
    const [numInCart, setNumInCart] = useState(0)
    const [totalMoney, setTotalMoney] = useState(0)
    useEffect(() => {
        fetch('http://localhost:8081/api/categories')
            .then(response => response.json())
            .then(categories => setCategories(categories))
            .catch(err => console.error(err))
    }, [])

    useEffect(() => {
        fetch('http://localhost:8081/api/cart_quantity', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then((num) => setNumInCart(num))
            .catch(err => console.error(err))
    }, [])
    useEffect(() => {
        fetch('http://localhost:8081/api/total_money', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then((totalMoney) => setTotalMoney(totalMoney))
            .catch(err => console.error(err))
    }, [])
    return (
        <nav className="main_nav">
            <div className="custom_div container">
                <div className=" row">
                    <div className="col-lg-10 col-md-10 col-sm-10">
                        <div className="custom_div main_nav_content d-flex flex-row">
                            <div className="custom_div main_nav_menu">
                                <ul className="standard_dropdown main_nav_dropdown">
                                    <li><Link to="#">Home<i className="fas fa-chevron-down" /></Link></li>
                                    <li className="hassubs">
                                        <Link to="/">Tất cả</Link>
                                    </li>
                                    <li className="hassubs">
                                        <Link to="/categories">Thể loại <FontAwesomeIcon icon={faAngleDown}/></Link>
                                        <ul>
                                            {
                                                categories.map(category => (
                                                    <li key={category.id}><Link to={`/category/${category.id}/books`}>{category.categoryName}</Link></li>
                                                ))
                                            }
                                        </ul>
                                    </li>
                                    <li className="hassubs">
                                        <Link to="/order">Đơn hàng</Link>
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
                                    <div className="custom_div cart_count"><span>{numInCart}</span></div>
                                </div>
                                <div className="custom_div cart_content">
                                    <div className="custom_div cart_text"><Link to="/cart">Giỏ hàng</Link></div>
                                    <div className="custom_div cart_price">{totalMoney}</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </nav>

    )

}
export default UserNavigator