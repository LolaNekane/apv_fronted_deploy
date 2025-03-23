import { useState, useEffect } from "react"
import Alerta from "../components/Alerta";
import usePacientes from "../hook/usePacientes";

const Formulario = () => {
    const [nombre,setNombre] = useState('');
    const [propietario,setPropietario] = useState('');
    const [email,setEmail] = useState('');
    const [fecha,setFecha] = useState('');
    const [sintomas,setSintomas] = useState('');
    const [id, setId] = useState(null);

    const [alerta, setAlerta] = useState({});

    const {guardarPaciente, paciente} = usePacientes();

    useEffect(() => {
        if(paciente?.nombre) {
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setFecha(new Date(paciente.fecha).toLocaleDateString('en-CA'));
            setEmail(paciente.email);
            setSintomas(paciente.sintomas);
            setId(paciente._id);
        }
    }, [paciente])

    const handleSubmit = e => {
        e.preventDefault();

        // Validar el formulario
        if([nombre, propietario, email, fecha, sintomas].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
            return;
        }

        
        guardarPaciente({nombre, propietario, email, fecha, sintomas, id});
        setAlerta({
            msg: 'Guardado correctamente'
        });

        setTimeout(() => {
            setAlerta({})
        }, 3000);
        return;
        
        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');
        setId('');
    }

    const {msg} = alerta;

  return (
<>
        <h2 className="font-black text-2xl text-center">Administrador de Pacientes</h2>

        <p className="text-xl mt-5 mb-10 text-center">Añade tus pacientes y {''}
            <span className="text-indigo-600 font-bold">Administralos</span>
        </p>
        
        {msg && <Alerta alerta={alerta} />}

        <form className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md"
            onSubmit={handleSubmit}
        >
            <div className="mb-5">
                <label 
                    htmlFor="nombre"
                    className="text-gray-700 uppercase font-bold">
                    Nombre Mascota
                </label>
                <input 
                    type="text" 
                    id="nombre" 
                    placeholder="Nombre de la mascota" 
                    className="w-full p-2 mt-2 placeholder-gray-400 rounded-md border bg-gray-50 rounded-xl focus:border-indigo-600 border-gray-200 focus:outline-none"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="propietario"
                    className="text-gray-700 uppercase font-bold">
                    Nombre Propietario
                </label>
                <input 
                    type="text" 
                    id="propietario" 
                    placeholder="Nombre del propietario" 
                    className="w-full p-2 mt-2 placeholder-gray-400 rounded-md border bg-gray-50 rounded-xl focus:border-indigo-600 border-gray-200 focus:outline-none"
                    value={propietario}
                    onChange={e => setPropietario(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="email"
                    className="text-gray-700 uppercase font-bold">
                    Email
                </label>
                <input 
                    type="text" 
                    id="email" 
                    placeholder="Nombre del propietario" 
                    className="w-full p-2 mt-2 placeholder-gray-400 rounded-md border bg-gray-50 rounded-xl focus:border-indigo-600 border-gray-200 focus:outline-none"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="fecha"
                    className="text-gray-700 uppercase font-bold">
                    Fecha Alta
                </label>
                <input 
                    type="date" 
                    id="fecha" 
                    className="w-full p-2 mt-2 placeholder-gray-400 rounded-md border bg-gray-50 rounded-xl focus:border-indigo-600 border-gray-200 focus:outline-none"
                    value={fecha}
                    onChange={e => setFecha(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="sintomas"
                    className="text-gray-700 uppercase font-bold">
                    Sintomas
                </label>
                <textarea 
                    id="sintomas" 
                    placeholder="Describe los Síntomas"
                    className="w-full p-2 mt-2 placeholder-gray-400 rounded-md border bg-gray-50 rounded-xl focus:border-indigo-600 border-gray-200 focus:outline-none"
                    value={sintomas}
                    onChange={e => setSintomas(e.target.value)}
                />
            </div>
            <input 
                type="submit" 
                className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-2 hover:cursor-pointer hover:bg-indigo-800 md:w-auto transition-colors"
                value= {id ? 'Guardar Cambios' : 'Agregar Paciente'} 
                />
        </form>
    </>
  )
}

export default Formulario
