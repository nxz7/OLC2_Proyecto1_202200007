import { Entorno } from "./entorno.js";
import { BaseVisitor } from "./visitor.js";

// SE COPIA DEL VISITOR.JS PARA REALIZAR LA IMPLEMENTACION 

export class InterpreterVisitor extends BaseVisitor {

    constructor() {
        super();
        this.entornoActual = new Entorno();

        //LA RESPUESTA QUE SE VA A MOSTRAR
        this.salida = '';
    }

//AGREGAR ESTO ES SOLO PARA TENER LA INFO

    /**
      * @type {BaseVisitor['visitOperacionBinaria']}
      */
    visitOperacionBinaria(node) {
        //regresa el numero
        const izq = node.izq.accept(this);
        const der = node.der.accept(this);


        const tipoIzq = node.izq.tipo;
        const tipoDer = node.der.tipo

        switch (node.op) {
            case '+':
                // tipado
                if (tipoIzq === 'int' && tipoDer === 'int') {
                    node.tipo = 'int';
                    node.valor = izq + der;
                    return node.valor;

                } else if (tipoIzq === 'float' || tipoDer === 'float') {
                    node.tipo = 'float';
                    node.valor = izq + der;
                    return parseFloat(node.valor);
                } else if (tipoIzq === 'float' && tipoDer === 'float') {
                    node.tipo = 'float';
                    node.valor = izq + der;
                    return parseFloat(node.valor);
                }   
                else if (tipoIzq === 'string' && tipoDer === 'string') {
                    node.tipo = 'string';
                    node.valor = izq + der;
                    return node.valor;
                }
                else {
                    //-----------------ERROR ---------------
                    console.error("Error de tipado");
                    node.tipo = 'error';
                    node.valor = null;
                    throw new Error(`Error de tipado: ${tipoIzq} + ${tipoDer}`);
                }
            case '-':
                if (tipoIzq === 'int' && tipoDer === 'int') {
                    node.tipo = 'int';
                    node.valor = izq - der;
                    return node.valor;

                } else if (tipoIzq === 'float' || tipoDer === 'float') {
                    node.tipo = 'float';
                    node.valor = izq - der;
                    return parseFloat(node.valor);
                } else if (tipoIzq === 'float' && tipoDer === 'float') {
                    node.tipo = 'float';
                    node.valor = izq - der;
                    return parseFloat(node.valor);
                }   
                else {
                    //-----------------ERROR ---------------
                    console.error("Error de tipado");
                    node.tipo = 'error';
                    node.valor = null;
                    throw new Error(`Error de tipado: ${tipoIzq} + ${tipoDer}`);
                }
    
            case '*':

                if (tipoIzq === 'int' && tipoDer === 'int') {
                    node.tipo = 'int';
                    node.valor = izq * der;
                    return node.valor;

                } else if (tipoIzq === 'float' || tipoDer === 'float') {
                    node.tipo = 'float';
                    node.valor = izq * der;
                    return parseFloat(node.valor);

                } else if (tipoIzq === 'float' && tipoDer === 'float') {
                    node.tipo = 'float';
                    node.valor = izq * der;
                    return parseFloat(node.valor);

                }   
                else {
                    //-----------------ERROR ---------------
                    console.error("Error de tipado");
                    node.tipo = 'error';
                    node.valor = null;
                    throw new Error(`Error de tipado: ${tipoIzq} + ${tipoDer}`);
                }
    
            case '/':
                if (der === 0) {
                    // error de division por cero
                    console.error("Error: División por cero");
                    node.tipo = 'error';
                    node.valor = null;
                    throw new Error("División por cero no permitida");
                } else if (tipoIzq === 'int' && tipoDer === 'int') {
                    node.tipo = 'int';
                    node.valor = izq / der;
                    return node.valor;
            
                } else if (tipoIzq === 'float' || tipoDer === 'float') {
                    node.tipo = 'float';
                    node.valor = izq / der;
                    return parseFloat(node.valor);
            
                } else if (tipoIzq === 'float' && tipoDer === 'float') {
                    node.tipo = 'float';
                    node.valor = izq / der;
                    return parseFloat(node.valor);
            
                } else {
                    //-----------------ERROR ---------------
                    console.error("Error de tipado");
                    node.tipo = 'error';
                    node.valor = null;
                    throw new Error(`Error de tipado: ${tipoIzq} / ${tipoDer}`);
                }
            case '%':
                if (der === 0) {
                    // error de division por cero
                    console.error("Error: División por cero");
                    node.tipo = 'error';
                    node.valor = null;
                    throw new Error("División por cero no permitida");
                } else if (tipoIzq === 'int' && tipoDer === 'int') {
                    node.tipo = 'int';
                    node.valor = izq % der;
                    return node.valor;
            
                }  else {
                    //-----------------ERROR ---------------
                    console.error("Error de tipado");
                    node.tipo = 'error';
                    node.valor = null;
                    throw new Error(`Error de tipado: ${tipoIzq} % ${tipoDer}`);
                }
            default:
                throw new Error(`Operador no soportado: ${node.op}`);
        }
    }

