import usePacientes from "../hook/usePacientes"
import Paciente from "./Paciente";

const ListadoPacientes = () => {
  const {pacientes, cargando} = usePacientes();
  console.log(pacientes)
    return (
      <>
        {!cargando && pacientes.length ? (
          <>
            <h2 className="font-black text-2xl text-center">Listado de Pacientes</h2>
            <p className="text-xl mt-5 mb-10 text-center">Administra tus {''}
              <span className="text-indigo-600 font-bold">pacientes y citas</span>
            </p>
            {pacientes.map(paciente => (
              <Paciente
                key={paciente._id}
                paciente={paciente}
              />
            ))}
          </>
        ) : 
        (
          <>
            <h2 className="font-black text-2xl text-center">No hay Pacientes</h2>
            <p className="text-xl mt-5 mb-10 text-center">Comienza agregando pacientes {''}
              <span className="text-indigo-600 font-bold">y aparecerán en este lugar</span>
            </p>
          </>
        )}
      </>
    )
  }
  
  export default ListadoPacientes
  