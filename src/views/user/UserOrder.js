import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faTruck,
    faCheck,
    faComment,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";

const UserOrderView = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const [orders, setOrders] = useState([])
    const fetchOrders = () => {
        fetch('http://localhost:8081/api/order', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(orders => setOrders(orders))
            .catch(err => console.error(err))
    }
    console.log(orders)
    useEffect(() => {
        fetchOrders()
    }, [])
    const handleConfirm = (order) => {
        if (window.confirm('Bạn đã nhận được hàng?')) {
            order.purchaseStatus = 'completed'
            fetch('http://localhost:8081/api/confirm', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            })
                .then(() => {
                    fetchOrders()
                })
                .catch(err => console.error(err))
        }

    }
    return (
        <React.Fragment>
            <Header />
            <div className="container mb-3">
                <h4 className="my-3">Đơn hàng của bạn</h4>
                <div className="row g-3">
                    {
                        orders.map((order) => {
                            return (
                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="row g-0">
                                            <div className="col-md-3 text-center">
                                                <img style={{ height: '167px' }}
                                                    src={order.book.imageUrl}
                                                    className="img-fluid"
                                                    alt="..."
                                                />
                                            </div>
                                            <div className="col-md-9">
                                                <div className="card-header">
                                                    <div className="small">
                                                        <span className="border bg-secondary rounded-left px-2 text-white">
                                                            Order ID
                                                        </span>
                                                        <span className="border bg-white rounded-right px-2 me-2">
                                                            {order.id}
                                                        </span>
                                                        <span className="border bg-secondary rounded-left px-2 text-white">
                                                            Ngày đặt hàng
                                                        </span>
                                                        <span className="border bg-white rounded-right px-2">
                                                            {order.purchaseDate}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <h6>
                                                        {
                                                            order.book.available === 1 ? (
                                                                <Link to={`/bookdetail/${order.book.id}`} className="text-decoration-none">
                                                                    {order.book.title}
                                                                </Link>) : (
                                                                    <p>{order.book.title}<span className="text-secondary"> (Ngừng bán)</span></p>
                                                            )
                                                        }
                                                            
                                                        
                                                        
                                                    </h6>
                                                    <div className="small">
                                                        <span className="text-muted me-2">Số lượng:</span>
                                                        <span className="me-3">{order.quantity}</span>
                                                        <span className="text-muted me-2">Price:</span>
                                                        <span className="me-3">VND {order.quantity * order.book.price}</span>
                                                    </div>
                                                    <div className="mt-2"></div>
                                                </div>
                                                <div className="card-footer d-flex justify-content-between">
                                                    <div>
                                                        <span className="me-2">Trạng thái</span>
                                                        {
                                                            order.purchaseStatus === 'delivery' ? (
                                                                <span className="text-primary">
                                                                    <FontAwesomeIcon
                                                                        icon={faTruck}
                                                                        className="me-1"
                                                                    />
                                                                    {order.purchaseStatus}
                                                                </span>
                                                            ) : order.purchaseStatus === 'completed' ? (
                                                                <span className="text-success">
                                                                    <FontAwesomeIcon
                                                                        icon={faCheckCircle}
                                                                        className="me-1"
                                                                    />
                                                                    {order.purchaseStatus}
                                                                </span>
                                                            ) : null
                                                        }

                                                    </div>
                                                    {
                                                        order.purchaseStatus === 'delivery' ? (
                                                            <div>
                                                                <span className="me-2">Đã nhận?</span>
                                                                <span className="text-success">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-sm btn-primary me-2"
                                                                        title="Thêm vào giỏ hàng"
                                                                        onClick={() => handleConfirm(order)}
                                                                    >
                                                                        <FontAwesomeIcon icon={faCheck} /> Xác nhận
                                                                    </button>
                                                                </span>
                                                            </div>
                                                        ) : order.purchaseStatus === 'completed' ? (
                                                            <div>
                                                                <span className="text-success">
                                                                    <Link to={`/bookdetail/${order.book.id}`}
                                                                        type="button"
                                                                        className="btn btn-sm btn-success me-2"
                                                                        title="Đánh giá"
                                                                    >
                                                                        <FontAwesomeIcon icon={faComment} /> Đánh giá
                                                                    </Link>
                                                                </span>
                                                            </div>
                                                        ) : null
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div >
        </React.Fragment>

    );
};

export default UserOrderView;
