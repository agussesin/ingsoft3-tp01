import { expect, test } from '@playwright/test'

function nombreUnico() {
    return `e2e ${Date.now()} ${crypto.randomUUID()}`
}

function fechaFutura() {
    const fecha = new Date(Date.now() + 7 * 86400000)
    fecha.setMinutes(fecha.getMinutes() - fecha.getTimezoneOffset())
    return fecha.toISOString().slice(0, 16)
}

function tarjeta(page, nombre) {
    return page.getByRole('article').filter({
        has: page.getByText(nombre, { exact: true }),
    })
}

async function completar(page, nombre, lugar) {
    await page.getByLabel('Reserva a nombre de').fill(nombre)
    await page.getByLabel('Lugar', { exact: true }).fill(lugar)
    await page.getByLabel('Fecha y hora').fill(fechaFutura())
    await page.getByLabel('Cantidad de personas').fill('2')
}

async function crear(page, nombre) {
    await page.goto('/')
    await page.getByRole('button', { name: 'Nueva reserva', exact: true }).click()
    await completar(page, nombre, 'Lugar E2E')
    await page.getByRole('button', { name: 'Guardar reserva', exact: true }).click()
    await expect(tarjeta(page, nombre)).toBeVisible()
}

async function borrarDesdePantalla(page, nombre) {
    page.once('dialog', dialog => dialog.accept())
    await tarjeta(page, nombre)
        .getByRole('button', { name: 'Eliminar', exact: true }).click()
    await expect(tarjeta(page, nombre)).toHaveCount(0)
}

// Respaldo de limpieza si falla un paso de la interfaz.
// Son pedidos reales al proxy del frontend, sin respuestas inventadas.
async function limpiar(request, nombre) {
    const respuesta = await request.get('/api/reservas')
    expect(respuesta.status()).toBe(200)
    const reservas = await respuesta.json()

    for (const reserva of reservas.filter(r => r.nombreCliente === nombre)) {
        const borrado = await request.delete(`/api/reservas/${reserva.id}`)
        expect(borrado.status()).toBe(204)
    }

    const consulta = await request.get('/api/reservas')
    expect(consulta.status()).toBe(200)
    expect((await consulta.json()).some(r => r.nombreCliente === nombre))
        .toBe(false)
}

test('crear una reserva, verla y eliminarla', async ({ page, request }) => {
    const nombre = nombreUnico()

    try {
        await crear(page, nombre)
        await expect(tarjeta(page, nombre)).toContainText('Lugar E2E')
        await borrarDesdePantalla(page, nombre)
    } finally {
        await limpiar(request, nombre)
    }
})

test('nombre con espacios muestra error y no crea nada', async ({ page, request }) => {
    const lugar = nombreUnico()
    await page.goto('/')
    await page.getByRole('button', { name: 'Nueva reserva', exact: true }).click()
    await completar(page, '   ', lugar)
    await page.getByRole('button', { name: 'Guardar reserva', exact: true }).click()

    await expect(page.getByRole('alert'))
        .toHaveText('No se pudo guardar la reserva.')

    await page.getByRole('button', { name: 'Ver reservas', exact: true }).click()
    await expect(page.getByRole('heading', { name: lugar, exact: true }))
        .toHaveCount(0)

    const consulta = await request.get('/api/reservas')
    expect(consulta.status()).toBe(200)
    expect((await consulta.json()).some(r => r.lugar === lugar)).toBe(false)
})

test('editar una reserva conserva los cambios al recargar', async ({ page, request }) => {
    const nombre = nombreUnico()

    try {
        await crear(page, nombre)
        await tarjeta(page, nombre)
            .getByRole('button', { name: 'Editar', exact: true }).click()

        await page.getByLabel('Lugar', { exact: true }).fill('Lugar editado E2E')
        await page.getByLabel('Cantidad de personas').fill('4')
        await page.getByRole('button', { name: 'Guardar reserva', exact: true }).click()
        await expect(tarjeta(page, nombre)).toContainText('Lugar editado E2E')

        await page.reload()
        await expect(tarjeta(page, nombre)).toContainText('Lugar editado E2E')
        await expect(tarjeta(page, nombre)).toContainText('4 personas')
        await borrarDesdePantalla(page, nombre)
    } finally {
        await limpiar(request, nombre)
    }
})