import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CadastrarMoto.css';

const RegisterMoto = () => {
    const [modelo, setModelo] = useState('');
    const [marca, setMarca] = useState('');
    const [ano, setAno] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            console.log('Enviando dados:', { modelo, marca, ano });

            const response = await axios.post('http://localhost:8080/api/motos', {
                modelo,
                marca,
                ano
            }, {
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            });

            console.log('Moto cadastrada com sucesso:', response.data);
            navigate('/motos');

        } catch (error) {
            console.error('Erro ao cadastrar moto:', error.response ? error.response.data : error.message);
            setError('Falha no cadastro. Verifique os dados informados.');
        }
    };

    return (
        <div className="register-container">
            <h2>Cadastrar Moto</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="modelo">Modelo:</label>
                    <input
                        type="text"
                        id="modelo"
                        value={modelo}
                        onChange={(e) => setModelo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="marca">Marca:</label>
                    <input
                        type="text"
                        id="marca"
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="ano">Ano:</label>
                    <input
                        type="number"
                        id="ano"
                        value={ano}
                        onChange={(e) => setAno(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <div className="button-container">
                    <button type="submit">Cadastrar</button>
                    <button type="button" onClick={() => navigate('/motos')}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default RegisterMoto;
