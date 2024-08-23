// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Motos from './components/Motos';
import PrivateRoute from './components/PrivateRoute'; // Importar PrivateRoute

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
                </Routes>
            </div>
        </Router>
    );
}

export default App;
