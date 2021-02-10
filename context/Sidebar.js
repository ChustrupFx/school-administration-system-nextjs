import { createContext, } from 'react'
import style from '../styles/sidebar.module.css';
import { useAuth } from '../context/Auth';
import { Apps, Create } from '@material-ui/icons';
import Link from 'next/link';


const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const currentYear = new Date().getFullYear();
    const { user, loading, isSigned, logout } = useAuth();

    if (loading) return null;

    return (
        <SidebarContext.Provider>
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
                                <Link href='/home'>
                                    <a className={style.itemLink}>
                                        <Apps />
                                        <span>INÍCIO</span>
                                    </a>
                                </Link>
                            </li>
                            <li className={style.navItem}>
                                <Link href='/tarefas'>
                                    <a className={style.itemLink}>
                                        <Create />
                                        <span>TAREFAS</span>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            { children}
        </SidebarContext.Provider>
    )

}