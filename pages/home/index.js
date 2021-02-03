import style from './style.module.css';
import { Apps } from '@material-ui/icons';
import { useAuth } from '../../context/Auth';

const Home = () => {
    const currentYear = new Date().getFullYear();
    const { user } = useAuth();

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
                            <p>EM 3ºB - Matutino</p>
                            <p>Ensino Médio</p>
                        </div>
                    </div>
                    <div className={style.studentRegistration}>
                        <p>Matrícula: 02591</p>
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
        </>
    );
}

export default Home;