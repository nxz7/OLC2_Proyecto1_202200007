import { parse } from './analizador.js'
import { InterpreterVisitor } from './interprete.js'
import { Symbols } from './Symbols.js'; 
import { ErroresTabla } from './ErroresTabla.js';

const editor = document.getElementById('editor');
const btn = document.getElementById('btn');

const salida = document.getElementById('salida');




btn.addEventListener('click', () => {
    const EntradaFront = editor.value
    const errores = new ErroresTabla();
    try {

    const sentencias = parse(EntradaFront)

    const symbols = new Symbols();


    const interprete = new InterpreterVisitor(symbols, errores);

    //console.log(sentencias);
    sentencias.forEach(sentencia => sentencia.accept(interprete))
    console.log({ sentencias })
    salida.innerHTML = interprete.salida;
    symbols.generateHTMLTable();
    errores.generateHtmlError();

    } catch (error) {
        console.log(error)
        // agregar el errores
        errores.addError("Semantico",error.message, error.location.start.line, error.location.start.column)
        salida.innerHTML =' Error sintactico: ' + error.message + ' [ linea: ' + error.location.start.line + ' - columna: ' + error.location.start.column + ' ]';
    }

})

//ESTE ARCHIVO NO TIENE LA LOGICA SOLO RECIBE EL INPUT Y LO ANALIZA