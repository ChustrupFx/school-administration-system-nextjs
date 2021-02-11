import style from './style.module.css';
import api from '../../services/api';
import useSWR from 'swr';
import { CircularProgress } from '@material-ui/core';
import { useAuth } from '../../context/Auth';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';

const Home = () => {
    const { user, loading, isSigned } = useAuth();
    const router = useRouter();

    const [tasks, setTasks] = useState([]);
    const [loadingTasks, setLoadingTasks] = useState(true);

    const { data: content, error: contentError } = useSWR(isSigned ? `/user/${user._id}/content?limit=3` : null, contentFetcher);
    const loadingContent = !content && !contentError;

    const { data: news, error: newsError } = useSWR(isSigned ? `/user/${user._id}/news?limit=3` : null, newsFetcher);
    const loadingNews = !news && !newsError;

    const mounted = useRef(true);

    useEffect(() => {
        return () => { mounted.current = false; console.log('unmounted home index') };
    }, []);

    useEffect(() => {
        if (isSigned) {
            fetchTasks();
        }
    }, [isSigned]);

    if (!loading && !isSigned) {
        router.push('/');
        return null;
    };

    if (loading) return null;

    return (
        <>
            <div className={style.pageContent}>
                <div>
                    <div className={style.cards}>
                        <div className={style.card}>
                            <div className={style.cardHeader}>
                                <h2>Tarefas</h2>
                            </div>
                            <div className={style.cardBody}>
                                {loadingTasks && <CircularProgress />}
                                {tasks.length > 0 && !loadingTasks && (
                                    tasks.map(task => (
                                        <p key={task._id}>{task.body}</p>
                                    ))
                                )}
                                {tasks.length === 0 && !loadingTasks && (
                                    <p>Não há tarefas.</p>
                                )}
                            </div>
                        </div>
                        <div className={style.card}>
                            <div className={style.cardHeader}>
                                <h2>Conteúdo</h2>
                            </div>
                            <div className={style.cardBody}>
                                {loadingContent && <CircularProgress />}
                                {!loadingContent && (contentError || !content.ok) && <p>Erro ao encontrar o conteúdo.</p>}
                                {!loadingContent && content.ok && content.contents.map(item => (
                                    <p key={item._id}>{item.body}</p>
                                ))}
                            </div>
                        </div>
                        <div className={style.card}>
                            <div className={style.cardHeader}>
                                <h2>Notícias</h2>
                            </div>
                            <div className={style.cardBody}>
                                {loadingNews && <CircularProgress />}
                                {!loadingNews && (newsError || !news.ok) && <p>Erro ao encontrar notícias.</p>}
                                {!loadingNews && news.ok && news.news.map(item => (
                                    <p key={item._id}>{item.body}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    async function fetchTasks() {
        try {
            const response = await api.post(`/user/${user._id}/tasks`);
            if (!mounted.current) return;
            const responseData = response.data;
            if (responseData.ok) {
                setTasks(responseData.tasks);
            }
            setLoadingTasks(false);
        } catch (e) { }
    }

    async function contentFetcher(key) {
        const response = await api.get(key);
        const data = response.data;
        return data;
    }

    async function newsFetcher(key) {
        const response = await api.get(key);
        const data = response.data;
        return data;
    }
}

export default Home;