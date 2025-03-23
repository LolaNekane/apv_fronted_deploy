import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/alerta";
import clienteAxios from "../config/axios";

const  OlvidePassword = () => {
    const [email, setEmail] = useState('');
    const [alerta, setAlerta] = useState({});
    
    const handleSubmit = async e => {
        e.preventDefault();

        if(email === '' || email.length < 6) {
            setAlerta({msg: 'El email es obligatorio', error: true});
            return
        }
        try {
            const {data} = await clienteAxios.post('/veterinarios/olvide-password', { email });
            console.log(data)

            setAlerta({msg: data.msg})
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }
    const {msg} = alerta;

  return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">
                Recupera tu Acceso y no Pierdas {""}
                <span className="text-black">tus pacientes</span>
            </h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
            {msg && <Alerta
                alerta={alerta}
            />}
            <form 
                onSubmit={handleSubmit}
            >
                <div className="my-5">
                    <label 
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Email
                    </label>
                    <input 
                        type="text" 
                        placeholder="Email de Registro"
                        className="border  w-full p-3 mt-3 bg-gray-50 rounded-xl focus:border-indigo-600
                        border-gray-200 focus:outline-none "
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <input 
                    type="submit" 
                    value="Recuperar contraseña"
                    className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
                />
            </form>
            <nav 
                className="mt-5 lg:flex lg:justify-between">
                <Link 
                    className="block text-center my-5 text-gray-500"
                    to="/registrar">¿No tienes cuenta? Regístrate</Link>
                <Link 
                    className="block text-center my-5 text-gray-500"
                    to="/">¿Tienes cuenta? Inicia Sesión</Link>
            </nav>
        </div>
    </>
  )
}

export default OlvidePassword
