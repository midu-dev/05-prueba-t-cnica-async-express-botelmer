import net from 'node:net'
import fs from 'node:fs'
import fsp from 'node:fs/promises'

// # EJERCICIO 1
export const ping = (ip, callback) => {
  const startTime = process.hrtime()

  const client = net.connect({ port: 80, host: ip }, () => {
    client.end()
    callback(null, { time: process.hrtime(startTime), ip })
  })

  client.on('error', (err) => {
    client.end()
    callback(err)
  })
}

// # EJERCICIO 2
export function obtenerDatosPromise () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ data: 'datos importantes' })
    }, 2000)
  })
}

// # EJERCICIO 3
// Esta función lee el contenido de un archivo input.txt, convierte el contenido en mayusculas y luego lo envia al archivo output.txt
export function procesarArchivo (callback) {
  const handleWriteFile = (error) => {
    if (error) {
      console.error('Error guardando archivo:', error.message)
      callback(error)
    }
    console.log('Archivo procesado y guardado con éxito')
    callback(null)
  }

  const handleReadFile = (error, contenido) => {
    if (error) {
      console.error('Error leyendo archivo:', error.message)
      callback(error)
    }
    const textoProcesado = contenido.toUpperCase()

    fs.writeFile('output.txt', textoProcesado, handleWriteFile)
  }

  fs.readFile('input.txt', 'utf8', handleReadFile)
}

export async function procesarArchivoPromise () {
  let contenido = ''
  try {
    contenido = await fsp.readFile('input.txt', 'utf-8')
  } catch (error) {
    console.error(error.message)
    throw error
  }
  const textoProcesado = contenido.toUpperCase()

  try {
    await fsp.writeFile('output.txt', textoProcesado)
  } catch (error) {
    console.error(error.message)
    throw error
  }
}

// # EJERCICIO 4
export async function leerArchivos () {
  const [archivo1, archivo2, archivo3] = await Promise.all([
    fsp.readFile('archivo1.txt', 'utf8'),
    fsp.readFile('archivo2.txt', 'utf8'),
    fsp.readFile('archivo3.txt', 'utf8')
  ])
    .catch(error => {
      console.error(error)
      return []
    })
  return `${archivo1} ${archivo2} ${archivo3}`
}

// # EJERCICIO 5
export async function delay (ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
