import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Row } from 'react-bootstrap';
import axios from 'axios';

const AdminBookDetail = () => {
  const myStyle = {
    backgroundImage: "linear-gradient(45deg, rgb(32, 211, 254), rgb(107, 35, 167))",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    height: "100vh"
  };
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({});
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [disabled, setDisabled] = useState(id !== '-1');
  const [buttonValue, setButtonValue] = useState('Edit');

  useEffect(() => {
    fetchBook();
    fetchCategories();
  }, []);

  const fetchBook = () => {
    fetch('http://localhost:8081/api/book/' + id)
      .then((response => response.json()))
      .then(book => {
        setBook(book);
        setImageUrl(book.imageUrl);
      })
      .catch((err) => console.log(err));
  };

  const fetchCategories = () => {
    fetch('http://localhost:8081/api/categories')
      .then(response => response.json())
      .then(categories => setCategories(categories))
      .catch(err => console.log(err));
  };

  const handleChange = event => {
    const { name, value } = event.target;
    if (name === "category") {
      const selectedCategoryId = parseInt(value);
      const selectedCategory = categories.find(category => category.id === selectedCategoryId);
      setBook(prevBook => ({
        ...prevBook,
        category: selectedCategory,
      }));
    } else {
      setBook(prevBook => ({ ...prevBook, [name]: value }));
    }
  };

  const toggleEdit = () => {
    if (disabled) {
      setButtonValue("Save");
      setDisabled(false);
    } else {
      handleAddBook();
    }
  };

  const handleAddBook = async () => {
    const formData = new FormData();
    if (image) formData.append('image', image);
    formData.append('id', book.id);
    formData.append('title', book.title);
    formData.append('author', book.author);
    formData.append('categoryId', book.category.id);
    formData.append('publicationDate', book.publicationDate);
    formData.append('pages', book.pages);
    formData.append('price', book.price);
    formData.append('imageUrl', book.imageUrl);
    formData.append('description', book.description);

    try {
      const method = id < 0 ? 'POST' : 'PUT';
      const response = await axios({
        method: method,
        url: `http://localhost:8081/api/book/save/${id}`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);
      navigate("/admin/books");
    } catch (error) {
      setMessage(error.response.data);
      console.log(message);
    }
  };

  const handleImageChange = event => {
    const file = event.target.files[0];
    const filename = file.name;
    const reader = new FileReader();

    setImage(file);
    reader.onloadend = () => {
      setImageUrl(reader.result);
      setBook(prevBook => ({
        ...prevBook,
        imageUrl: filename,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={myStyle}>
      <Link to="/admin/books" className="btn btn-light">Back to home</Link>
      <div className="d-flex container justify-content-center">
        <div className="card w-75">
          <div className="card-header text-center font-weight-bold">
            <div className="information mt-3">CHI TIẾT SÁCH</div>
          </div>
          <div className="card-body bg-white">
            <Form encType="multipart/form-data">
              <div className="wrapper border-bottom border-dark d-flex justify-content-between">
                <div className="book-detail">
                  <Row className="d-none">
                    {/* <Form.Control type="number" value={book.id || ''} name="bookID" /> */}
                  </Row>
                  <Row>
                    <Form.Group className="col-md-6 mt-3">
                      <Form.Label>Tiêu đề <span className="text-danger">*</span></Form.Label>
                      <Form.Control type="text" name="title" placeholder="Tên sách" value={book.title || ''} disabled={disabled} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="col-md-6  mt-3">
                      <Form.Label>Tác giả <span className="text-danger">*</span></Form.Label>
                      <Form.Control type="text" name="author" placeholder="Tác giả" value={book.author || ''} disabled={disabled} onChange={handleChange} required />
                    </Form.Group>
                  </Row>
                  <Form.Group className='mt-3'>
                    <Form.Label>Mô tả sách</Form.Label>
                    <Form.Control as="textarea" name="description" rows={5} value={book.description || ''} disabled={disabled} onChange={handleChange} />
                  </Form.Group>
                  <Row>
                    <Form.Group className="col-md-6  mt-3">
                      <Form.Label>Ngày phát hành <span className="text-danger">*</span></Form.Label>
                      <Form.Control type="date" name="publicationDate" value={book.publicationDate || ''} disabled={disabled} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="col-md-6 mt-3">
                      <Form.Label>Số trang</Form.Label>
                      <Form.Control type="number" name="pages" value={book.pages || ''} disabled={disabled} onChange={handleChange} />
                    </Form.Group>
                  </Row>
                  <Form.Group className=' mb-3'>
                    <Form.Group className="col-md-6 mt-3">
                      <Form.Label>Thể loại</Form.Label>
                      <Form.Select as="select" name="category" value={book.category ? book.category.id : 0} disabled={disabled} onChange={handleChange}>
                      <option value={null}>Chọn thể loại</option>
                        {categories.map((category, index) => (
                          <option key={category.id} value={category.id}>
                            {category.categoryName}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Form.Group>
                </div>

                <div className="book-detail col-md-6">
                  <div className="image-container d-flex flex-column align-items-center">
                    <Form.Label htmlFor="image" className="btn btn-dark" style={{ cursor: "pointer" }}>
                      Upload
                    </Form.Label>
                    <br />
                    <Form.Control
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      className="d-none"
                      disabled={disabled}
                      onChange={handleImageChange}
                    />
                    {imageUrl && (
                      <img
                        id="previewImage"
                        src={imageUrl}
                        alt="Preview"
                        style={{ maxWidth: "200px" }}
                      />
                    )}
                  </div>
                </div>

              </div>

              <Row className="text-right">
                <div className="col-md-12">
                  {id === '-1' ? (
                    <Button type="button" id="submit" onClick={toggleEdit} className="mt-2 btn btn-primary" style={{ float: "right" }}>Add</Button>
                  ) : (
                      <Button type="button" onClick={toggleEdit} className="mt-2 btn btn-primary" style={{ float: "right" }}>{buttonValue}</Button>
                    )}
                  <span className='text-danger'>{message}</span>
                </div>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBookDetail;
