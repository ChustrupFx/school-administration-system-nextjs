import style from './style.module.css';

import { useState } from 'react';
import api from '../services/api/index';

export default function Home() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  return (
    <div className={style.background}>
      <div className={style.container}>
        <form className={style.form} onSubmit={handleSubmit}>
          <h1 className={style.title}>Login</h1>
          {errorMsg !== '' && 
            <div className={style.errormessage}>{errorMsg}</div>
          }
          <label className={style.label}>Login</label>
          <input className={style.input} placeholder="Login" type="text" value={login} onChange={(e) => setLogin(e.target.value)}/>

          <label className={style.label}>Senha</label>
          <input className={style.input} placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

          <button className={style.submitbutton} type="submit">Entrar</button>
        </form>
      </div>
    </div>

  );

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post('/user/login', {
      registrationCode: login,
      password
    });
    const { ok, errorMsg } = response.data;

    if (ok) {
      console.log(ok);
    } else {
      setErrorMsg(errorMsg);
    }

    console.log(response.data);

  }
}
