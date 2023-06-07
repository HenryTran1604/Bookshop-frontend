import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

const AdminCategories = () => {
    const [categories, setCategories] = useState([])
    const [search, setSearch] = useState('')
    const fetchCategories = () => {
        fetch('http://localhost:8081/api/categories')
            .then((response) => response.json())
            .then((categories) => setCategories(categories))
            .catch((err) => console.log(err))
    }
    useEffect(() => {
        fetchCategories()
    }, []);

    const Delete = (category) => {
        if (category.bookQuantity > 0) {
            alert("Thể loại vẫn còn sách, không thể xoá")
        }
        else {
            if (window.confirm('Bạn có muốn xóa danh mục này không?')) {
                fetch('http://localhost:8081/api/category/delete/' + category.id, {
                    method: 'DELETE',
                    headers: {
                        "Authorization": "Bearer your_access_token"
                    }
                })
                    .then(response => {
                        fetchCategories()
                    })
                    .catch(err => console.log(err))
            }
        }
    }
    
    return (
        <>
            <div className="container-fluid" style={{ marginTop: "20px" }}>
                <div className="table-header">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Tìm kiếm thể loại" onChange={(e) => setSearch(e.target.value)} />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button">Search</button>
                        </div>
                    </div>
                    <Link to="/admin/category/-1" className="btn btn-success mt-2" style={{ float: "right" }}>New Category</Link>
                </div>
                <Table className="table table-striped table-bordered text-center">
                    <thead className="table-light">
                        <tr className="text-center">
                            <th>STT</th>
                            <th>Tên thể loại</th>
                            <th>Số sách</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.filter(category => {
                                // return true
                                return category.categoryName.toLowerCase().includes(search.toLowerCase())
                            })

                            .map((category) => (
                                <tr key={category.id}>
                                    <td> {category.id}</td>

                                    <td> {category.categoryName}</td>
                                    <td> {category.bookQuantity}</td>
                                    {/* <td> <img style={{maxWidth: "200px"}} src={book.imageUrl}/></td> */}

                                    <td>
                                        <Link to={`/admin/category/${category.id}`} className="btn btn-outline-primary mx-2">View</Link>
                                        <button className="btn btn-outline-danger" onClick={() => Delete(category)}>Delete</button>
                                    </td>
                                </tr>
                            ))}

                    </tbody>

                </Table>
            </div>
        </>
    )
}
export default AdminCategories