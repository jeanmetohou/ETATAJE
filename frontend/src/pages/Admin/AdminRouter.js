import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/pages/Admin/Layout';
import UsersList from '@/pages/Admin/Users/List';
import AddUser from '@/pages/Admin//Users/Add';
import EditUser from '@/pages/Admin//Users/Edit';
import UserDetails from '@/pages/Admin//Users/Details';
import Error from '@/_Utils/Error';
import EtatList from '@/pages/Admin/Etat/List'
import AddEtat from '@/pages/Admin/Etat/Add'
import EditEtat from '@/pages/Admin/Etat/Edit'
import EtatDetails from '@/pages/Admin/Etat/Details'
// import AuthGuard from '@/pages/Admin/Auth/AuthGuard';

const AdminRouter = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path='' element={<UsersList />} />
                <Route path='user'>
                    <Route path='' element={<UsersList />} />
                    <Route path='list' element={<UsersList />} />
                    <Route path='add' element={<AddUser />} />
                    <Route path='edit/:uid' element={<EditUser />} />
                    <Route path='details/' element={<UserDetails />} />
                </Route>
                <Route path='etat'>
                    <Route path='' element={<EtatList />} />
                    <Route path='list' element={<EtatList />} />
                    <Route path='add' element={<AddEtat />} />
                    <Route path='edit/:uid' element={<EditEtat />} />
                    <Route path='details/:uid' element={<EtatDetails />} />
                </Route>
                <Route path='*' element={<Error />} />
            </Route>
        </Routes>

    );
};

export default AdminRouter;