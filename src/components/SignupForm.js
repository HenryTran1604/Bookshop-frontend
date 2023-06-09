import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { validateName, validateEmail } from "./helpers/validation";

const SignUpForm = () => {
    const navigate = useNavigate()
    const [fullName, setFullName] = useState('')
    const [fullNameError, setFullNameError] = useState('')

    const [username, setUsername] = useState('')
    const [usernameError, setUsernameError] = useState('')

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [checkPassword, setCheckPassword] = useState('')

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')

    const [responseMess, setResponseMess] = useState('')

    const handleAddUser = async (e) => {
        e.preventDefault();
        let err = false;

        if (validateName(username)) {
            setUsernameError("Username không chứa kí tự đặc biệt và dấu cách");
            err = true;
        } else {
            setUsernameError('');
        }

        if (validateEmail(email)) {
            setEmailError('Email không hợp lệ!');
            err = true;
        } else {
            setEmailError('');
        }

        if (password !== confirmPassword) {
            setCheckPassword('Hai mật khẩu không trùng khớp!');
            err = true;
        } else {
            setCheckPassword('');
        }

        if (!err) {
            const formData = new FormData();
            formData.append('id', -1);
            formData.append('username', username);
            formData.append('password', password);
            formData.append('fullName', fullName);
            formData.append('email', email);
            formData.append('avatarUrl', '');
            formData.append('role', 'user');
            formData.append('active', true);

            try {
                const response = await axios.post(
                    'http://localhost:8081/api/user/save/-1',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );
                if (!response.status === 200) {
                    const errorMessage = response.data.message;
                } else {
                    navigate("/login");
                }
            } catch (error) {
                console.log(error);
                setResponseMess(error.response?.data?.message);
            }
        }
    };

    return (
        <>
            <Form className="login-form border-right-0">
                <Form.Group className="form-group">
                    <Form.Label htmlFor="fullName">Họ và tên <span className="text-danger">*</span></Form.Label>
                    <Form.Control type="text" placeholder="Nhập họ và tên" name="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                    <span className="text-danger">{fullNameError}</span>
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label htmlFor="password">Username <span className="text-danger">*</span></Form.Label>
                    <Form.Control type="text" placeholder="Username" name="password" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <span className="text-danger">{usernameError}</span>
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label htmlFor="password">Password <span className="text-danger">*</span></Form.Label>
                    <Form.Control type="password" placeholder="*****" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label htmlFor="confirmPassword">Confirm password <span className="text-danger">*</span></Form.Label>
                    <Form.Control type="password" placeholder="*****" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    <span className="text-danger">{checkPassword}</span>
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label htmlFor="email">Email <span className="text-danger">*</span></Form.Label>
                    <Form.Control type="email" placeholder="@" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <span className="text-danger">{emailError}</span>
                </Form.Group>
                <Form.Group>
                    <span className="text-danger"></span>
                    <Link to='/'>Về đăng nhập</Link>
                    <span className="text-danger">{responseMess}</span>
                    <button type="submit" className="btn btn-login" onClick={handleAddUser}>Đăng kí!</button>
                </Form.Group>

            </Form>
        </>

    );
};

export default SignUpForm;
