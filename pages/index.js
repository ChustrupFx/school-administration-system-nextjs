import style from './style.module.css';
import api from '../services/api/index';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/Auth';
import { useRouter } from 'next/router';
 
export default function Login() {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { isSigned, loading, user, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (isSigned) {
      router.push('/home');
    }
  }, [loading]);

  if (loading || isSigned) return null;

  return (
    <div className={style.background}>
      <div className={style.container}>
        <form className={style.form} onSubmit={handleSubmit}>
          <h1 className={style.title}>Login</h1>
          {errorMsg && 
            <div className={style.errormessage}>{errorMsg}</div>
          }
          <label className={style.label}>Login</label>
          <input className={style.input} placeholder="Login" type="text" value={code} onChange={(e) => setCode(e.target.value)}/>

          <label className={style.label}>Senha</label>
          <input className={style.input} placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

          <button className={style.submitbutton} type="submit">Entrar</button>
        </form>
      </div>
    </div>

  );

  async function handleSubmit(e) {
    e.preventDefault();

    const responseData = await login({ 
      registrationCode: code,
      password
    });
    
    if (responseData)
      setErrorMsg(responseData.errorMsg);

  }
}
