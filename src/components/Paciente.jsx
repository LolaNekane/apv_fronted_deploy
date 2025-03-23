import usePacientes from '../hook/usePacientes'

const Paciente = ({paciente}) => {
    const {setEdicion, eliminarPaciente} = usePacientes();

    const {email, fecha, nombre, propietario, sintomas, _id} = paciente;

    const formatearFecha = fecha => {
        const nuevaFecha = new Date(fecha);
        return new Intl.DateTimeFormat('es-ES', {dateStyle: 'long'}).format(nuevaFecha)
    }
  return (
    <>
        <div className="mx-5 my-10 bg-white shadow-md px-5 py-5 rounded-xl">
            <p className="font-bold text-indigo-700 my-2">Nombre: {''}
                <span className="font-normal normal-case text-black">{nombre}</span>
            </p>
            <p className="font-bold text-indigo-700 my-2">Propietario: {''}
                <span className="font-normal normal-case text-black">{propietario}</span>
            </p>
            <p className="font-bold text-indigo-700 my-2">Email del contacto: {''}
                <span className="font-normal normal-case text-black">{email}</span>
            </p>
            <p className="font-bold text-indigo-700 my-2">Fecha de alta: {''}
                <span className="font-normal normal-case text-black">{formatearFecha(fecha)}</span>
            </p>
            <p className="font-bold text-indigo-700 my-2">Síntomas: {''}
                <span className="font-normal normal-case text-black">{sintomas}</span>
            </p>
            <div className="flex justify-between my-5">
                <button
                    type="button"
                    className="bg-indigo-700 w-full text-sm py-2 px-10 rounded-xl text-white uppercase font-bold mt-4 hover:cursor-pointer hover:bg-indigo-800 md:w-auto transition-colors"
                    onClick={() => setEdicion(paciente)}
                >Editar
                </button>
                <button
                    type="button"
                    className="bg-red-700 w-full text-sm py-2 px-10 rounded-xl text-white uppercase font-bold mt-4 hover:cursor-pointer hover:bg-red-800 md:w-auto transition-colors"
                    onClick={() => eliminarPaciente(_id)}
                >Eliminar
                </button>
            </div>
        </div>
    </>
  )
}

export default Paciente;
