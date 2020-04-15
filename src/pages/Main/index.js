// add localStorage feature

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import api from '../../services/api';
import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';

export default function Main() {
    const [newRepo, setNewRepo] = useState('');
    const [repositories, setRepositories] = useState([]);
    const [clearInput] = useState([]);
    const [loading, setLoading] = useState(false);

    /* useEffect(() => {
        repositories(localStorage.getItem('repositories'));

        if (repositories) {
            setRepositories(JSON.parse(repositories));
        }
    }, [repositories]);

    useEffect((_, prevState) => {
        if (prevState.repositories !== repositories) {
            localStorage.setItem('repositories', JSON.stringify(repositories));
        }
    });
    */

    function handleInputChange(e) {
        setNewRepo(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);

        const response = await api.get(`/repos/${newRepo}`);

        const data = {
            // key property map <li>
            name: response.data.full_name,
        };

        setRepositories([...repositories, data]);

        setNewRepo(clearInput);

        setLoading(false);
    }

    return (
        <Container>
            <h1>
                <FaGithubAlt />
                Repositórios
            </h1>

            <Form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Adicionar repositório"
                    value={newRepo}
                    onChange={handleInputChange}
                />

                <SubmitButton loading={loading}>
                    {loading ? (
                        <FaSpinner color="#FFF" size={14} />
                    ) : (
                        <FaPlus color="#fff" size={14} />
                    )}
                </SubmitButton>
            </Form>

            <List>
                {repositories.map((repository) => (
                    <li key={repository.name}>
                        <span>{repository.name}</span>
                        <Link
                            to={`/repository/${encodeURIComponent(
                                repository.name
                            )}`}
                        >
                            Detalhes
                        </Link>
                    </li>
                ))}
            </List>
        </Container>
    );
}
