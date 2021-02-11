import style from './style.module.css';
import pageStyle from '../../styles/page.module.css';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';
import { CircularProgress } from '@material-ui/core';
import { useAuth } from '../../context/Auth';
import useSWR from 'swr';
import api from '../../services/api';
import { useEffect, useState } from 'react';

const Tasks = () => {
    const { user, isSigned } = useAuth();

    const [taskPage, setTaskPage] = useState(1);
    const [lastPage, setLastPage] = useState(Infinity);

    const { data: tasks, error: taskError } = useSWR(isSigned ? `/user/${user._id}/tasks/?limit=5&page=${taskPage}` : null, fetcher);
    const loadingTasks = !tasks && !taskError;

    const canReturnPage = taskPage - 1 >= 1;
    const canProceedPage = taskPage + 1 <= lastPage;

    return (
        <div className={pageStyle.pageContent}>
            <div>
                <div className={style.taskBody}>
                    <h2>Lista de Tarefas</h2>
                </div>
                <div className={style.pageButtonsContainer}>
                    <div className={`${style.pageButtons}`}>
                        <button className={`${!canReturnPage ? style.buttonOff : null}`} 
                                onClick={() => setTaskPage(taskPage <= 1 ? 1 : taskPage - 1)}>
                            <ArrowLeft />
                        </button>
                        <button className={`${!canProceedPage ? style.buttonOff : null}`}
                                onClick={nextPage}><ArrowRight /></button>
                    </div>
                </div>
                <div className={style.taskList}>
                    {loadingTasks && <CircularProgress className={style.loading} style={{'marginTop': '20px', alignSelf: 'center'}} />}
                    {!loadingTasks && (taskError || !tasks.ok) && <div>Erro ao encontrar as tarefas</div>}
                    {!loadingTasks && taskPage === 1 && !tasks.tasks.length && <div>Não há tarefas para ser feito</div>}
                    {!loadingTasks && tasks.ok && tasks.tasks.map(task => (
                        <div key={task._id}>{task.body}</div>
                    ))}
                </div>
            </div>
        </div>
    )

    function nextPage() {
        if (lastPage) {
            if (taskPage + 1 > lastPage) return;
        }

        setTaskPage(taskPage + 1);
    }

    function previousPage() {
        const previousPage = taskPage - 1;
        if (previousPage < 1) return;
        setTaskPage(previousPage);
    }

    async function fetcher(key) {
        const response = await api.get(key);
        const data = response.data;
        if (data.ok 
            && !data.tasks.length
            && taskPage !== 1) 
        {
            setLastPage(taskPage - 1)
            previousPage();    
        }

        return data;
    }
}

export default Tasks;