    /**
      * @type {BaseVisitor['visitOperacionUnaria']}
      */
    visitOperacionUnaria(node) {
        const exp = node.exp.accept(this);

        switch (node.op) {
            case '-':
                node.valor = -exp;
                node.tipo = node.exp.tipo;
                console.log("OperacionUnaria", node.valor, node.tipo);
                return node.valor;
            default:
                throw new Error(`Operador no soportado: ${node.op}`);
        }
    }

    /**
      * @type {BaseVisitor['visitAgrupacion']}
      */
    visitAgrupacion(node) {
        const valor = node.exp.accept(this);

        node.valor= node.exp.valor;
        node.tipo = node.exp.tipo;
        console.log("Agrupacion", node.valor, node.tipo);
        return valor;

    }

    /**
      * @type {BaseVisitor['visitPrimitivos']}
      */
    visitPrimitivos(node) {
        if (node.tipo === "string" && typeof node.valor === "string") {
            // quita las ""
            if (node.valor.length > 1 &&
                ((node.valor.startsWith('"') && node.valor.endsWith('"')) || 
                (node.valor.startsWith("'") && node.valor.endsWith("'")))) {
                node.valor = node.valor.slice(1, -1); // se actualiza el valor
            }
        }

        return node.valor;
    }
    

    /**
     * @type {BaseVisitor['visitDeclaracionVariable']}
     */
    visitDeclaracionVariable(node) {
        const nombreVariable = node.id;
        const valorVariable = node.exp.accept(this);
        //AGREGAR  EL TIPADO NECESARIO

        node.valor = valorVariable;
        node.tipo = node.exp.tipo;

        console.log("DeclaracionVariable", node.valor, node.tipo);


//!!-------------------NECESARIOS GUARDAR EL TIPADO PARA REFERENCIA 
        this.entornoActual.setVariable(nombreVariable, valorVariable);
        
    }


    /**
      * @type {BaseVisitor['visitReferenciaVariable']}
      */
    visitReferenciaVariable(node) {
        const nombreVariable = node.id;
        return this.entornoActual.getVariable(nombreVariable);
    }


    /**
      * @type {BaseVisitor['visitPrint']}
      */

    //SI HAY UN NUMERO/STRING DEVUELVE EL OBJETO, EN CAMBIO SI YA PASO POR SUMA RESTA ETC DEVUELVE EL VALOR
    visitPrint(node) {
        const valorPrint = node.exp.accept(this);
        this.salida += valorPrint + '\n';
    }


    /**
      * @type {BaseVisitor['visitExpresionStatement']}
      */
    visitExpresionStatement(node) {
        node.exp.accept(this);
    }

}