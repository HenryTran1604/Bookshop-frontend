import React, { useState, useEffect } from 'react'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import { Form, Button, Row } from 'react-bootstrap';
import axios from 'axios';

const Profile = () => {
    const myStyle = {
        backgroundAvatar: "linear-gradient(45deg, rgb(32, 211, 254), rgb(107, 35, 167))",
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
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')))
    const [message, setMessage] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [avatar, setAvatar] = useState(null)
    const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
    const navigate = useNavigate()
    const id = user.id

    if (user === null) {
        navigate("/")
    }


    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };
    const handleLogout = () => {
        sessionStorage.removeItem('user');
        navigate('/')
    }
    const checkPassword = async () => {
        try {
          const response = await fetch(`http://localhost:8081/api/login?username=${user.username}&password=${oldPassword}`, {
            method: 'POST',
          });
          const data = await response.json();
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      };
      
    const handleUpdateUser = async (e) => {
        e.preventDefault()
        if (newPassword !== confirmedPassword) {
            setMessage("2 mật khẩu không khớp")
        }
        else if(!checkPassword()) {
            setMessage('Sai mật khẩu')
        }
        else {
            const formData = new FormData();
            if (avatarUrl !== '') formData.append('avatar', avatar);
            formData.append('id', user.id);
            formData.append('username', user.username)
            formData.append('password', newPassword);
            formData.append('fullName', user.fullName);
            formData.append('email', user.email);
            formData.append('avatarUrl', user.avatarUrl);
            formData.append('role', user.role);
            formData.append('active', user.active);
            try {
                const response = await axios.put(
                    'http://localhost:8081/api/user/save/' + id,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );
                sessionStorage.removeItem('user')
                sessionStorage.setItem('user', JSON.stringify(user))
                navigate("/books");
            } catch (error) {
                // setMessage(error.response.data);
                console.log(message);
                console.log(user)
            }

        }


    }

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        const filename = file.name;
        console.log(filename)
        const reader = new FileReader();

        setAvatar(file)

        reader.onloadend = () => {
            setAvatarUrl(reader.result);
            setUser((prevUser) => ({
                ...prevUser,
                avatarUrl: filename,
            }));
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <div style={myStyle}>
            <Link to="/books" className="btn btn-light">Back to home</Link>
            <div className="d-flex container justify-content-center">
                <div className="card w-75">
                    <div className="card-header text-center font-weight-bold">
                        <div className="information mt-3">USER DETAILS</div>
                    </div>
                    <div className="card-body bg-white">
                        <Form onSubmit={handleUpdateUser} encType="multipart/form-data">
                            <div className="wrapper border-bottom border-dark d-flex justify-content-between">
                                <div className="user-detail col-md-6">
                                    <Row>
                                        <Form.Group className="mt-3">
                                            <Form.Label>Username <span className="text-danger">*</span></Form.Label>
                                            <Form.Control type="text" name="fullName" placeholder="Nhập họ và tên" value={user.username} readOnly/>
                                        </Form.Group>

                                    </Row>
                                    <Row>
                                        <Form.Group className="mt-3">
                                            <Form.Label>Họ và tên <span className="text-danger">*</span></Form.Label>
                                            <Form.Control type="text" name="fullName" placeholder="Nhập họ và tên" value={user.fullName} onChange={handleChange} required />
                                        </Form.Group>

                                    </Row>
                                    <Row>
                                        <Form.Group className="mt-3">
                                            <Form.Label>Mật khẩu cũ<span className="text-danger">*</span></Form.Label>
                                            <Form.Control type="password" name="password" value={oldPassword} placeholder="Nhập mật khẩu" onChange={(e) => setOldPassword(e.target.value)} required />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group className="mt-3">
                                            <Form.Label>Mật khẩu mới<span className="text-danger">*</span></Form.Label>
                                            <Form.Control type="password" name="password" value={newPassword} placeholder="Nhập mật khẩu" onChange={(e) => setNewPassword(e.target.value)} required />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group className="mt-3">
                                            <Form.Label>Xác nhận lại mật khẩu<span className="text-danger">*</span></Form.Label>
                                            <Form.Control type="password" name="confirmed-password" valur={confirmedPassword} placeholder="Nhập lại mật khẩu" onChange={(e) => setConfirmedPassword(e.target.value)} required />
                                        </Form.Group>
                                    </Row>

                                    <Row>
                                        <Form.Group className="mt-3 mb-3">
                                            <Form.Label>Email<span className="text-danger">*</span></Form.Label>
                                            <Form.Control type="email" name="email" value={user.email} onChange={handleChange} required />
                                        </Form.Group>
                                    </Row>

                                </div>

                                <div className="user-detail col-md-6">
                                    <div className="avatar-container d-flex flex-column align-items-center">
                                        <Form.Label htmlFor="avatar" className="btn btn-dark" style={{ cursor: "pointer" }}>
                                            Upload
                                        </Form.Label>
                                        <br />
                                        <Form.Control
                                            type="file"
                                            id="avatar"
                                            name="avatar"
                                            accept="image/*"
                                            className="d-none"
                                            onChange={handleAvatarChange}
                                        />
                                        {avatarUrl && (
                                            <img
                                                id="previewAvatar"
                                                src={avatarUrl}
                                                alt="Preview"
                                                style={{ maxWidth: "200px" }}
                                            />
                                        )}
                                    </div>
                                </div>

                            </div>

                            <Row className="text-right">
                                <div className="col-md-12">
                                    <Button type="submit" id="update" className="mt-2 btn btn-primary">Update</Button>
                                    <span style={duplicated}>{message}</span>
                                    <Button type="button" id="logout" className="mt-2 btn btn-primary" style={{ float: "right" }} onClick={handleLogout}>Logout</Button>

                                </div>

                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile