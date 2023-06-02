import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from './pages/Login'
import '../src/assets/css/login.css'
import Books from './components/admin/AdminBookTable';
import Book from './components/admin/AdminBookDetail';
import AdminCategories from './components/admin/AdminCategories';
import UserBooksView from './pages/user/UserBooksView';
import AdminCategoryDetail from './components/admin/AdminCategoryDetail';
import UserRatingsReviews from './components/user/UserComment';
import UserBookDetail from './pages/user/UserBookDetailView';
import AdminBookDetail from './components/admin/AdminBookDetail';
import tmp from './components/tmp'
import UserCart from './components/user/UserCart';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<div>loading...</div>}>
          <Routes>
            {/* For user */}
            <Route exact path='/' element={<Login />} />
            <Route path='/books' element={<UserBooksView />} />
            <Route path='/bookdetail/:id' element={<UserBookDetail />} />



            {/* For admin */}
            <Route path='/admin/books' element={<Books />} />
            <Route path='/admin/book/:id' element={<Book />} />
            <Route path='/admin/categories' element={<AdminCategories />} />
            <Route path='/admin/category/:id' element={<AdminCategoryDetail />} />
            <Route path='/rating' element={<UserRatingsReviews />} />

            {/* for testing */}
            <Route path='/tmp' element={<tmp />} />
            <Route path='/cart' element={<UserCart />} />


          </Routes>
        </Suspense>

      </BrowserRouter>
    </div>

  );
}

export default App;
