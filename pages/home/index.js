import style from './style.module.css';
import api from '../../services/api';
import { CircularProgress } from '@material-ui/core';
import { Apps } from '@material-ui/icons';
import { useAuth } from '../../context/Auth';
import { useRouter } from 'next/router';

const Home = () => {
    const currentYear = new Date().getFullYear();
    const { user, loading } = useAuth();
    const router = useRouter();
    
    return (
        <>
            <div className={style.sidebar}>
                <div>
                    <h1 className={style.schoolTitle}>Escola</h1>
                </div>
                <div className={style.studentInfo}>
                    {loading && <CircularProgress />}
                    {!loading &&
                        <div className={style.studentMeta}>
                            <img className={style.studentImg} src="/images/default-user-image.png"></img>
                            <div>
                                <p>{user.name}</p>
                                <p>EM {user.grade}º{user.class} - {getShift()}</p>
                                <p>{getDegree()}</p>
                                <button className={style.logoutBtn} onClick={logout}>Logout</button>
                            </div>
                        </div>}
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
                    <div>
                        <div className={style.cardHeader}>
                            <h2>Tarefas</h2>
                        </div>
                        <div className={style.cardBody}>

                        </div>
                    </div>
                    <div>
                        <div className={style.cardHeader}>
                            <h2>Conteúdo</h2>
                        </div>
                        <div className={style.cardBody}>
                            
                        </div>
                    </div>
                    <div>
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

    function getShift() {
        const shifts = ['Matutino', 'Vespertino'];
        const userShift = user.shift;
        return shifts[userShift];
    }

    function getDegree() {
        const degrees = ['Ensino Fudamental I',
                        'Ensino Funfamental II',
                        'Ensino Médio'];
        const userDegree = user.degree;
        return degrees[userDegree];
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