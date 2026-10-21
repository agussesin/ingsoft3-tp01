import { expect, test } from '@playwright/test'

const API = process.env.API_BASE_URL || 'http://localhost:8080'
const URL = `${API}/api/reservas`

function datos() {
    return {
        nombreCliente: `api ${Date.now()} ${crypto.randomUUID()}`,
        lugar: 'Prueba TP7',
        fechaHora: new Date(Date.now() + 7 * 86400000).toISOString(),
        cantidadPersonas: 2,
    }
}

async function listar(request) {
    const respuesta = await request.get(URL)
    expect(respuesta.status()).toBe(200)
    return respuesta.json()
}

async function limpiar(request, id) {
    const respuesta = await request.delete(`${URL}/${id}`)
    expect(respuesta.status()).toBe(204)

    const consulta = await request.get(`${URL}/${id}`)
    expect(consulta.status()).toBe(404)

    const lista = await listar(request)
    expect(lista.some(r => r.id === id)).toBe(false)
}

test('crear, consultar y borrar una reserva real', async ({ request }) => {
    const reserva = datos()
    const alta = await request.post(URL, { data: reserva })
    expect(alta.status()).toBe(201)
    const creada = await alta.json()

    try {
        const consulta = await request.get(`${URL}/${creada.id}`)
        expect(consulta.status()).toBe(200)
        const guardada = await consulta.json()
        const { fechaHora, ...campos } = reserva
        expect(guardada).toMatchObject(campos)
        expect(Date.parse(guardada.fechaHora)).toBe(Date.parse(fechaHora))

        const lista = await listar(request)
        expect(lista.some(r =>
            r.id === creada.id && r.nombreCliente === reserva.nombreCliente
        )).toBe(true)
    } finally {
        await limpiar(request, creada.id)
    }
})

test('nombre vacío devuelve 400 y no crea una reserva', async ({ request }) => {
    const reserva = { ...datos(), nombreCliente: '' }
    reserva.lugar = `invalida ${Date.now()} ${crypto.randomUUID()}`
    const antes = await listar(request)

    const respuesta = await request.post(URL, { data: reserva })

    expect(respuesta.status()).toBe(400)
    const despues = await listar(request)
    expect(despues.map(r => r.id).sort()).toEqual(
        antes.map(r => r.id).sort()
    )
    expect(despues.some(r => r.lugar === reserva.lugar)).toBe(false)
})

test('editar una reserva persiste los cambios en la base', async ({ request }) => {
    const reserva = datos()
    const alta = await request.post(URL, { data: reserva })
    expect(alta.status()).toBe(201)
    const creada = await alta.json()

    try {
        const modificada = {
            ...reserva,
            lugar: 'Lugar actualizado TP7',
            cantidadPersonas: 4,
        }

        const cambio = await request.put(`${URL}/${creada.id}`, {
            data: modificada,
        })
        expect(cambio.status()).toBe(204)

        const consulta = await request.get(`${URL}/${creada.id}`)
        expect(consulta.status()).toBe(200)
        const guardada = await consulta.json()
        const { fechaHora, ...campos } = modificada
        expect(guardada).toMatchObject(campos)
        expect(Date.parse(guardada.fechaHora)).toBe(Date.parse(fechaHora))
    } finally {
        await limpiar(request, creada.id)
    }
})