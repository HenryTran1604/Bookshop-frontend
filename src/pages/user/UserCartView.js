import React, { Component, lazy } from "react";
import { Form, Link } from "react-router-dom";
import { ReactComponent as IconHeartFill } from "bootstrap-icons/icons/heart-fill.svg";
import { ReactComponent as IconTrash } from "bootstrap-icons/icons/trash.svg";
import { ReactComponent as IconChevronRight } from "bootstrap-icons/icons/chevron-right.svg";
import { ReactComponent as IconChevronLeft } from "bootstrap-icons/icons/chevron-left.svg";
import { ReactComponent as IconTruck } from "bootstrap-icons/icons/truck.svg";
import { useState } from "react";
import { useEffect } from "react";
import Header from "../../components/Header";

const UserCartView = () => {
  const user = JSON.parse(sessionStorage.getItem('user'))
  const [cartItems, setCartItems] = useState([])
  const [message, setMessage] = useState('')
  const fetchCart = () => {
    fetch('http://localhost:8081/api/cart', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(cartItems => setCartItems(cartItems))
      .catch(err => console.error(err))
  }
  useEffect(() => {
    fetchCart()
  }, [])
  const total = cartItems.reduce((sum, cartItem) => sum + cartItem.quantity * cartItem.book.price, 0)
  const handleDeleteCartItem = (id) => {
    if (window.confirm('Bạn có muốn xoá sản phẩm này khỏi giỏ hàng không?')) {
      fetch('http://localhost:8081/api/cart/delete/' + id, {
        method: "DELETE"
      })
        .then(() => {
          fetchCart()
        })
        .catch(err => console.log(err))
    }

  }
  const handlePurchase = () => {
    console.log(cartItems.length)
    if(cartItems.length === 0) {
      setMessage('Vui lòng chọn sản phẩm!')
      return
    } 
    cartItems.forEach((cartItem) => {
      cartItem.purchaseStatus = "delivery"
    })
    fetch('http://localhost:8081/api/purchase', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cartItems)
    })
      .then(response => {
        setMessage('Đơn hàng đã được đặt thành công!\nVui lòng kiểm tra trong mục đơn hàng')
        fetchCart()
      })
      .catch(err => console.error(err))
  }
  return (
    <React.Fragment>
      <Header />
      <div className="bg-secondary border-top p-2 text-white mb-3">
        <h4 className="display-10">Giỏ hàng của bạn</h4>
      </div>
      <div className="container mb-3">
        <div className="row">
          <div className="col-md-9">
            <div className="card">
              <div className="table-responsive">
                <table className="table table-borderless">
                  <thead className="text-muted">

                    <tr className="small text-uppercase">
                      <th scope="col">Sách</th>
                      <th scope="col" width={120}>
                        Số lượng
                      </th>
                      <th scope="col" width={150}>
                        Giá
                      </th>
                      <th scope="col" className="text-end" width={130}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      cartItems.map((cartItem, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <div className="row">
                                <div className="col-3 d-none d-md-block">
                                  <img
                                    src={cartItem.book.imageUrl}
                                    width="80"
                                    alt="..."
                                  />
                                </div>
                                <div className="col">
                                  <Link
                                    to={`/bookdetail/${cartItem.book.id}`}
                                    className="text-decoration-none"
                                  >
                                    {cartItem.book.title}
                                  </Link>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="input-group input-group-sm mw-140">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={cartItem.quantity}
                                  readOnly
                                />
                              </div>
                            </td>
                            <td>
                              <var className="price">{cartItem.book.price * cartItem.quantity}</var>
                              <small className="d-block text-muted">
                                VND {cartItem.book.price}/1 cuốn
                              </small>
                            </td>
                            <td className="text-end">
                              <button className="btn btn-sm btn-outline-secondary me-2">
                                <IconHeartFill className="i-va" />
                              </button>
                              <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteCartItem(cartItem.id)}>
                                <IconTrash className="i-va" />
                              </button>
                            </td>
                          </tr>)
                      })
                    }

                  </tbody>
                </table>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary float-end" onClick={handlePurchase}>
                  Đặt hàng ngay! <IconChevronRight className="i-va" />
                </button>
                <Link to="/books" className="btn btn-secondary">
                  <IconChevronLeft className="i-va" /> Tiếp tục mua sắm
                </Link>
              </div>
            </div>
            <span className="text-success">{message}</span>
            <div className="alert alert-success mt-3">
              <p className="m-0">
                <IconTruck className="i-va me-2" /> Miễn phí vận chuyển từ 1 đến 2 tuần
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card mb-3">
              <div className="card-body">
                {/* <Form onSubmit={1}> </Form> */}
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <dl className="row border-bottom">
                  <dt className="col-6">Tổng tiền:</dt>
                  <dd className="col-6 text-end">{total}</dd>

                  <dt className="col-6 text-success">Giảm giá:</dt>
                  <dd className="col-6 text-success text-end">0</dd>
                </dl>
                <dl className="row">
                  <dt className="col-6">Tổng tiền</dt>
                  <dd className="col-6 text-end  h5">
                    <strong>{total}</strong>
                  </dd>
                </dl>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-light border-top p-4">
        <div className="container">
          <h6>Payment and refund policy</h6>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default UserCartView;
