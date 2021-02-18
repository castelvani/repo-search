import React,{useState,useEffect} from 'react'
import Logo from "../../img/logo-github.svg";
import {Link, useRouteMatch} from "react-router-dom";
import {FiChevronLeft,FiChevronRight} from 'react-icons/fi';
import {Header,RepositoryInfo,Issues} from "./style";
import Loader from "../../img/loader.gif" 
import api from "../../services/api";

interface RepositoryParams{
    repository: string
}

interface Repository{
    full_name: string,
    description: string,
    forks_count: number,
    stargazers_count: number,
    open_issues_count:number,
    owner: {
        login: string,
        avatar_url: string
    }
}

interface Issue{
    id: number,
    title: string,
    html_url: string,
    user:{
        login: string
    }
}

const Repository: React.FC = () => {

    const [repository, setRepository] = useState<Repository | null>(null);
    const [issues, setIssues] = useState<Issue[]>([]);
    const {params} = useRouteMatch<RepositoryParams>();
    const [loading, setLoading] = useState(true);
    // castelvani/NNH_Java_System
    useEffect(() => {

        api.get(`repos/${params.repository}`)
        .then(res=>{
            console.log(res.data);         
            setRepository(res.data);   
        })

        api.get(`repos/${params.repository}/issues`)
        .then(res=>{
            setLoading(false);
            console.log(res.data);
            setIssues(res.data);
        })
        
    // async function loadData(): Promise<void> {
    //     const [repository, issues] = await Promise.all([
    //         await api.get(`repos/${params.repository}`),
    //         await api.get(`repos/${params.repository}/issues`)
    //     ]);
        

    //     console.log("repository", repository);
    //     console.log("issues", issues);
    // }

    // loadData();
    
    }, [])


    return (
        <>
        <Header>
            <img src={Logo} alt="Logo App"/>   
            <Link to="/">
                <FiChevronLeft size={20}/> Voltar
            </Link>
        </Header>
        {repository && (
            <RepositoryInfo>
                <header>
                    <img 
                        src={repository.owner.avatar_url}
                        alt={repository.full_name}
                    />
                    <div>
                        <strong>{repository.full_name}</strong>
                        <p>{repository.description}</p>
                    </div>
                </header>
                <ul>
                    <li>
                        <strong>{repository.stargazers_count}</strong>
                        <span>Stars</span>
                    </li>
                    <li>
                        <strong>{repository.forks_count}</strong>
                        <span>Forks</span>
                    </li>
                    <li>
                        <strong>{repository.open_issues_count}</strong>
                        <span>Issues</span>
                    </li>
                </ul>
            </RepositoryInfo>
        )}
        {loading ? 
        <img src={Loader} alt="Loader gif"/> :
        <Issues>
            { issues.map( issue => (
                <a 
                key={issue.id}
                href={issue.html_url}
                target="_blank"
                rel="noreferrer"
                >
                <div>
                <strong>{issue.title}</strong>
                <p>{issue.user.login}</p>
                </div>
                <FiChevronRight size={40}/>
            </a>
            ))}
        </Issues>}
        </>
    )
}

export default Repository
