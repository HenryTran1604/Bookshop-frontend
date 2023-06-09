import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"

import LoginView from './views/Login'
import '../src/assets/css/login.css'
import AdminBookTable from './views/admin/AdminBookTable';
import AdminCategories from './views/admin/AdminCategories';
import AdminCategoryDetail from './views/admin/AdminCategoryDetail';
import AdminBookDetail from './views/admin/AdminBookDetail';
import AdminUsersTable from './views/admin/AdminUsersTable';

import UserBooksView from './views/user/UserBooks';
import UserBookDetailView from './views/user/UserBookDetail'
import UserCartView from './views/user/UserCart';
import UserOrderView from './views/user/UserOrder';
import ProfileView from './views/Profile';
import SignupView from './views/Signup';
import NotFound from './views/404';
import UserFilterBooksView from './views/user/UserFilterBooks';


function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
  };
  const handleUpdate = (updatedUser) => {
    setUser(updatedUser);
    localStorage.removeItem('user')
    localStorage.setItem('user', JSON.stringify(updatedUser));
  }

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <div className="App">
      <BrowserRouter>
        <React.Fragment>
          <Suspense fallback={<div>loading...</div>}>
            <Routes>
              {
                user !== null ? (
                  <>
                    <Route path='/' element={<UserBooksView />} />
                    <Route path='/bookdetail/:id' element={<UserBookDetailView />} />
                    <Route path='/cart' element={<UserCartView />} />
                    <Route path='/profile' element={<ProfileView onLogout={handleLogout} onUpdate={handleUpdate} />} />
                    <Route path="/order" element={<UserOrderView />} />
                    <Route path='/category/:id/books' element={<UserFilterBooksView/>}/>
                    {
                      user.role === 'admin' && (
                        <>
                          <Route path='/admin/books' element={<AdminBookTable />} />
                          <Route path='/admin/book/:id' element={<AdminBookDetail />} />
                          <Route path='/admin/categories' element={<AdminCategories />} />
                          <Route path='/admin/category/:id' element={<AdminCategoryDetail />} />
                          <Route path='/admin/users' element={<AdminUsersTable/>} />
                        </>
                      )
                    }
                    <Route exact path='/*' element={<NotFound />} />
                  </>

                ) : (
                  <>
                    <Route exact path='/*' element={<LoginView onLogin={handleLogin} />} />
                    <Route exact path='/signup' element={<SignupView />} />
                  </>

                )
              }


            </Routes>
          </Suspense>
        </React.Fragment>


      </BrowserRouter>
    </div>

  );
}

export default App;
