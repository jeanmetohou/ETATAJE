import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Error from '@/_Utils/Error';

const AuthRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='login' element={<Login />} />
            <Route path='/*' element={<Error />} />
        </Routes>
    );
};

export default AuthRouter;
