import { useCallback, useEffect, useState } from 'react'
import './App.css'
import {
  esFechaFutura,
  fechaParaInput,
  normalizarReserva,
  textoPersonas,
} from './reservas'

const API_URL = '/api/reservas'
const FORMULARIO_INICIAL = {
  nombreCliente: '',
  lugar: '',
  fechaHora: '',
  cantidadPersonas: 1,
}

function App() {
  const [reservas, setReservas] = useState([])
  const [formulario, setFormulario] = useState(FORMULARIO_INICIAL)
  const [reservaEditada, setReservaEditada] = useState(null)
  const [vista, setVista] = useState('lista')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const cargarReservas = useCallback(async () => {
    try {
      const respuesta = await fetch(API_URL)

      if (!respuesta.ok) {
        throw new Error('No se pudieron cargar las reservas.')
      }

      const datos = await respuesta.json()
      setError('')
      setReservas(datos)
    } catch (problema) {
      setError(problema.message)
    } finally {
      setCargando(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    cargarReservas()
  }, [cargarReservas])

  function actualizarCampo(evento) {
    const { name, value } = evento.target

    setFormulario((actual) => ({
      ...actual,
      [name]: value,
    }))
  }

  function abrirNuevaReserva() {
    setFormulario(FORMULARIO_INICIAL)
    setReservaEditada(null)
    setError('')
    setVista('formulario')
  }

  function editarReserva(reserva) {
    setFormulario({
      nombreCliente: reserva.nombreCliente,
      lugar: reserva.lugar,
      fechaHora: fechaParaInput(reserva.fechaHora),
      cantidadPersonas: reserva.cantidadPersonas,
    })

    setReservaEditada(reserva.id)
    setError('')
    setVista('formulario')
  }

  async function guardarReserva(evento) {
    evento.preventDefault()

    if (!esFechaFutura(formulario.fechaHora)) {
      setError('La fecha de la reserva debe ser futura.')
      return
    }

    const datos = normalizarReserva(formulario)

    const estaEditando = reservaEditada !== null
    const url = estaEditando
      ? `${API_URL}/${reservaEditada}`
      : API_URL

    try {
      setError('')

      const respuesta = await fetch(url, {
        method: estaEditando ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
      })

      if (!respuesta.ok) {
        throw new Error('No se pudo guardar la reserva.')
      }

      setFormulario(FORMULARIO_INICIAL)
      setReservaEditada(null)
      setVista('lista')
      await cargarReservas()
    } catch (problema) {
      setError(problema.message)
    }
  }

  async function eliminarReserva(id) {
    const confirmar = window.confirm(
      '¿Querés eliminar esta reserva?',
    )

    if (!confirmar) {
      return
    }

    try {
      setError('')

      const respuesta = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      })

      if (!respuesta.ok) {
        throw new Error('No se pudo eliminar la reserva.')
      }

      await cargarReservas()
    } catch (problema) {
      setError(problema.message)
    }
  }

  return (
    <div className="app">
      <header className="encabezado">
        <div>
          <h1>Reservas</h1>
        </div>

        <nav>
          <button
            className="boton secundario"
            onClick={() => setVista('lista')}
          >
            Ver reservas
          </button>

          <button
            className="boton principal"
            onClick={abrirNuevaReserva}
          >
            Nueva reserva
          </button>
        </nav>
      </header>

      <main>
        {error && <p className="mensaje-error">{error}</p>}

        {vista === 'formulario' ? (
          <section className="panel formulario-panel">
            <div className="titulo-seccion">
              <div>
                <p className="etiqueta">Formulario</p>
                <h2>
                  {reservaEditada
                    ? 'Editar reserva'
                    : 'Crear reserva'}
                </h2>
              </div>
            </div>

            <form onSubmit={guardarReserva}>
              <label>
                Reserva a nombre de
                <input
                  name="nombreCliente"
                  value={formulario.nombreCliente}
                  onChange={actualizarCampo}
                  maxLength="100"
                  required
                />
              </label>

              <label>
                Lugar
                <input
                  name="lugar"
                  value={formulario.lugar}
                  onChange={actualizarCampo}
                  maxLength="100"
                  required
                />
              </label>

              <label>
                Fecha y hora
                <input
                  type="datetime-local"
                  name="fechaHora"
                  value={formulario.fechaHora}
                  onChange={actualizarCampo}
                  min={fechaParaInput(new Date())}
                  required
                />
              </label>

              <label>
                Cantidad de personas
                <input
                  type="number"
                  name="cantidadPersonas"
                  value={formulario.cantidadPersonas}
                  onChange={actualizarCampo}
                  min="1"
                  max="20"
                  required
                />
              </label>

              <div className="acciones-formulario">
                <button
                  type="button"
                  className="boton secundario"
                  onClick={() => setVista('lista')}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="boton principal"
                >
                  Guardar reserva
                </button>
              </div>
            </form>
          </section>
        ) : (
          <section>
            <div className="titulo-seccion">
              <div>
                <p className="etiqueta">Agenda</p>
                <h2>Próximas reservas</h2>
              </div>

              <span className="contador">
                {reservas.length} en total
              </span>
            </div>

            {cargando ? (
              <p className="estado">Cargando reservas...</p>
            ) : reservas.length === 0 ? (
              <div className="panel estado">
                <h3>Todavía no hay reservas</h3>
                <p>Creá la primera para comenzar.</p>
              </div>
            ) : (
              <div className="grilla">
                {reservas.map((reserva) => (
                  <article className="panel tarjeta" key={reserva.id}>
                    <div>
                      <p className="fecha">
                        {new Date(
                          reserva.fechaHora,
                        ).toLocaleString('es-AR')}
                      </p>

                      <h3>{reserva.lugar}</h3>
                      <p>{reserva.nombreCliente}</p>
                      <p>
                        {textoPersonas(
                          reserva.cantidadPersonas,
                        )}
                      </p>
                    </div>

                    <div className="acciones-tarjeta">
                      <button
                        className="boton secundario"
                        onClick={() => editarReserva(reserva)}
                      >
                        Editar
                      </button>

                      <button
                        className="boton peligro"
                        onClick={() =>
                          eliminarReserva(reserva.id)
                        }
                      >
                        Eliminar
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  )
}

export default App
