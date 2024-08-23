import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Motos.css';

const Motos = () => {
    const [motos, setMotos] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchMotos = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/api/motos', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setMotos(response.data);
        } catch (error) {
            console.error('Erro ao buscar motos:', error.response ? error.response.data : error.message);
            setError('Não foi possível carregar a lista de motos.');
        }
    };

    useEffect(() => {
        fetchMotos();
    }, []);

    const handleEdit = (id) => {
        navigate(`/EditarMoto/${id}`);
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:8080/api/motos/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setMotos(motos.filter(moto => moto.id !== id));
        } catch (error) {
            console.error('Erro ao deletar moto:', error.response ? error.response.data : error.message);
            setError('Não foi possível deletar a moto.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleRegister = () => {
        navigate('/CadastrarMoto');
    };

    return (
        <div className="motos-container">
            <h2>Motos</h2>
            {error && <p className="error">{error}</p>}
            {motos.length > 0 ? (
                <ul>
                    {motos.map(moto => (
                        <li key={moto.id}>
                            <div className="moto-details">
                                <div>
                                    <strong>Modelo:</strong> {moto.modelo} <br />
                                    <strong>Marca:</strong> {moto.marca} <br />
                                    <strong>Ano:</strong> {moto.ano} <br />
                                </div>
                                <div className="button-group">
                                    <button className="edit-button" onClick={() => handleEdit(moto.id)}>Editar</button>
                                    <button className="delete-button" onClick={() => handleDelete(moto.id)}>Deletar</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nenhuma moto cadastrada.</p>
            )}
            <div className="button-container">
                <button onClick={handleRegister}>Cadastrar Moto</button>
                <button onClick={handleLogout}>Sair</button>
            </div>
        </div>
    );
};

export default Motos;
