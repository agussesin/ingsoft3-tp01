import { describe, expect, it, vi } from 'vitest'
import { cargarReservasDesdeApi } from './api'

describe('API de reservas', () => {
  it('pide las reservas a la ruta correcta', async () => {
    // Arrange
    const traer = vi.fn().mockResolvedValue([])

    // Act
    await cargarReservasDesdeApi(traer)

    // Assert
    expect(traer).toHaveBeenCalledWith('/api/reservas')
  })
})
