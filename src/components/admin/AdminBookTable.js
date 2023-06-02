import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";

function BookTable() {
    const [books, setBooks] = useState([])
    const [search, setSearch] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        fetch('http://localhost:8081/api/books')
            .then((response) => response.json())
            .then((books) => setBooks(books))
            .catch((err) => console.log(err))
    }, []);
    console.log(books)
    const handleInputChange = (e) => {
        setSearch(e.target.value)
    }
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
            .then(response => response.json())
            .catch(err => console.log(err))
            window.location.href="/admin/books"
        }
    }


    return (
        <>
            <div className="container-fluid" style={{ marginTop: "20px" }}>
                <div className="table-header">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Search book by title..." onChange={handleInputChange}/>
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
                            <th>Title</th>
                            <th>Author</th>
                            <th>Publication Date</th>
                            <th>Category</th>
                            <th>Pages</th>
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
                                        <Link to = {{pathname: `/admin/book/${book.id}`,
                                                     state: {data: book}}} className="btn btn-outline-primary mx-2">View</Link>
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
export default BookTable