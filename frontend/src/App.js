import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminRouter from '@/pages/Admin/AdminRouter';
import AuthRouter from '@/pages/Admin/Auth/AuthRouter';
import AuthGuard from '@/pages/Admin/Auth/AuthGuard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/admin/*' element={<AuthGuard><AdminRouter /></AuthGuard> } />
          <Route path='/*' element={<AuthGuard><AdminRouter /></AuthGuard>}/>
           <Route path='/auth/*' element={<AuthRouter />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
