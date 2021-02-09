import style from './style.module.css';
import api from '../../services/api';
import { CircularProgress } from '@material-ui/core';
import { Apps } from '@material-ui/icons';
import { useAuth } from '../../context/Auth';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';

const Home = () => {
    const currentYear = new Date().getFullYear();
    const { user, loading, isSigned } = useAuth();
    const router = useRouter();

    const [tasks, setTasks] = useState([]);
    const [loadingTasks, setLoadingTasks] = useState(true);

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
            <div className={style.sidebar}>
                <div>
                    <h1 className={style.schoolTitle}>Escola</h1>
                </div>
                <div className={style.studentInfo}>
                    <div className={style.studentMeta}>
                        <img className={style.studentImg} src="/images/default-user-image.png"></img>
                        <div>
                            <p>{user.name}</p>
                            <p>EM {user.grade}º{user.class} - {user.shift.name}</p>
                            <p></p>
                            <button className={style.logoutBtn} onClick={logout}>Logout</button>
                        </div>
                    </div>
                    <div className={style.studentRegistration}>
                        <p>Matrícula: {user.registrationCode}{loading && <CircularProgress size="10px" />}</p>
                        {currentYear}
                    </div>
                </div>
                <hr />
                <div>
                    <nav>
                        <ul className={style.navList}>
                            <li className={style.navItem}>
                                <a className={style.itemLink}>
                                    <Apps />
                                    <span>INÍCIO</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
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

                            </div>
                        </div>
                        <div className={style.card}>
                            <div className={style.cardHeader}>
                                <h2>Notícias</h2>
                            </div>
                            <div className={style.cardBody}>

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

    async function logout() {
        const response = await api.post('user/logout');
        const responseData = response.data;

        if (responseData.ok) {
            router.push('/error', '/');
        }
    }
}

export default Home;