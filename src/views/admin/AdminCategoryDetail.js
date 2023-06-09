import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import { Form, Button, Row, Table } from 'react-bootstrap';
import axios from 'axios';

const AdminCategoryDetail = () => {
    const myStyle = {
        backgroundImage: "linear-gradient(45deg, rgb(32, 211, 254), rgb(107, 35, 167))",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        height: "100vh"
    };

    const [category, setCategory] = useState([])
    const [books, setBooks] = useState([])
    const [message, setMessage] = useState('')
    const { id } = useParams()
    const navigate = useNavigate()

    const fetchCategory = () => {
        fetch('http://localhost:8081/api/category/' + id)
            .then((response => response.json()))
            .then(category => {
                setCategory(category)
            })
            .then((err) => console.log(err))
    }
    const fetchBookByCategory = () => {
        fetch('http://localhost:8081/api/category/' + id + '/books')
            .then((response => response.json()))
            .then(books => {
                setBooks(books)
            })
            .then((err) => console.log(err))
    }
    useEffect(() => {
        fetchCategory()
        fetchBookByCategory()
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
        console.log(category.categoryName)
    };

    const handleAddCategory = async (e) => {
        console.log(category)

        e.preventDefault();
        try {
            let method = id < 0 ? 'POST' : 'PUT';
            const response = await axios({
                method: method,
                url: 'http://localhost:8081/api/category/save/' + id,
                data: category
            });

            console.log(response.data); // Xử lý phản hồi từ backend
            navigate("/admin/categories")
        } catch (error) {
            setMessage(error.response.data);
        }

    }


    return (
        <div style={myStyle}>
            <Link to="/admin/categories" className="btn btn-light">Back to home</Link>
            <div className="d-flex container justify-content-center">
                <div className="card w-75">
                    <div className="card-header text-center font-weight-bold">
                        <div className="information mt-3">CATEGORY DETAILS</div>
                    </div>
                    <div className="card-body bg-white">
                        <Form onSubmit={handleAddCategory}>
                            <div className="wrapper border-bottom border-dark">
                                <div className="category-detail">
                                    <Row className="d-none">
                                        {/* <Form.Control type="number" value={category.id || ''} name="categoryID" /> */}
                                    </Row>
                                    <Row>
                                        <div className="mt-3">
                                            <Form.Label>Tên danh mục <span className="text-danger">*</span></Form.Label>
                                            <Form.Control className="mb-2" type="text" name="categoryName" placeholder="Tên danh mục" value={category.categoryName || ''} onChange={handleChange} required />
                                        </div>
                                    </Row>
                                </div>

                            </div>

                            <Row className="text-right">
                                <div className="col-md-12">
                                    <Button type="submit" id="submit" className="mt-2 btn btn-primary" style={{ float: "right" }}>Save</Button>
                                    <span className='text-danger'>{message}</span>
                                </div>
                            </Row>
                        </Form>
                    </div>
                </div>

            </div>
            {
                id !== '-1' && <div className="container-fluid" style={{ marginTop: "20px" }}>
                <div className="table-header">

                </div>
                <Table className="table table-striped table-bordered text-center bg-light">
                    <thead className="table-light">
                        <tr className="text-center">
                            <th>BookID</th>
                            <th>Tên sách</th>
                            <th>Tác giả</th>
                            <th>Ngày xuất bản</th>
                            <th>Thể loại</th>
                            <th>Số trang</th>
                            {/* <th>Image</th> */}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            books.map((book) => (
                                <tr key={book.id}>
                                    <td> {book.id}</td>
                                    <td> {book.title} </td>
                                    <td >{book.author}</td>
                                    <td> {book.publicationDate}</td>
                                    <td> {book.category.categoryName}</td>
                                    <td> {book.pages}</td>
                                    {/* <td> <img style={{maxWidth: "200px"}} src={book.imageUrl}/></td> */}

                                    <td>
                                        <Link to={{
                                            pathname: `/admin/book/${book.id}`,
                                        }} className="btn btn-outline-primary mx-2">View</Link>
                                        {/* <button className="btn btn-outline-danger" onClick={() => Delete(book.id)}>Delete</button> */}
                                    </td>
                                </tr>
                            ))}

                    </tbody>

                </Table>
            </div>
            }
            
        </div>
    )
}
export default AdminCategoryDetail;