import React from 'react';
import { useNavigate } from 'react-router-dom';

const Motos = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');

        navigate('/login');
    };

    return (
        <div className="motos-container">
            <h2>Motos</h2>
            {/* Adicione o conteúdo da página de motos aqui */}
            <button onClick={handleLogout}>Sair</button> {}
        </div>
    );
};

export default Motos;
