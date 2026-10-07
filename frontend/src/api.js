export async function traerJson(url) {
  const respuesta = await fetch(url)

  if (!respuesta.ok) {
    throw new Error('No se pudieron cargar las reservas.')
  }

  return respuesta.json()
}

export async function cargarReservasDesdeApi(traer = traerJson) {
  return traer('/api/reservas')
}
