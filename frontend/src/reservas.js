export function fechaParaInput(fecha) {
  const valor = new Date(fecha)
  const local = new Date(
    valor.getTime() - valor.getTimezoneOffset() * 60_000,
  )

  return local.toISOString().slice(0, 16)
}

export function esFechaFutura(fecha, ahora = new Date()) {
  return new Date(fecha).getTime() > new Date(ahora).getTime()
}

export function normalizarReserva(formulario) {
  return {
    ...formulario,
    fechaHora: new Date(formulario.fechaHora).toISOString(),
    cantidadPersonas: Number(formulario.cantidadPersonas),
  }
}

export function textoPersonas(cantidad) {
  return `${cantidad} ${cantidad === 1 ? 'persona' : 'personas'}`
}
