import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from './pages/Login'
import '../src/assets/css/login.css'
import AdminBookTable from './components/admin/AdminBookTable';
import AdminCategories from './components/admin/AdminCategories';
import AdminCategoryDetail from './components/admin/AdminCategoryDetail';
import AdminBookDetail from './components/admin/AdminBookDetail';

import UserBooksView from './pages/user/UserBooksView';
import UserComment from './components/user/UserComment';
import UserBookDetailView from './pages/user/UserBookDetailView';
import UserCartView from './pages/user/UserCartView';
import Profile from './components/Profile';
import Header from './components/Header';
import KMMM from './components/file';

function App() {  
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<div>loading...</div>}>
          <Routes>
            {/* For user */}
            <Route exact path='/' element={<Login />} />
            <Route path='/books' element={<UserBooksView />} />
            <Route path='/bookdetail/:id' element={<UserBookDetailView />} />
            <Route path='/cart' element={<UserCartView />} />



            {/* For admin */}
            <Route path='/admin/books' element={<AdminBookTable />} />
            <Route path='/admin/book/:id' element={<AdminBookDetail />} />
            <Route path='/admin/categories' element={<AdminCategories />} />
            <Route path='/admin/category/:id' element={<AdminCategoryDetail />} />

            {/* for testing */}
            <Route path='/rating' element={<UserComment />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/header' element={<Header />} />
            <Route path="/tmp" element={<KMMM/>} />


          </Routes>
        </Suspense>

      </BrowserRouter>
    </div>

  );
}

export default App;
