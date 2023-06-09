import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";

function AdminUsersTable() {
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState('')
    const fetchUsers = () => {
        fetch('http://localhost:8081/api/users', {
            method: 'POST'
        })
            .then((response) => response.json())
            .then((users) => setUsers(users))
            .catch((err) => console.log(err))
    }
    useEffect(() => {
        fetchUsers()
    }, []);

    return (
        <>
            <Header />
            <div className="container-fluid" style={{ marginTop: "20px" }}>
                <div className="table-header">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Search book by title..." onChange={(e) => setSearch(e.target.value)} />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button">Search</button>
                        </div>
                    </div>
                </div>
                <Table className="table table-striped table-bordered text-center">
                    <thead className="table-light">
                        <tr className="text-center">
                            <th>UserID</th>
                            <th>Username</th>
                            <th>Họ và tên</th>
                            <th>Email</th>
                            <th>Vai trò</th>
                            {/* <th>Image</th> */}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.filter(user => {
                                // return true
                                return user.username.toLowerCase().includes(search.toLowerCase())
                            }).map((user) => (
                                <tr key={user.id}>
                                    <td> {user.id}</td>
                                    <td> {user.username} </td>
                                    <td> {user.fullName}</td>
                                    <td> {user.email}</td>
                                    <td> {user.role}</td>
                                    {/* <td> <img style={{maxWidth: "200px"}} src={book.imageUrl}/></td> */}

                                    <td>
                                        <Link to='#' className="btn btn-outline-primary mx-2">View</Link>
                                    </td>
                                </tr>
                            ))}

                    </tbody>

                </Table>
            </div>
        </>
    )
}
export default AdminUsersTable