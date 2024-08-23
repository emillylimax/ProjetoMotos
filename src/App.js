import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Motos from './components/Motos';
import CadastrarMoto from './components/CadastrarMoto';
import EditarMoto from './components/EditarMoto'; 
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/motos"
                        element={<PrivateRoute element={<Motos />} />}
                    />
                    <Route
                        path="/cadastrarMoto"
                        element={<PrivateRoute element={<CadastrarMoto />} />}
                    />
                    <Route
                        path="/editarMoto/:id" 
                        element={<PrivateRoute element={<EditarMoto />} />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
