import style from './style.module.css';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';

const Tasks = () => {

    return (
        <div style={{marginLeft: '15%'}}>
            <div>
                <div className={style.taskBody}>
                    <h2>Lista de Tarefas</h2>
                </div>
                <div className={style.pageButtonsContainer}>
                    <div className={style.pageButtons}>
                        <button><ArrowLeft /></button>
                        <button><ArrowRight /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tasks;