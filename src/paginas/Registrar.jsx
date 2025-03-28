import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";


function Registrar() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');

    const [alerta, setaAlerta] = useState({});

    const handelSubmit = async e => {
        e.preventDefault();
        if([nombre, email, password, repetirPassword].includes('')) {
            setaAlerta({msg: 'Hay campos vacios', error: true});
            return;
        }

        if(password !== repetirPassword) {
            setaAlerta({msg: 'Las contraseñas no son iguales', error: true});
            return;
        }

        if(password.length < 6) {
            setaAlerta({msg: 'Contraseña muy corta, agrega mínimo 6 caracteres', error: true});
            return;
        }
        setaAlerta({});

        // Crear el usuario en la api
        try {
            await clienteAxios.post('/veterinarios', {nombre, email, password});

            setaAlerta({
                msg: 'Creado correctamente, revisa tu email',
                error: false
            })
        } catch (error) {
            setaAlerta({
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
            Crea tu Cuenta y Administra {""}
            <span className="text-black">tus pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
       {msg && <Alerta
            alerta={alerta}
        />}
        <form 
        onSubmit={handelSubmit}
        >
            <div className="my-5">
                <label 
                    className="uppercase text-gray-600 block text-xl font-bold"
                >
                    Nombre
                </label>
                <input 
                    type="text" 
                    placeholder="Nombre"
                    className="border  w-full p-3 mt-3 bg-gray-50 rounded-xl focus:border-indigo-600
                    border-gray-200 focus:outline-none "
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>
            <div className="my-5">
                <label 
                    className="uppercase text-gray-600 block text-xl font-bold"
                >
                    Email
                </label>
                <input 
                    type="text" 
                    placeholder="Email"
                    className="border  w-full p-3 mt-3 bg-gray-50 rounded-xl focus:border-indigo-600
                    border-gray-200 focus:outline-none "
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="my-5">
                <label 
                    className="uppercase text-gray-600 block text-xl font-bold"
                >
                    Contraseña
                </label>
                <input 
                    type="password" 
                    placeholder="Contraseña"
                    className="border  w-full p-3 mt-3 bg-gray-50 rounded-xl focus:border-indigo-600
                    border-gray-200 focus:outline-none "
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>

            <div className="my-5">
                <label 
                    className="uppercase text-gray-600 block text-xl font-bold"
                >
                    Repite la Contraseña
                </label>
                <input 
                    type="password" 
                    placeholder="Repite la Contraseña"
                    className="border  w-full p-3 mt-3 bg-gray-50 rounded-xl focus:border-indigo-600
                    border-gray-200 focus:outline-none "
                    value={repetirPassword}
                    onChange={e => setRepetirPassword(e.target.value)}
                />
            </div>

            <input 
                type="submit" 
                value="Crear cuenta"
                className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
            />
        </form>
        <nav 
         className="mt-5 lg:flex lg:justify-between">
            <Link 
                className="block text-center my-5 text-gray-500"
                to="/">¿Tienes cuenta? Inicia Sesión</Link>
            <Link 
                className="block text-center my-5 text-gray-500"
                to="/olvide-password">Olvide contraseña</Link>

        </nav>
    </div>

    </>
  )
}

export default Registrar
