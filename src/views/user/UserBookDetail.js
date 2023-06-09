import React from "react";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart, faMinus, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import CardServices from "../../components/user/UserBookCardService";
import UserComment from "../../components/user/UserComment";
import Header from "../../components/Header";

const UserBookDetailView = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()
    const [book, setBook] = useState([])
    const [quantity, setQuantity] = useState(1)
    const [error, setError] = useState('')
    const [comments, setComments] = useState([])
    const [myComment, setMyCommnet] = useState('')
    const [stars, setStars] = useState(5)
    const { id } = useParams()

    useEffect(() => {
        fetch('http://localhost:8081/api/book/' + id)
            .then((response => response.json()))
            .then(book => {
                setBook(book)
            })
            .then((err) => console.log(err))
    }, [])
    const fetchComments = () => {
        fetch('http://localhost:8081/api/book/' + id + '/comments')
            .then((response => response.json()))
            .then(comments => {
                setComments(comments)
            })
            .then((err) => console.log(err))
    }
    useEffect(() => {
        fetchComments()
    }, [])

    const getCurrentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    const handleAddComment = async (event) => {
        event.preventDefault()
        const commentData = {
            "user": user,
            "book": book,
            "commentDate": getCurrentDate(),
            "stars": stars,
            "content": myComment
        }

        try {
            const response = await axios.post('http://localhost:8081/api/comment/save', commentData);
            setMyCommnet('')
            fetchComments()
        } catch (error) {
            console.log(error);
        }
    }
    const handleAddToCart = async (event) => {
        event.preventDefault()
        if (quantity === 0 || quantity > 10000) setError('Số lượng không hợp lệ')
        else {
            const purchase = {
                "user": user,
                "book": book,
                "quantity": quantity,
                "purchaseDate": getCurrentDate(),
                "purchaseStatus": "in-cart"
            }

            try {
                const response = await axios.post('http://localhost:8081/api/addtocart', purchase);
                console.log(response.data); // Xử lý phản hồi từ backend
                navigate('/')
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <Header />
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-md-8">
                        <div className="row mb-3">
                            <div className="col-md-5 text-center">
                                <img style={{ width: "250px" }}
                                    src={book.imageUrl === "null" ? 'https://placehold.co/225x350' : book.imageUrl}
                                    className="img-fluid mb-3"
                                    alt=""
                                />
                            </div>
                            <div className="col-md-7">
                                <h1 className="h5 d-inline me-2">
                                    {book.title}
                                </h1>
                                <span className="badge bg-success me-2">New</span>
                                <span className="badge bg-danger me-2">Hot</span>
                                <div className="mb-3">
                                    {Array.from({ length: 5 }, (_, key) => {
                                        if (key < book.rate)
                                            return (
                                                <IconStarFill className="text-warning me-1" key={key} />
                                            );
                                        else
                                            return (
                                                <IconStarFill className="text-secondary me-1" key={key} />
                                            );
                                    })}| {" "}
                                    <span className="text-muted small">
                                        {book.commentNum} Lượt đánh giá
                                    </span>
                                </div>
                                <dl className="row small mb-3">
                                    <dt className="col-sm-3">Còn hàng</dt>
                                    <dd className="col-sm-9">Trong kho</dd>
                                    <dt className="col-sm-3">Nhà cung cấp</dt>
                                    <dd className="col-sm-9">Quang Huy</dd>
                                    <dt className="col-sm-3">Thể loại:</dt>
                                    <dd className="col-sm-9">
                                        {book.category ? book.category.categoryName : 0}
                                    </dd>
                                    <dt className="col-sm-3">Đã bán</dt>
                                    <dd className="col-sm-9">
                                        {book.sold}
                                    </dd>
                                    <dt className="col-sm-3">Số trang</dt>
                                    <dd className="col-sm-9">
                                        {book.pages}
                                    </dd>
                                </dl>

                                <div className="mb-3">
                                    <span className="fw-bold h5 me-2">VND {book.price}</span>
                                    <del className="small text-muted me-2">{book.price || 0 + 10000}</del>
                                    <span className="rounded p-1 bg-warning  me-2 small">
                                        -10000
                                    </span>
                                </div>
                                <div className="mb-3">
                                    <div className="d-inline float-start me-2">
                                        <div className="input-group input-group-sm mw-140">
                                            <button name="decrease" className="btn btn-primary text-white" onClick={(e) => setQuantity(quantity >= 2 ? quantity - 1 : 1)}>
                                                <FontAwesomeIcon icon={faMinus} />
                                            </button>
                                            <input type="number" name='quantity' className="form-control" value={quantity} onChange={(e) => setQuantity(parseInt(e.currentTarget.value))} />
                                            <button name="increase" className="btn btn-primary text-white" onClick={(e) => setQuantity(quantity + 1)}>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </button>
                                        </div>
                                    </div>
                                    {
                                        book.available === 1 ? (
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-primary me-2"
                                                title="Thêm vào giỏ hàng"
                                                onClick={handleAddToCart}
                                            >
                                                <FontAwesomeIcon icon={faCartPlus} /> Thêm vào giỏ hàng
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-secondary me-2"
                                                title="Thêm vào giỏ hàng"
                                            >
                                                <FontAwesomeIcon icon={faX} /> Đã ngừng bán
                                            </button>
                                        )
                                    }

                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-secondary"
                                        title="Yêu thích"
                                    >
                                        <FontAwesomeIcon icon={faHeart} />
                                    </button>
                                </div>
                                <span className="text-danger"> {error}</span>
                                <div>
                                    <p className="fw-bold mb-2 small">
                                        Mô tả chi tiết
                                    </p>
                                    <ul className="small">
                                        <p>{book.description}</p>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <nav>
                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                        <a
                                            className="nav-link active"
                                            id="nav-randr-tab"
                                            data-bs-toggle="tab"
                                            href="#nav-randr"
                                            role="tab"
                                            aria-controls="nav-randr"
                                            aria-selected="true"
                                        >
                                            Đánh giá và bình luận
                                        </a>
                                        <div className="col-10">
                                            <div className="comment-box ml-2">
                                                <h4>Thêm một bình luận</h4>
                                                <div className="rating">
                                                    <input type="radio" name="rating" value={5} id="5" onChange={(e) => setStars(e.target.value)} checked /><label htmlFor="5">☆</label>
                                                    <input type="radio" name="rating" value={4} id="4" onChange={(e) => setStars(e.target.value)} /><label htmlFor="4">☆</label>
                                                    <input type="radio" name="rating" value={3} id="3" onChange={(e) => setStars(e.target.value)} /><label htmlFor="3">☆</label>
                                                    <input type="radio" name="rating" value={2} id="2" onChange={(e) => setStars(e.target.value)} /><label htmlFor="2">☆</label>
                                                    <input type="radio" name="rating" value={1} id="1" onChange={(e) => setStars(e.target.value)} /><label htmlFor="1">☆</label>
                                                </div>
                                                <div className="">
                                                    <textarea className="form-control" placeholder="Bạn nghĩ sao về sản phẩm của chúng tôi?" rows="4"
                                                        value={myComment} onChange={(e) => { setMyCommnet(e.target.value) }} />
                                                </div>
                                                <div className="comment-btns mt-2">
                                                    <div className="row">
                                                        <div className="col">
                                                            <div className="pull-right">
                                                                <button className="btn btn-success btn-sm" onClick={handleAddComment}>Gửi <i className="fa fa-long-arrow-right ml-1" /></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </nav>
                                <div className="tab-content p-3 small" id="nav-tabContent">
                                    <div
                                        className="tab-pane show fade active"
                                        id="nav-randr"
                                        role="tabpanel"
                                        aria-labelledby="nav-randr-tab"
                                    >
                                        {comments.map((comment) => (
                                            <UserComment
                                                key={comment.id}
                                                data={comment}
                                                user={user}
                                                fetchComments={fetchComments}
                                            />
                                        ))}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        {/* <UserRandomBooks data={getRandom}/> */}
                        <CardServices />
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserBookDetailView;
