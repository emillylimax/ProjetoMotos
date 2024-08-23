// src/components/Motos.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const Motos = () => {
    const navigate = useNavigate(); // Criar uma instância do hook useNavigate

    const handleLogout = () => {
        // Remover o token do localStorage
        localStorage.removeItem('token');

        // Redirecionar para a página de login
        navigate('/login');
    };

    return (
        <div className="motos-container">
            <h2>Motos</h2>
            {/* Adicione o conteúdo da página de motos aqui */}
            <button onClick={handleLogout}>Sair</button> {/* Botão de sair */}
        </div>
    );
};

export default Motos;
