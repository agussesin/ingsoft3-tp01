import { describe, expect, it } from 'vitest'
import {
  esFechaFutura,
  fechaParaInput,
  normalizarReserva,
  textoPersonas,
} from './reservas'

describe('lógica de reservas', () => {
  it('convierte una fecha al formato del input', () => {
    const fecha = new Date(2026, 8, 5, 20, 30)

    expect(fechaParaInput(fecha)).toBe('2026-09-05T20:30')
  })

  it('distingue una fecha futura de una pasada', () => {
    const ahora = new Date('2026-09-01T12:00:00Z')

    expect(
      esFechaFutura('2026-09-02T12:00:00Z', ahora),
    ).toBe(true)

    expect(
      esFechaFutura('2026-08-31T12:00:00Z', ahora),
    ).toBe(false)
  })

  it('normaliza los datos antes de enviarlos a la API', () => {
    const formulario = {
      nombreCliente: 'Agus',
      lugar: 'Restaurante Centro',
      fechaHora: '2026-09-05T23:00:00Z',
      cantidadPersonas: '3',
    }

    const resultado = normalizarReserva(formulario)

    expect(resultado.fechaHora).toBe('2026-09-05T23:00:00.000Z')
    expect(resultado.cantidadPersonas).toBe(3)
    expect(resultado.nombreCliente).toBe('Agus')
  })

  it.each([
    [1, '1 persona'],
    [2, '2 personas'],
    [5, '5 personas'],
  ])('formatea %i personas correctamente', (cantidad, esperado) => {
    expect(textoPersonas(cantidad)).toBe(esperado)
  })

  it('rechaza una fecha inválida', () => {
    const ahora = new Date('2026-09-01T12:00:00Z')

    const resultado = esFechaFutura('fecha-invalida', ahora)

    expect(resultado).toBe(false)
  })
})