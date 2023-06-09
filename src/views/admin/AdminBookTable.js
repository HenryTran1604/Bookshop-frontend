import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";

function AdminBookTable() {
    const [books, setBooks] = useState([])
    const [search, setSearch] = useState('')
    const fetchBooks = () => {
        fetch('http://localhost:8081/api/books')
            .then((response) => response.json())
            .then((books) => setBooks(books))
            .catch((err) => console.log(err))
    }
    useEffect(() => {
        fetchBooks()
    }, []);
    const handleSearch = () => {
        if (search !== '') {
            console.log('http://localhost:8081/api/book/search?key=' + `${search}`)
            fetch('http://localhost:8081/api/book/search?key=' + search)
                .then((response) => response.json())
                .then((books) => {
                    setBooks(books)
                    console.log(books)
                })
                .catch((err) => console.log(err))
        }
    }

    const Delete = (id) => {
        if (window.confirm('Bạn có muốn xóa sản phẩm này không?')) {
            fetch('http://localhost:8081/api/book/delete/' + id, {
                method: 'DELETE',
                headers: {
                    "Authorization": "Bearer your_access_token"
                }
            })
                .then(response => {
                    if (response.ok) {
                        fetchBooks();
                    } else {
                        console.error('Failed to delete book');
                    }
                })
                .catch(err => console.log(err))
        }
    }


    return (
        <>
        <Header/>
            <div className="container-fluid" style={{ marginTop: "20px" }}>
                <div className="table-header">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Search book by title..." onChange={(e) => setSearch(e.target.value)} />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>Search</button>
                        </div>
                    </div>
                    <Link to="/admin/book/-1" className="btn btn-success mt-2" style={{ float: "right" }}>New Book</Link>
                </div>
                <Table className="table table-striped table-bordered text-center">
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
                            books.filter(book => {
                                // return true
                                return book.title.toLowerCase().includes(search.toLowerCase())
                            }).map((book) => (
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
                                        <button className="btn btn-outline-danger" onClick={() => Delete(book.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}

                    </tbody>

                </Table>
            </div>
        </>
    )
}
export default AdminBookTable