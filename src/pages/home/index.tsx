import React, {FormEvent, useState, useEffect} from 'react';
import {FiChevronRight} from 'react-icons/fi';
import {Link} from "react-router-dom";

import {toast} from "react-toastify";

import api from "../../services/api";

import Logo from "../../img/logo-github.svg";

import {Title, Form, Repositories, Error} from "./style";

interface Repository{
    full_name: string,
    description: string,
    owner: {
        login: string,
        avatar_url: string
    }
    html_url: string
}

const Home: React.FC = () => {

    const [newRepo, setNewRepo] = useState('');
    const [inputError, setInputError] = useState('');
    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storageRepositories = localStorage.getItem("@githubexplore");
        if(storageRepositories){
            return JSON.parse(storageRepositories)
        }else{
            return [];
        }
    });

    useEffect(()=>{
        localStorage.setItem("@githubexplore",JSON.stringify(repositories))
    },[repositories])

    async function handleAddRepository(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        if(!newRepo){
            setInputError("Digite o nome do repositorio");
            return;
        }
        try{
            //add new repos
            const response = await api.get(`repos/${newRepo}`);
            const repository = response.data;
            setRepositories([...repositories, repository]);
            setNewRepo('');
            toast.success("Encontrado!");
        }catch(e){
            toast.error("Ops, algo deu errado!");
        }
    }
    
    return (
        <>
            <img src={Logo} alt="Logo App"/>
            <Title>Encontre repositórios no GitHub</Title>
            <Form hasError={!!inputError} onSubmit={handleAddRepository}>
                <input type="text" value={newRepo} onChange={e => setNewRepo(e.target.value)} placeholder="Digite o nome do repositório"/>
                <button type="submit" > Pesquisar </button>
            </Form>
            {inputError && <Error>{inputError}</Error>}
            <Repositories>
                {repositories.map((repo,index) => (
                    <Link key={index} to={`repository/${repo.full_name}`}>
                        <img 
                            src={repo.owner.avatar_url} 
                            alt={repo.owner.login}
                        />
                        <div>
                            <strong>{repo.full_name}</strong>
                            <p>{repo.description}</p>
                        </div>
                        <FiChevronRight size={40}/>
                    </Link>
                ))}
            </Repositories>
        </>
    )
}

export default Home
