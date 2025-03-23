import { use, useState } from "react";
import AdminNav from "../components/AdminNav"
import Alerta from "../components/alerta";
import useAuth from "../hook/useAuth";


const CambiarPassword = () => {

    const {guardarPassword} = useAuth();

    const [alerta, setAlerta] = useState({});
    const [password, setPassword] = useState({
        pwd_actual: '',
        pwd_new: ''

    });
   

    const handelSubmit = async e => {
        e.preventDefault();

        if(Object.values(password).some( campo => campo == '')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
            return
        }
        if(password.pwd_new.length < 6) {
            setAlerta({
                msg: 'La contraseña tiene que tener mínimo 6 caracteres',
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
            return
        }
        const respuesta = await guardarPassword(password);

        setAlerta(respuesta);
        setTimeout(() => {
            setAlerta({})
        }, 3000);
    }

    const {msg} = alerta;
  return (
    <>
        <AdminNav/>

        <h2 className="font-black text-3xl text-center mt-10">Cambiar Contraseña</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} <span className="text-indigo-600 font-bold">Contraseña aquí</span></p>

        <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                {msg && <Alerta alerta={alerta}/>}
                    <form
                        onSubmit={handelSubmit}
                    >
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600" htmlFor="">Contraseña Actual</label>
                            <input 
                                type="password"
                                className="border  w-full p-3 mt-2 bg-gray-50 rounded-xl focus:border-indigo-600
                                border-gray-200 focus:outline-none "
                                name="pwd_actual"
                                placeholder="Constraseña Actual"
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name] : e.target.value
                                })}
                             />
                        </div>

                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600" htmlFor="">Contraseña Nueva</label>
                            <input 
                                type="password"
                                className="border  w-full p-3 mt-2 bg-gray-50 rounded-xl focus:border-indigo-600
                                border-gray-200 focus:outline-none "
                                name="pwd_new"
                                placeholder="Contraseña Nueva"
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name] : e.target.value
                                })}
                             />
                        </div>
                        <input 
                            type="submit" 
                            value="Cambiar contraseña"
                            className="bg-indigo-700 py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 w-full hover:cursor-pointer hover:bg-indigo-800 "
                        />
                    </form>
                </div>
            </div>
    </>
  )
}

export default CambiarPassword
