import { parse } from './analizador.js'
import { InterpreterVisitor } from './interprete.js'
import { Symbols } from './Symbols.js'; 

const editor = document.getElementById('editor');
const btn = document.getElementById('btn');
const ast = document.getElementById('ast');
const reportesBtn = document.getElementById('reportes-btn');
const salida = document.getElementById('salida');




btn.addEventListener('click', () => {
    const codigoFuente = editor.value
    const sentencias = parse(codigoFuente)
    //ast.innerHTML = JSON.stringify(sentencias, null, 2)
    const symbols = new Symbols();

    const interprete = new InterpreterVisitor(symbols);

    console.log(sentencias);
    sentencias.forEach(sentencia => sentencia.accept(interprete))
    console.log({ sentencias })
    salida.innerHTML = interprete.salida;
    symbols.generateHTMLTable();
})

//ESTE ARCHIVO NO TIENE LA LOGICA SOLO RECIBE EL INPUT Y LO ANALIZA