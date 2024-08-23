// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate corretamente
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate(); // Criar uma instância do hook useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/auth/login', {
                email,
                password
            });

            // Armazenar o token (por exemplo, em localStorage)
            localStorage.setItem('token', response.data.token);

            // Redirecionar para a página /motos após o login bem-sucedido
            console.log('Login successful:', response.data);
            navigate('/motos'); // Usar navigate para redirecionar

        } catch (error) {
            console.error('Error during login:', error.response ? error.response.data : error.message);
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
                <button type="button" onClick={() => navigate('/register')}>Cadastrar</button> {/* Botão de cadastro */}
            </form>
        </div>
    );
};

export default Login;
