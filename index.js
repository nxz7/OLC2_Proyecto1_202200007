import { parse } from './analizador.js'
import { InterpreterVisitor } from './interprete.js'

const editor = document.getElementById('editor')
const btn = document.getElementById('btn')
const ast = document.getElementById('ast')
const salida = document.getElementById('salida')

btn.addEventListener('click', () => {
    const codigoFuente = editor.value
    const sentencias = parse(codigoFuente)
    ast.innerHTML = JSON.stringify(sentencias, null, 2)

    const interprete = new InterpreterVisitor()

    //console.log({ sentencias })
    sentencias.forEach(sentencia => sentencia.accept(interprete))
    console.log({ sentencias })
    salida.innerHTML = interprete.salida
})

//ESTE ARCHIVO NO TIENE LA LOGICA SOLO RECIBE EL INPUT Y LO ANALIZA