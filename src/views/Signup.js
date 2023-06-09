import React, { useState } from "react";
import { Form, Container, Row } from "react-bootstrap";

import SignupForm from "../components/SignupForm";

const SignupView = () => {

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
                    <a className="nav-link pl-lg-0" href="/">Home <span className="sr-only">(current)</span></a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="login"> About</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="contact.html">Contact Us</a>
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

        <section className="register_section">
          <Container>
            <Row>
              <div className="container my-3 bg-light">
                <div className="row border">
                  <div className="col-md-6 d-flex flex-column justify-content-center">
                    <img src="/static/web-images/slider-img.png" alt="..." className="img-fluid" />
                  </div>
                  <div className="col-md-6 p-3">
                    <h4 className="text-center">Đăng kí tài khoản</h4>
                    <SignupForm />
                  </div>
                </div>
              </div>
            </Row>
          </Container>
        </section>
      </div>

    </>

  );
};

export default SignupView;
