import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import { Form, Button, Row } from 'react-bootstrap';
import axios from 'axios';

const AdminCategoryDetail = () => {
    const myStyle = {
        backgroundImage: "linear-gradient(45deg, rgb(32, 211, 254), rgb(107, 35, 167))",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        height: "100vh"
    };
    const duplicated = {
        color: "red",
        textAlign: "right",
        marginTop: "10px",
        lineHeight: "48px",
        paddingRight: "10px"
    }

    const [category, setCategory] = useState([])
    const [message, setMessage] = useState('')
    const [image, setImage] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()

    // console.log(id)
    useEffect(() => {
        fetch('http://localhost:8081/api/category/' + id)
            .then((response => response.json()))
            .then(category => {
                setCategory(category)
            })
            .then((err) => console.log(err))
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
                                            <Form.Control className = "mb-2" type="text" name="categoryName" placeholder="Tên danh mục" value={category.categoryName || ''} onChange={handleChange} required />
                                        </div>
                                    </Row>
                                </div>

                            </div>

                            <Row className="text-right">
                                <div className="col-md-12">
                                    <Button type="submit" id="submit" className="mt-2 btn btn-primary" style={{ float: "right" }}>Save</Button>
                                    <span style={duplicated}>{message}</span>
                                </div>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AdminCategoryDetail;