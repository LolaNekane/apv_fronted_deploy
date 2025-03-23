import { use, useEffect, useState } from "react"
import AdminNav from "../components/AdminNav"
import useAuth from "../hook/useAuth";
import Alerta from "../components/Alerta";

const EditarPerfil = () => {
    const {auth, actulizarPerfil} = useAuth();
    const [perfil, setPerfil] = useState({});
    const [alerta, setAlerta] = useState({});
    
    useEffect(() => {
        setPerfil(auth);
    },[auth])

    const handelSubmit = async e => {
        e.preventDefault();

        const {nombre, email } = perfil;

        if([nombre, email].includes('')){
            setAlerta({
                msg: 'Email y Nombre son obligatorios',
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
            return
        }
        const resultado = await actulizarPerfil(perfil)

        setAlerta(resultado);
        setTimeout(() => {
            setAlerta({})
        }, 3000);
    }

    const {msg} = alerta;

    return (
        <>
            <AdminNav/>
            <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
            <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} <span className="text-indigo-600 font-bold">información aquí</span></p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                {msg && <Alerta alerta={alerta}/>}
                    <form
                        onSubmit={handelSubmit}
                    >
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600" htmlFor="">Nombre</label>
                            <input 
                                type="text"
                                className="border  w-full p-3 mt-2 bg-gray-50 rounded-xl focus:border-indigo-600
                                border-gray-200 focus:outline-none "
                                name="nombre"
                                value={perfil.nombre || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                             />
                        </div>

                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600" htmlFor="">Web</label>
                            <input 
                                type="text"
                                className="border  w-full p-3 mt-2 bg-gray-50 rounded-xl focus:border-indigo-600
                                border-gray-200 focus:outline-none "
                                name="web"
                                value={perfil.web || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                             />
                        </div>

                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600" htmlFor="">Teléfono</label>
                            <input 
                                type="text"
                                className="border  w-full p-3 mt-2 bg-gray-50 rounded-xl focus:border-indigo-600
                                border-gray-200 focus:outline-none "
                                name="telefono"
                                value={perfil.telefono || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                             />
                        </div>

                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600" htmlFor="">Email</label>
                            <input 
                                type="text"
                                className="border  w-full p-3 mt-2 bg-gray-50 rounded-xl focus:border-indigo-600
                                border-gray-200 focus:outline-none "
                                name="email"
                                value={perfil.email || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                             />
                        </div>

                        <input 
                            type="submit" 
                            value="Guardar Cambios"
                            className="bg-indigo-700 py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 w-full hover:cursor-pointer hover:bg-indigo-800 "
                        />
                    </form>
                </div>
            </div>
        </>
      
    )
  }
  
  export default EditarPerfil
  