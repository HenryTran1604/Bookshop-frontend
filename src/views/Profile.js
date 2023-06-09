import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import { Form, Button, Row } from 'react-bootstrap';
import axios from 'axios';
import Header from '../components/Header';
import { ReactComponent as IconKey } from "bootstrap-icons/icons/key.svg";
import {
    required,
    validateName,
    validateEmail,
} from "../components/helpers/validation";
import { ReactComponent as IconPersonSquareFill } from "bootstrap-icons/icons/person-lines-fill.svg";

const ProfileView = ({ onLogout, onUpdate }) => {
    const myStyle = {
        backgroundAvatar: "linear-gradient(45deg, rgb(32, 211, 254), rgb(107, 35, 167))",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        height: "100vh"
    };
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [message1, setMessage1] = useState('')
    const [message2, setMessage2] = useState('')

    const [password, setPassword] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [avatar, setAvatar] = useState(null)
    const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
    const navigate = useNavigate()
    const id = user.id

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };
    const handleLogout = () => {
        onLogout()
    }
    const checkPassword = async (tmp) => {
        try {
            const response = await fetch(`http://localhost:8081/api/login?username=${user.username}&password=${tmp}`, {
                method: 'POST',
            });
            if (response.ok) {
                return true;
            }
        } catch (error) {
            console.log(error);
        }
        return false;
    };


    const handleUpdateInfo = async (e) => {
        e.preventDefault();
        if (!(await checkPassword(password))) {
            setMessage1("Sai mật khẩu");
        } else {
            const formData = new FormData();
            if (avatarUrl !== "") formData.append("avatar", avatar);
            formData.append("id", user.id);
            formData.append("username", user.username);
            formData.append("password", password);
            formData.append("fullName", user.fullName);
            formData.append("email", user.email);
            formData.append("avatarUrl", user.avatarUrl);
            formData.append("role", user.role);
            formData.append("active", user.active);
            try {
                const response = await axios.put(
                    `http://localhost:8081/api/user/save/${id}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                if (response.status !== 200) {
                    console.log(response);
                    setMessage1("Lỗi");
                } else {
                    onUpdate(response.data);
                    navigate("/");
                }
            } catch (error) {
                console.log(error);
                setMessage1(error.response.data.message);
            }
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        if(newPassword !== confirmPassword) {
            setMessage2('Hai mật khẩu không khớp!')
        }
        else if (!(await checkPassword(oldPassword))) {
            setMessage2("Sai mật khẩu");
        } else {
            const formData = new FormData();
            if (avatarUrl !== "") formData.append("avatar", avatar);
            formData.append("id", user.id);
            formData.append("username", user.username);
            formData.append("password", newPassword);
            formData.append("fullName", user.fullName);
            formData.append("email", user.email);
            formData.append("avatarUrl", user.avatarUrl);
            formData.append("role", user.role);
            formData.append("active", user.active);
            try {
                const response = await axios.put(
                    `http://localhost:8081/api/user/save/${id}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                if (response.status !== 200) {
                    console.log(response);
                    setMessage2("Lỗi");
                } else {
                    onUpdate(response.data);
                    navigate("/");
                }
            } catch (error) {
                console.log(error);
                setMessage2(error.response.data.message);
                console.log(user);
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
        <>
            <Header />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-4">
                        <Form className={`needs-validation ${true ? "was-validated" : ""}`} onSubmit={handleUpdateInfo}>
                            <div className="card border-primary">
                                <h6 className="card-header">
                                    <IconPersonSquareFill /> Thông tin người dùng
                                </h6>
                                <img
                                    name="avatar"
                                    id='avatar'
                                    src={avatarUrl}
                                    alt="dsàdsa"
                                    className="card-img-top rounded-0 img-fluid bg-secondary"
                                />
                                <div className="card-body">
                                    <Form.Control
                                        type="file"
                                        id="avatar"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        validate={[required]}
                                    />
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <Form.Control
                                            name="fullName"
                                            type="text"
                                            placeholder="Họ và tên"
                                            value={user.fullName}
                                            validate={[required, validateName]}
                                            required={true}
                                            onChange={handleChange}
                                        />
                                    </li>
                                    <li className="list-group-item">
                                        <Form.Control
                                            name="email"
                                            type="email"
                                            placeholder="@Email"
                                            value={user.email}
                                            validate={[required, validateEmail]}
                                            required={true}
                                            onChange={handleChange}
                                        />
                                    </li>
                                    <li className="list-group-item">
                                        <Form.Control
                                            name="currentPassword"
                                            type="password"
                                            placeholder="Nhập mật khẩu"
                                            value={password}
                                            validate={[required, validateEmail]}
                                            required={true}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </li>
                                </ul>
                                <div className="card-body">
                                    <button type="submit" className="btn btn-primary">
                                        Submit
                                    </button>
                                    <span className='text-danger'>{message1}</span>
                                </div>
                            </div>
                        </Form>
                    </div>
                    <div className="col-md-8">
                        <div className="card border-info">
                            <h6 className="card-header bg-info text-white">
                                <IconKey /> Đổi mật khẩu
                            </h6>
                            <div className="card-body">
                                <form className={`needs-validation ${true ? "was-validated" : ""}`} onSubmit={handleUpdatePassword}>
                                    <Form.Group controlId="currentPassword">
                                        <Form.Label>Mật khẩu hiện tại <span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            name="oldPassword"
                                            type="password"
                                            placeholder="******"
                                            value={oldPassword}
                                            validate={[required]}
                                            required
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            className="mb-3"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="password">
                                        <Form.Label>Mật khẩu mới <span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            name="password"
                                            type="password"
                                            placeholder="******"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            validate={[required]}

                                            required
                                            className="mb-3"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="confirmPassword">
                                        <Form.Label>Xác nhận mật khẩu mới <span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            name="confirmPassword"
                                            type="password"
                                            placeholder="******"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            validate={[required]}
                                            required
                                            className="mb-3"
                                        />
                                    </Form.Group>
                                    <button type="submit" className="btn btn-info">
                                        Submit
                                    </button>
                                    <span className='text-danger'>{message2}</span>
                                </form>
                            </div>
                        </div>
                        <Button
                            type="button"
                            id="logout"
                            className="mt-2 btn btn-primary"
                            style={{ float: "right" }}
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>

        </>

    )
}
export default ProfileView