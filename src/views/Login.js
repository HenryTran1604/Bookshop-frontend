import React, { useState } from "react"
import { Form, Row, Container } from "react-bootstrap";
import '../assets/css/login.css'
import '../assets/css/responsive.css'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';


function LoginView({onLogin}) {
    const user = localStorage.getItem('user')
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const wrapper = { 
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "15px 20px 0px rgba(0, 0, 0, 0.1)"
    };

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await axios({
              method: 'POST',
              url: `http://localhost:8081/api/login?username=${username}&password=${password}`,
            });
          
            const user = response.data; // Xử lý phản hồi từ backend
            onLogin(user)
            // console.log(user)
            navigate("/")
          } catch (error) {
            setMessage("Tài khoản hoặc mật khẩu không chính xác");
            console.log(message)
          }
        
    }

    return (
        <>
            <div className="hero_area">
                <header className="header_section">
                    <div className="container-fluid">
                        <nav className="navbar navbar-expand-lg custom_nav-container ">
                            <a className="navbar-brand" href="/">
                                <span>
                                    Bookshop
                                </span>
                            </a>

                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className=""> </span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav">
                                    <li className="nav-item active">
                                        <Link className="nav-link pl-lg-0" to="/">Home <span className="sr-only">(current)</span></Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="login"> About</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="">Contact Us</Link>
                                    </li>
                                </ul>
                                <Form className="search_form">
                                    <input type="text" className="form-control" placeholder="Search here..." />
                                    <button className="" type="submit">
                                        <i className="fa fa-search" aria-hidden="true"></i>
                                    </button>
                                </Form>
                            </div>
                        </nav>
                    </div>
                </header>

                <section className="login-block">
                    <Container style={wrapper}>
                        <Row>
                            <div className="col-md-5 login-sec">
                                <h2 className="text-center">Login Now</h2>
                                <Form className="login-form border-right-0">
                                    <Form.Group className="form-group">
                                        <Form.Label htmlFor="exampleForm.ControlEmail1" className="text-uppercase">Username</Form.Label>
                                        <Form.Control type="text" placeholder="" name="username" value={username} onChange={(e) => {setUsername(e.target.value)}} required/>
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                        <Form.Label htmlFor="exampleForm.ControlPassword1" className="text-uppercase">Password</Form.Label>
                                        <Form.Control type="password" placeholder="" name="password" value={password} onChange={(e) => {setPassword(e.target.value)}} required/>
                                    </Form.Group>

                                    <Form.Check>
                                        <Form.Check.Label>
                                            <Form.Check.Input />
                                            <small>Remember Me</small>
                                        </Form.Check.Label>
                                    </Form.Check>
                                    <Form.Group>
                                        <span className="text-danger">{message}</span>
                                        <button type="submit" className="btn btn-login" onClick={handleLogin}>Submit</button>
                                    </Form.Group>

                                </Form>
                                <div className="copy-text">Created with <i className="fa fa-heart"></i> by <a
                                    href="http://github.com/henrytran1604">Quang Huy</a>
                                </div>
                                <div className="register-btn">
                                    <div className="detail-box">
                                        <Link to="/signup">Don't have account?</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7 d-flex flex-column justify-content-center">
                                <img className="d-block img-fluid" src="/static/web-images/slider-img.png" alt="First slide" />
                            </div>
                        </Row>
                    </Container>
                </section>
            </div>
            <section className="about_section layout_padding">
                <div className="container ">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="img-box">
                                <img src="/static/web-images/about-img.png" alt="" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="detail-box">
                                <div className="heading_container">
                                    <h2>
                                        About Our Bookstore
                                    </h2>
                                </div>
                                <p>
                                    At cumque tenetur iste molestiae, vel eum reiciendis assumenda! Numquam, repudiandae. Consequuntur
                                    obcaecati recusandae aliquam, amet doloribus eius dolores officiis cumque? Quibusdam praesentium pariatur
                                    sapiente mollitia, amet hic iusto voluptas! Iusto quo earum vitae excepturi, ipsam aliquid deleniti
                                    assumenda culpa deserunt.
                                </p>
                                <Link href="#">
                                    Read More
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="info_section layout_padding2">
                <div className="container" style={{ backgroundColor: "#063547", boxShadow: "none" }}>
                    <div className="row">
                        <div className="col-md-6 col-lg-4 info-col">
                            <div className="info_detail">
                                <h4>
                                    About Us
                                </h4>
                                <p>
                                    Vitae aut explicabo fugit facere alias distinctio, exem commodi mollitia minusem dignissimos atque
                                    asperiores incidunt vel voluptate iste
                                </p>
                                <div className="info_social">
                                    <a href="">
                                        <i className="fa fa-facebook" aria-hidden="true"></i>
                                    </a>
                                    <a href="">
                                        <i className="fa fa-twitter" aria-hidden="true"></i>
                                    </a>
                                    <a href="">
                                        <i className="fa fa-linkedin" aria-hidden="true"></i>
                                    </a>
                                    <a href="">
                                        <i className="fa fa-instagram" aria-hidden="true"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 info-col">
                            <div className="info_contact">
                                <h4>Address</h4>
                                <div className="contact_link_box">
                                    <a href="">
                                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                                        <span>Location</span>
                                    </a>
                                    <a href="">
                                        <i className="fa fa-phone" aria-hidden="true"></i>
                                        <span> Call +01 1234567890</span>
                                    </a>
                                    <a href="">
                                        <i className="fa fa-envelope" aria-hidden="true"></i>
                                        <span>demo@gmail.com</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 info-col">
                            <div className="info_contact">
                                <h4>Newsletter</h4>
                                <Form action="#">
                                    <input type="text" placeholder="Enter email" />
                                    <button type="submit">Subscribe</button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>

    )
}
export default LoginView