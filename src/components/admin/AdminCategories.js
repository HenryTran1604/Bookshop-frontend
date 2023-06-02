import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

function AdminCategories() {
    const [categories, setCategories] = useState([])
    const [search, setSearch] = useState('')
    useEffect(() => {
        fetch('http://localhost:8081/api/categories')
            .then((response) => response.json())
            .then((categories) => setCategories(categories))
            .catch((err) => console.log(err))
    }, []);
    console.log(categories)
    const handleInputChange = (e) => {
        setSearch(e.target.value)
        // console.log(search)
    }

    const Delete = (id) => {
        if (window.confirm('Bạn có muốn xóa danh mục này không?')) {
            fetch('http://localhost:8081/book/delete/' + id, {
                method: 'DELETE',
                headers: {
                    "Authorization": "Bearer your_access_token"
                }
            })
            .then(response => response.json())
            .catch(err => console.log(err))
            
            window.location.href = "/categories"
        }
    }


    return (
        <>
            <div className="container-fluid" style={{ marginTop: "20px" }}>
                <div className="table-header">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Search phone" onChange={handleInputChange}/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button">Search</button>
                        </div>
                    </div>
                    <a href="category/-1" className="btn btn-success mt-2" style={{ float: "right" }}>New Cateogry</a>
                </div>
                <Table className="table table-striped table-bordered text-center">
                    <thead className="table-light">
                        <tr className="text-center">
                            <th>STT</th>
                            <th>Name</th>
                            <th>Number of books</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {console.log(categories)}
                        {
                            categories.map((category) => (
                                <tr key={category.id}>
                                    <td> {category.id}</td>
                                   
                                    <td> {category.categoryName}</td>
                                    <td> {category.bookQuantity}</td>
                                    {/* <td> <img style={{maxWidth: "200px"}} src={book.imageUrl}/></td> */}

                                    <td>
                                        <Link to={`/category/${category.id}`} className="btn btn-outline-primary mx-2">View</Link>
                                        <button className="btn btn-outline-danger" onClick={() => Delete(category.id)}>Delete</button>
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