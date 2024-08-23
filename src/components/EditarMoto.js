import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './CadastrarMoto.css';

const EditarMoto = () => {
    const { id } = useParams();
    const [modelo, setModelo] = useState('');
    const [marca, setMarca] = useState('');
    const [ano, setAno] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const fetchMoto = useCallback(async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`http://localhost:8080/api/motos/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const { modelo, marca, ano } = response.data;
            setModelo(modelo);
            setMarca(marca);
            setAno(ano);
        } catch (error) {
            console.error('Erro ao buscar moto:', error.response ? error.response.data : error.message);
            setError('Não foi possível carregar os dados da moto.');
        }
    }, [id]);

    useEffect(() => {
        fetchMoto();
    }, [fetchMoto]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await axios.put(`http://localhost:8080/api/motos/${id}`, {
                modelo,
                marca,
                ano
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('Moto atualizada com sucesso:', response.data);
            navigate('/motos');
        } catch (error) {
            console.error('Erro ao atualizar moto:', error.response ? error.response.data : error.message);
            setError('Falha na atualização. Verifique os dados informados.');
        }
    };

    return (
        <div className="register-container">
            <h2>Editar Moto</h2>
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
                    <button type="submit">Atualizar</button>
                    <button type="button" onClick={() => navigate('/motos')}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default EditarMoto;
