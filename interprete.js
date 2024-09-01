import { Entorno } from "./entorno.js";
import { CasesSwitch } from "./nodos.js";
import { BaseVisitor } from "./visitor.js";
import { AlienFunc } from "./AlienFunc.js";
import nodos, { Expresion } from './nodos.js'
import { BreakException, ContinueException, ReturnException } from "./stcTranz.js";
import { Invoke } from "./invoke.js";
import { native } from "./nativeFunc.js";
//import { AlienFunc } from "./AlienFunc.js";
// SE COPIA DEL VISITOR.JS PARA REALIZAR LA IMPLEMENTACION 

export class InterpreterVisitor extends BaseVisitor {

    constructor(symbols, errores) {
        super();
        //nuevos entornos con nuevos bloques!!
        this.entornoActual = new Entorno();
        this.symbols = symbols;
        this.errores = errores;

        this.flowControlContinue = null;
        //LA RESPUESTA QUE SE VA A MOSTRAR en sonsola
        this.salida = '';
        this.reservedWords = [
            'while', 'for', 'if', 'else', 'break', 'continue', 'return', 'switch', 'case', 'default', 
            'System.out.println', 'int', 'float', 'boolean', 'char', 'string', 'true', 'false', 'null', 'void', 'var', 'length', 'var', 'join()','join', 'indexOf','struct', 'var', 'parsefloat', 'parsefloat()', 'toString', 'tolowerCase', 'parseInt', 'toUpperCase', 'typeof'
        ];

        Object.entries(native).forEach(([nombre, funcion]) => {
            this.entornoActual.addVariable(nombre, funcion);
        });

    }


//AGREGAR ESTO ES SOLO PARA TENER LA INFO

    /**
      * @type {BaseVisitor['visitOperacion']}
      */
    visitOperacion(node) {
        //regresa el numero
        const izq = node.izq.accept(this);
        const der = node.der.accept(this);
        //console.log("Operacion", izq, node.op, der);

        const tipoIzq = node.izq.tipo;
        const tipoDer = node.der.tipo

        switch (node.op) {
            case '+':
                // tipado
                if (tipoIzq === 'int' && tipoDer === 'int') {
                    node.tipo = 'int';
                    node.valor = izq + der;
                    return node.valor;

                } else if ((tipoIzq === 'float' || tipoDer === 'float') &&(tipoIzq === 'int' || tipoDer === 'int')) {
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
                    //console.error("Error de tipado");
                    node.tipo = 'error';
                    node.valor = null;
                    console.log(`Error de tipado: ${tipoIzq} + ${tipoDer}`);
                    this.errores.addError("semantico", `Error de tipado: ${tipoIzq} + ${tipoDer}`, node.location.end.line, node.location.end.column);
                    return null;
                    //throw new Error(`Error de tipado: ${tipoIzq} + ${tipoDer}`);
                }
            case '-':
                if (tipoIzq === 'int' && tipoDer === 'int') {
                    node.tipo = 'int';
                    node.valor = izq - der;
                    return node.valor;

                } else if ((tipoIzq === 'float' || tipoDer === 'float') &&(tipoIzq === 'int' || tipoDer === 'int')) {
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
                    //console.error("Error de tipado");
                    node.tipo = 'error';
                    node.valor = null;
                    console.log(`Error de tipado: ${tipoIzq} - ${tipoDer}`);
                    this.errores.addError("semantico", `Error de tipado: ${tipoIzq} - ${tipoDer}`, node.location.end.line, node.location.end.column);
                    return null;
                    
                }
    
            case '*':

                if (tipoIzq === 'int' && tipoDer === 'int') {
                    node.tipo = 'int';
                    node.valor = izq * der;
                    return node.valor;

                } else if ((tipoIzq === 'float' || tipoDer === 'float') &&(tipoIzq === 'int' || tipoDer === 'int')) {
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
                    //console.error("Error de tipado");
                    node.tipo = 'error';
                    node.valor = null;
                    console.log(`Error de tipado: ${tipoIzq} * ${tipoDer}`);
                    this.errores.addError("semantico", `Error de tipado: ${tipoIzq} * ${tipoDer}`, node.location.end.line, node.location.end.column);
                    return null;

                }
    
            case '/':
                if (der === 0) {
                    // error de division por cero
                    //console.log("--División por cero no permitida");
                    node.tipo = 'error';
                    node.valor = null;
                    console.log("ERROR División por cero no permitida (/)");
                    this.errores.addError("semantico", "División por cero no permitida (/)", node.location.end.line, node.location.end.column);
                    return node.valor;
                } else if (tipoIzq === 'int' && tipoDer === 'int') {
                    node.tipo = 'int';
                    node.valor = izq / der;
                    return node.valor;
            
                } else if ((tipoIzq === 'float' || tipoDer === 'float') &&(tipoIzq === 'int' || tipoDer === 'int')) {
                    node.tipo = 'float';
                    node.valor = izq / der;
                    return parseFloat(node.valor);
            
                } else if (tipoIzq === 'float' && tipoDer === 'float') {
                    node.tipo = 'float';
                    node.valor = izq / der;
                    return parseFloat(node.valor);
            
                } else {
                    //-----------------ERROR ---------------
                    //console.error("Error de tipado");
                    node.tipo = 'error';
                    node.valor = null;
                    console.log(`Error de tipado: ${tipoIzq} / ${tipoDer}`);
                    this.errores.addError("semantico", `Error de tipado: ${tipoIzq} / ${tipoDer}`, node.location.end.line, node.location.end.column);
                    return null;
                }
            case '%':
                if (der === 0) {
                    // error de division por cero
                    //console.log("División por cero no permitida");
                    node.tipo = 'error';
                    node.valor = null;
                    console.log("ERROR División por cero no permitida (%)");
                    this.errores.addError("semantico", "División por cero no permitida (%)", node.location.end.line, node.location.end.column);
                    return node.valor;
                } else if (tipoIzq === 'int' && tipoDer === 'int') {
                    node.tipo = 'int';
                    node.valor = izq % der;
                    return node.valor;
            
                }  else {
                    //-----------------ERROR ---------------
                    //console.error("Error de tipado");
                    node.tipo = 'error';
                    node.valor = null;
                    console.log(`Error de tipado: ${tipoIzq} % ${tipoDer}`);
                    this.errores.addError("semantico", `Error de tipado: ${tipoIzq} % ${tipoDer}`, node.location.end.line, node.location.end.column);
                    return null;
                }

                case '>=':
                    //(tipoIzq === 'float' || tipoDer === 'float') &&(tipoIzq === 'int' || tipoDer === 'int')
                    if ((tipoIzq === 'int' || tipoIzq === 'float') && (tipoDer === 'int' || tipoDer === 'float')) {
                        node.tipo = 'boolean';
                        node.valor = izq >= der;

                        return node.valor;
                    } else if (tipoIzq === 'char' && tipoDer === 'char') {
                        const izqChar = izq.replace(/['"]+/g, '');
                        const derChar = der.replace(/['"]+/g, '');
                
                        node.tipo = 'boolean';
                        node.valor = izqChar.charCodeAt(0) >= derChar.charCodeAt(0);
                        return node.valor;
                    }
                    else {
                        //-----------------ERROR ---------------
                        //console.error("Error de tipado");
                        node.tipo = 'error';
                        node.valor = null;
                        //console.log("Error de tipado: ", tipoIzq, tipoDer);
                        console.log(`Error de tipado: ${tipoIzq} >= ${tipoDer}`);
                        this.errores.addError("semantico",`Error de tipado: ${tipoIzq} >= ${tipoDer}`, node.location.end.line, node.location.end.column);
                        return null;
                    }
        
                case '<=':
                    if ((tipoIzq === 'int' || tipoIzq === 'float') && (tipoDer === 'int' || tipoDer === 'float')) {
                        node.tipo = 'boolean';
                        node.valor = izq <= der;
                        return node.valor;
                    } else if (tipoIzq === 'char' && tipoDer === 'char') {
                        const izqChar = izq.replace(/['"]+/g, '');
                        const derChar = der.replace(/['"]+/g, '');
                
                        node.tipo = 'boolean';
                        node.valor = izqChar.charCodeAt(0) <= derChar.charCodeAt(0);
                        return node.valor;
                    }else {
                        //-----------------ERROR ---------------
                        //console.error("Error de tipado");
                        node.tipo = 'error';
                        node.valor = null;
                        console.log(`Error de tipado: ${tipoIzq} <= ${tipoDer}`);
                        this.errores.addError("semantico",`Error de tipado: ${tipoIzq} <= ${tipoDer}`, node.location.end.line, node.location.end.column);
                        return null;
                    }

                    case '>':
                        if ((tipoIzq === 'int' || tipoIzq === 'float') && (tipoDer === 'int' || tipoDer === 'float')) {
                            node.tipo = 'boolean';
                            node.valor = izq > der;
                            return node.valor;
                        } else if (tipoIzq === 'char' && tipoDer === 'char') {
                            //console.log("char", izq, der);
                            const izqChar = izq.replace(/['"]+/g, '');
                            const derChar = der.replace(/['"]+/g, '');
                    
                            //console.log ("char>", izqChar, derChar);
                            node.tipo = 'boolean';
                            node.valor = izqChar.charCodeAt(0) > derChar.charCodeAt(0);
                            return node.valor;
                        } else {
                            //-----------------ERROR ---------------
                            //console.error("Error de tipado");
                            node.tipo = 'error';
                            node.valor = null;
                            console.log(`Error de tipado: ${tipoIzq} > ${tipoDer}`);
                            this.errores.addError("semantico",`Error de tipado: ${tipoIzq} > ${tipoDer}`, node.location.end.line, node.location.end.column);
                            return null;
                        }
            
                    case '<':
                        if ((tipoIzq === 'int' || tipoIzq === 'float') && (tipoDer === 'int' || tipoDer === 'float')) {
                            node.tipo = 'boolean';
                            node.valor = izq < der;
                            return node.valor;
                        } else if (tipoIzq === 'char' && tipoDer === 'char') {
                            const izqChar = izq.replace(/['"]+/g, '');
                            const derChar = der.replace(/['"]+/g, '');
                    
                            node.tipo = 'boolean';
                            node.valor = izqChar.charCodeAt(0) < derChar.charCodeAt(0);
                            return node.valor;
                        } else {
                            //-----------------ERROR ---------------
                            //console.error("Error de tipado");
                            node.tipo = 'error';
                            node.valor = null;
                            console.log(`Error de tipado: ${tipoIzq} < ${tipoDer}`);
                            this.errores.addError("semantico",`Error de tipado: ${tipoIzq} < ${tipoDer}`, node.location.end.line, node.location.end.column);
                            return null;
                        }
                    
                        case '==':
                            if ((tipoIzq === 'int' || tipoIzq === 'float') && (tipoDer === 'int' || tipoDer === 'float')) {
                                node.tipo = 'boolean';
                                node.valor = (izq == der);
                                return node.valor;
                            } else if (tipoIzq === 'boolean' && tipoDer === 'boolean') {
    
                                node.tipo = 'boolean';
                                node.valor = (izq == der);
                                return node.valor;
                            } else if (tipoIzq === 'char' && tipoDer === 'char') {
                                const izqChar = izq.replace(/['"]+/g, '');
                                const derChar = der.replace(/['"]+/g, '');
                        
                                node.tipo = 'boolean';
                                node.valor = (izqChar.charCodeAt(0) == derChar.charCodeAt(0));
                                return node.valor;
                            } else if (tipoIzq === 'string' && tipoDer === 'string') {
                        
                                node.tipo = 'boolean';
                                node.valor = (izq == der);
                                return node.valor;
                            } else {
                                //-----------------ERROR ---------------
                                //console.error("Error de tipado");
                                node.tipo = 'error';
                                node.valor = null;
                                console.log(`Error de tipado: ${tipoIzq} == ${tipoDer}`);
                                this.errores.addError("semantico",`Error de tipado: ${tipoIzq} == ${tipoDer}`, node.location.end.line, node.location.end.column);
                                return null;
                            }
                
                        case '!=':
                            if ((tipoIzq === 'int' || tipoIzq === 'float') && (tipoDer === 'int' || tipoDer === 'float')) {
                                node.tipo = 'boolean';
                                node.valor = (izq != der);
                                return node.valor;
                            } else if (tipoIzq === 'boolean' && tipoDer === 'boolean') {
        
                                node.tipo = 'boolean';
                                node.valor = (izq != der);
                                return node.valor;
                            } else if (tipoIzq === 'char' && tipoDer === 'char') {
                                const izqChar = izq.replace(/['"]+/g, '');
                                const derChar = der.replace(/['"]+/g, '');
                        
                                node.tipo = 'boolean';
                                node.valor = (izqChar.charCodeAt(0) != derChar.charCodeAt(0));
                                return node.valor;
                            } else if (tipoIzq === 'string' && tipoDer === 'string') {
                        
                                node.tipo = 'boolean';
                                node.valor = (izq != der);
                                return node.valor;
                            } else {
                                //-----------------ERROR ---------------
                                //console.error("Error de tipado");
                                node.tipo = 'error';
                                node.valor = null;
                                console.log(`Error de tipado: ${tipoIzq} != ${tipoDer}`);
                                this.errores.addError("semantico",`Error de tipado: ${tipoIzq} != ${tipoDer}`, node.location.end.line, node.location.end.column);
                                return null;
                            }

                            case '&&':
                                if ((tipoIzq === 'boolean') && ( tipoDer === 'boolean')) {
                                    node.tipo = 'boolean';
                                    node.valor = izq && der;
                                    return node.valor;
                                } else {
                                    //-----------------ERROR ---------------
                                    //console.error("Error de tipado");
                                    node.tipo = 'error';
                                    node.valor = null;
                                    console.log(`Error de tipado: ${tipoIzq} && ${tipoDer}`);
                                    this.errores.addError("semantico",`Error de tipado: ${tipoIzq} && ${tipoDer}`, node.location.end.line, node.location.end.column);
                                    return null;
                                }
        
                            case '||':
                                if ((tipoIzq === 'boolean') && ( tipoDer === 'boolean')) {
                                    node.tipo = 'boolean';
                                    node.valor = izq || der;
                                    return node.valor;
                                } else {
                                    //-----------------ERROR ---------------
                                    //console.error("Error de tipado");
                                    node.tipo = 'error';
                                    node.valor = null;
                                    console.log(`Error de tipado: ${tipoIzq} || ${tipoDer}`);
                                    this.errores.addError("semantico",`Error de tipado: ${tipoIzq} || ${tipoDer}`, node.location.end.line, node.location.end.column);
                                    return null;
                                }
            default:
                console.log(`Error Operador no soportado: ${node.op}`);
                this.errores.addError("semantico",`Error Operador no soportado: ${node.op}`, node.location.end.line, node.location.end.column);
                return null;
        }
    }

    /**
      * @type {BaseVisitor['visitUnaria']}
      */
    visitUnaria(node) {
        const exp = node.exp.accept(this);

        switch (node.op) {
            case '-':
                if (node.exp.tipo === 'int'||node.exp.tipo === 'float') {
                node.valor = -exp;
                node.tipo = node.exp.tipo;
                //console.log("Unaria", node.valor, node.tipo);
                return node.valor;
            } else {
                console.log(`Error de tipos: Se esperaba un valor int/float en la operación '!', pero se encontró ${node.exp.tipo}.`);
                this.errores.addError("semantico",`Error de tipos: Se esperaba un valor int/float en la operación '-', pero se encontró ${node.exp.tipo}.`, node.location.end.line, node.location.end.column);
                return null;
            }

            case '!':
                if (node.exp.tipo === 'boolean') {
                    node.valor = !exp;
                    node.tipo = 'boolean';
                    //console.log("Unaria", node.valor, node.tipo);
                    return node.valor;
                } else {
                    console.log(`Error de tipos: Se esperaba un valor booleano en la operación '!', pero se encontró ${node.exp.tipo}.`);
                    this.errores.addError("semantico",`Error de tipos: Se esperaba un valor int/float en la operación '!', pero se encontró ${node.exp.tipo}.`, node.location.end.line, node.location.end.column);
                    return null;
                }
            default:
                console.log(`ERROR Operador no soportado: ${node.op}`);
                this.errores.addError("semantico",`ERROR Operador no soportado: ${node.op}`, node.location.end.line, node.location.end.column);
                return null;
        }
    }

    /**
      * @type {BaseVisitor['visitAgrupacion']}
      */
    visitAgrupacion(node) {
        const valor = node.exp.accept(this);

        node.valor= node.exp.valor;
        node.tipo = node.exp.tipo;
        //console.log("Agrupacion", node.valor, node.tipo);
        return valor;

    }

    /**
      * @type {BaseVisitor['visitPrimitivos']}
      */
    visitPrimitivos(node) {
        //console.log("Primitivos", node);
        if (node.tipo === "string" && typeof node.valor === "string") {
            // quita las ""
            if (node.valor.length > 1 &&
                ((node.valor.startsWith('"') && node.valor.endsWith('"')) || 
                (node.valor.startsWith("'") && node.valor.endsWith("'")))) {
                node.valor = node.valor.slice(1, -1); // se actualiza el valor
            }
        }else if (node.tipo == "char" && typeof node.valor == "string") {
            if ( (node.valor.startsWith('"') && node.valor.endsWith('"')) || 
            (node.valor.startsWith("'") && node.valor.endsWith("'"))) {
                //console.log("entrando al slice del char");
                //console.log(node.valor.length);
                node.valor = node.valor.slice(1, -1); 
                //console.log(node.valor);
            }
        }

        return node.valor;
    }
    
    /**
     * @type {BaseVisitor['visitBrackets']}
     */
    visitBrackets(node) {
        const previousEn = this.entornoActual;
        this.entornoActual = new Entorno(previousEn);
        //console.log(this.entornoActual);
//no eliminando solo apuntando 
        node.declaraciones.forEach(declacion => declacion.accept(this));

        this.entornoActual = previousEn;
    }


    /**
     * @type {BaseVisitor['visitDeclaracionVar']}
     */
    visitDeclaracionVar(node) {
        const nombreVariable = node.id;

        if (this.reservedWords.includes(nombreVariable)) {
            console.log(`Error: '${nombreVariable}' es una palabra reservada y no puede ser usada como nombre de variable.`);
            this.errores.addError("semantico", `Error: '${nombreVariable}'es una palabra reservada y no puede ser usada como nombre de variable.`, node.location.end.line, node.location.end.column);
            return null;
        }

        const valorVariable = node.exp.accept(this);
        const infoVariable = this.entornoActual.getBracketVar(nombreVariable);
        node.valor = valorVariable;
        node.tipo = node.exp.tipo;

        if(infoVariable != null){
            console.log("Error: Variable ya declarada en el entorno actual");
            this.errores.addError("semantico",`Error: Variable ${nombreVariable} ya declarada en el entorno actual`, node.location.end.line, node.location.end.column);
            return null;

        }else{

            console.log("DeclaracionVariable(var):", nombreVariable, valorVariable, node.tipo, "variable", node.location.end.line, node.location.end.column);
            this.entornoActual.addVariable(nombreVariable, valorVariable, node.tipo, "variable", node.location.end.line, node.location.end.column);
            this.symbols.addVariable(nombreVariable, valorVariable, node.tipo, "variable", node.location.end.line, node.location.end.column);
        }

}


    /**
     * @type {BaseVisitor['visitDeclaracionVarTipo']}
     */
    visitDeclaracionVarTipo(node) {
        const nombreVariable = node.id;
    //console.log("nodo", node);

    if (this.reservedWords.includes(nombreVariable)) {
        console.log(`Error: '${nombreVariable}' es una palabra reservada y no puede ser usada como nombre de variable.`);
        this.errores.addError("semantico", `Error: '${nombreVariable}'es una palabra reservada y no puede ser usada como nombre de variable.`, node.location.end.line, node.location.end.column);
        return null;
    }

    const infoVariable = this.entornoActual.getBracketVar(nombreVariable);
        if(infoVariable != null){
            console.log("Error: Variable ya declarada");
            this.errores.addError("semantico",`Error: Variable ${nombreVariable} ya declarada en el entorno actual`, node.location.end.line, node.location.end.column);
            return null;

        }else{

            if (node.exp) {
            const valorVariable = node.exp.accept(this);

                if (node.exp.tipo == node.tipoz) {
                    //console.log(node.exp.tipo, node.tipoz);
                    node.valor = valorVariable;
                    node.tipo = node.exp.tipo;
                    console.log("DeclaracionVariable(TIPADO):", nombreVariable, valorVariable, node.tipo, "variable", node.location.end.line, node.location.end.column);
                    this.entornoActual.addVariable(nombreVariable, valorVariable, node.tipo, "variable", node.location.end.line, node.location.end.column);
                    this.symbols.addVariable(nombreVariable, valorVariable, node.tipo, "variable", node.location.end.line, node.location.end.column);
                    

                }else if(node.tipoz=="float" && node.exp.tipo=="int"){
                    node.valor = parseFloat(valorVariable);
                    node.tipo = "float";
                    console.log("DeclaracionVariable(TIPADO):", nombreVariable, valorVariable, node.tipo, "variable", node.location.end.line, node.location.end.column);
                    this.entornoActual.addVariable(nombreVariable, valorVariable, "float", "variable", node.location.end.line, node.location.end.column);
                    this.symbols.addVariable(nombreVariable, valorVariable, "float", "variable", node.location.end.line, node.location.end.column);
                }
                else{
                    console.log(`ERROR DE TIPOS, tipo del valor declarado ${node.exp.tipo} - tipo declarado ${node.tipoz}`);
                    this.errores.addError("semantico",`ERROR DE TIPOS, tipo del valor declarado ${node.exp.tipo} - tipo declarado ${node.tipoz}`, node.location.end.line, node.location.end.column);

                }
            }else {
                //console.log("no hay exp");
                node.valor = null;
                node.tipo = node.tipoz;
                console.log("DeclaracionVariable(TIPADO-no exp):", nombreVariable, null, node.tipo, "variable", node.location.end.line, node.location.end.column);
                this.entornoActual.addVariable(nombreVariable, null, node.tipo, "variable", node.location.end.line, node.location.end.column);
                this.symbols.addVariable(nombreVariable, null, node.tipo, "variable", node.location.end.line, node.location.end.column);
            }
        }

}


    /**
      * @type {BaseVisitor['visitRefVar']}
      */
    visitRefVar(node) {

        const nombreVariable = node.id;
        const infoVariable = this.entornoActual.getVariable(nombreVariable);
        //console.log("RefVar---INICIO", node.valor, node.tipo);

        if(infoVariable != null){ 

        node.valor = infoVariable.valor;
        node.tipo = infoVariable.tipo;
        //console.log("RefVar---FINAL", node);
        return node.valor;
        } 
        else {
                console.log(`Error: Variable ${nombreVariable} no definida`);
                this.errores.addError("semantico",`Error: Variable ${nombreVariable} no definida`, node.location.end.line, node.location.end.column);
                node.valor = null;
                node.tipo = 'error';
                return null ;
        }
    }


    /**
      * @type {BaseVisitor['visitPrint']}
      */

//----------->>>>>>>>>>>>STATEMENTS
    //SI HAY UN NUMERO/STRING DEVUELVE EL OBJETO, EN CAMBIO SI YA PASO POR SUMA RESTA ETC DEVUELVE EL VALOR
    visitPrint(node) {
        node.Listaexp.forEach(exp => {
            let valorPrint = exp.accept(this);
            console.log("Print", exp);

            if (exp.tipo === 'string' && exp.valor != null && exp.valor!= undefined && !Array.isArray(exp.valor) ) {
            valorPrint = valorPrint
            .replace(/\\\\/g, '\\')   // UN SOLO SLASH
            .replace(/\\"/g, '"')     // UN SOLO QUOTE
            .replace(/\\t/g, '    ')   // EL TAB
            .replace(/\\n/g, '\n')
            .replace(/\\r/g, '\r');}

            this.salida += valorPrint + '\n';
        });
    }

//IF
    /**
     * @type {BaseVisitor['visitIf']}
     */
    visitIf(node) {
            const conditionIf = node.condition.accept(this);
        
            if (conditionIf) {
                node.trueBracket.accept(this);
            } else if (node.falseBracket) {
                node.falseBracket.accept(this);
            }

    }

//WHILE
    /**
     * @type {BaseVisitor['visitWhile']}
     */
    visitWhile(node) {
        const startingEn = this.entornoActual;
        const tipadoCond = node.condition.accept(this);

        try {
            
            if (tipadoCond !== true && tipadoCond !== false) {
                console.log("Error: Se esperaba una condicion booleana en el while");
                this.errores.addError("semantico",`Error: Se esperaba una condicion booleana en el while`, node.location.end.line, node.location.end.column);
                return;
            }

            while (node.condition.accept(this)) {
                node.whileBracket.accept(this);
                //console.log("dentro while");
            }

        }catch (error) {
        this.entornoActual = startingEn;
// aca solo se rompe el while
        if (error instanceof BreakException) {
            console.log('break');
            return
        }

        //llevar la cuenta de que se tiene que continuar - rec
        if (error instanceof ContinueException) {
            return this.visitWhile(node);
        }

/*            console.log('Error  while:', error);
            this.errores.addError("semantico",`Error dentro de While`, node.location.end.line, node.location.end.column);
*/ 
        throw error;

        }
    }


    //FOR
    /**
     * @type {BaseVisitor['visitFor']}
     */
    visitFor(node) {
        //try {
        // va a controlar el flujo para cuando se usan continues y breaks
        const prevFlow = this.flowControlContinue;
        this.flowControlContinue = node.update;

        const imp_For_bw = new nodos.Brackets({
            declaraciones: [
                node.initialization,
                new nodos.While({
                    condition: node.condition,
                    whileBracket: new nodos.Brackets({
                        declaraciones: [
                            node.forBracket,
                            node.update
                        ]
                    })
                })
            ]
        })

        imp_For_bw.accept(this);

        this.flowControlContinue = prevFlow;

        /*}catch (error) {
            console.log('Error  for:', error);
            this.errores.addError("semantico",`Error dentro del FOR`, node.location.end.line, node.location.end.column);
        }*/
    }


    //-------- TRANSFERENCIA -> CONTINUE, RETURN Y BREAK
        /**
     * @type {BaseVisitor['visitBreak']}
     */
        visitBreak(node) {
            throw new BreakException();
        }
    
        /**
         * @type {BaseVisitor['visitContinue']}
         */
        visitContinue(node) {
            if (this.flowControlContinue) {
                this.flowControlContinue.accept(this);
            }
    
            throw new ContinueException();

        }
    
        /**
         * @type {BaseVisitor['visitReturn']}
         */
        visitReturn(node) {
            let rtnValue = null
            let rtnTipo = null
            if (node.exp) {

                if(Array.isArray(node.exp)){
                    rtnValue = node.exp.map(ex => ex.accept(this));
                    const pruebaTipo = this.processMatrixTipo(node.exp);
                    rtnTipo = this.checkAllSame(pruebaTipo);
                    node.valor = rtnValue;
                    node.tipo = node.exp.tipo;
                }else{
                    node.valor = node.exp.accept(this);
                node.tipo = node.exp.tipo
                rtnValue = node.exp.accept(this);
                rtnTipo = node.exp.tipo;
                }
                
            }
            console.log("ReturniNTER", node);
            throw new ReturnException(rtnValue, rtnTipo);
        }

 //----------------------switch---------------------------------------
    /**
     * @type {BaseVisitor['visitSwitch']}
     */
    visitSwitch(node) {

        const startingEn = this.entornoActual;
        try {

                const switchValue = node.exp.accept(this);
                let matched = false;
                console.log ("[Switch]", node);
                

                for (const caseNode of node.cases) {
                        const caseValue = caseNode.valorCase.accept(this);
                        console.log("caseNode", caseNode.declaraciones);
                        // compara los casos
                        if (caseValue === switchValue && caseNode.valorCase.tipo === node.exp.tipo) {
                            const previousEn = this.entornoActual;
                            this.entornoActual = new Entorno(previousEn);
                            matched = true; //que si ya entro no salga
                            caseNode.declaraciones.forEach(declacion => declacion.accept(this));
                            this.entornoActual = previousEn;
                            node.valor = caseValue;
                            node.tipo = caseNode.valorCase.tipo;
                            break; 
                        }
                }

                // si no hay un case que coincida con el valor del switch
                if (!matched) {
                    console.log("default");
                    if (node.Default) {
                        console.log("default");
                        node.valor = "null";
                        node.tipo = "default";
                        node.Default.accept(this); // execute default
                    }
                }
            }catch (error) {
                this.entornoActual = startingEn;
        // romper el caso
            if (error instanceof BreakException) {
                console.log('break');
                return
            }

            
            if (error instanceof ContinueException) {
                this.errores.addError("semantico",`continue dentro de un switch`, node.location.end.line, node.location.end.column);
                
            }



            throw error;

            }

    }
//CasesSwitch

    /**
     * @type {BaseVisitor['visitCasesSwitch']}
     */
    visitCasesSwitch(node) {
        //const previousEn = this.entornoActual;
        //this.entornoActual = new Entorno(previousEn);
        //console.log("visirCasesSwitch", node);
//no eliminando solo apuntando
        node.valor = node.valorCase.accept(this);
        node.tipo = node.valorCase.tipo;
        //node.declaraciones.forEach(declacion => declacion.accept(this));

        //this.entornoActual = previousEn;
    }





        //TERNARIO
    /**
     * @type {BaseVisitor['visitTernario']}
     */
    visitTernario(node) {
        //console.log ("Ternario", node);
        
        try {
            const TernarioValor = node.condition.accept(this) ? node.TrueB.accept(this) : node.FalseB.accept(this);
            //console.log(TernarioValor);
            //console.log("dentro ternario");
            node.valor = TernarioValor;
            const tipoTrue = node.TrueB.tipo;
            const tipoFalse = node.FalseB.tipo;
            node.tipo = node.condition.accept(this) ? tipoTrue : tipoFalse;
            return node.valor;
            //node.tipo = node.condition.accept(this) ? node.TrueB.accept(this) : node.FalseB.accept(this);

        }catch (error) {
            console.log('Error  Ternario:', error);
            this.errores.addError("semantico",`Error dentro operador ternario`, node.location.end.line, node.location.end.column);
        }
    }

    /**
      * @type {BaseVisitor['visitExpresionStatement']}
      */
    visitExpresionStatement(node) {
        const mainexp = node.exp.accept(this);
        node.valor = mainexp;
        node.tipo = node.exp.tipo;
        console.log("ExpresionStatement", mainexp, node.exp.tipo);
    }
//OJO --> VER SI EXPRESSIONSTATEMENT NECESITA REGRESAR VALOR Y TIPO

    getMultiDimensionalArrayLength(array) {
        if (!Array.isArray(array)) {
            return 0;
        }
        let length = 0;
        for (let i = 0; i < array.length; i++) {
            if (Array.isArray(array[i])) {
                length += this.getMultiDimensionalArrayLength(array[i]);
            } else {
                length++;
            }
        }
        return length;
    }


    visitAssign(node) {
        const nombreVariable = node.id;
        const infoVariable = this.entornoActual.getVariable(nombreVariable);
        
        if (infoVariable == null) {
            console.log(`Error: Variable ${nombreVariable} no definida`);
            this.errores.addError("semantico",`Error: Variable ${nombreVariable} no definida`, node.location.end.line, node.location.end.column);
            node.valor = null;
            node.tipo = 'error';
            return null;
        }

        
        switch (node.op) {
        //console.log("azzzign", node.assign.tipo, node.assign.valor);

            case '=':
                
            if(Array.isArray(node.assign)){
                console.log("arrayISarray", node)
                const dimensionExp = this.getArrayDimensions(node.assign);

                if(dimensionExp==1){
                const valorArreglo = node.assign.map(assg => assg.accept(this));
                const tipoArreglo = node.assign.map(assg => assg.tipo);
                const tipoArregloFinal = this.checkAllSame(tipoArreglo);

                if (tipoArregloFinal != infoVariable.tipo){
                        console.log("ERROR arreglo - error de tipos en el arreglo");
                        this.errores.addError("semantico","ERROR arreglo - error de tipos en el arreglo", node.location.end.line, node.location.end.column);
                        node.valor = null;
                        node.tipo = "error";
                        return null;
                }
                const dimensionValor = this.getArrayDimensions(infoVariable.valor);
                if (dimensionValor !== dimensionExp || infoVariable.valor.length !== valorArreglo.length){
                        console.log("ERROR arreglo - el tamaño/dimension no coinciden");
                        this.errores.addError("semantico","ERROR arreglo- el tamaño/dimension no coinciden", node.location.end.line, node.location.end.column);
                        node.valor = null;
                        node.tipo = "error";
                        return null;

                }

                this.entornoActual.updateVariable(node.id, valorArreglo);
                this.symbols.updateVariable(node.id, valorArreglo);
                node.valor =valorArreglo;
                node.tipo = infoVariable.tipo;
                return valorArreglo;


                }else{
                    const valorArreglo = this.processMatrix(node.assign);
                    const tipoArreglo = this.processMatrixTipo(node.assign);
                    const tipoArregloFinal = this.checkAllSame(tipoArreglo);

                if (tipoArregloFinal != infoVariable.tipo){
                        console.log("ERROR matriz - error de tipos en el arreglo");
                        this.errores.addError("semantico","ERROR matriz - error de tipos en el arreglo", node.location.end.line, node.location.end.column);
                        node.valor = null;
                        node.tipo = "error";
                        return null;
                }

                const dimensionValor = this.getArrayDimensions(infoVariable.valor);
                const lengthDeclarado = this.getMultiDimensionalArrayLength(infoVariable.valor);
                const lengthAsignar = this.getMultiDimensionalArrayLength(valorArreglo);
                console.log("length", lengthAsignar, lengthDeclarado);
                if (dimensionValor !== dimensionExp || lengthDeclarado !== lengthAsignar){
                        console.log("ERROR matriz - el tamaño/dimension no coinciden");
                        this.errores.addError("semantico","ERROR matriz- el tamaño/dimension no coinciden", node.location.end.line, node.location.end.column);
                        node.valor = null;
                        node.tipo = "error";
                        return null;

                }

                this.entornoActual.updateVariable(node.id, valorArreglo);
                this.symbols.updateVariable(node.id, valorArreglo);
                node.valor =valorArreglo;
                node.tipo = infoVariable.tipo;
                return valorArreglo;

                }

            }else{
                console.log("ELSEnoArray", node);
                console.log("antes! ", node);
                const valor = node.assign.accept(this);
                console.log("despues! ", node);

                if(Array.isArray(valor)){
                        const dimensionAsignada = this.getArrayDimensions(valor);
                        const dimensionDeclarada = this.getArrayDimensions(infoVariable.valor);
                        console.log("dimensiones", dimensionAsignada, dimensionDeclarada);
                        if(dimensionAsignada !== dimensionDeclarada){
                            console.log("ERROR arreglo - la dimension no coinciden");
                            this.errores.addError("semantico","ERROR arreglo- la dimension no coinciden", node.location.end.line, node.location.end.column);
                            node.valor = null;
                            node.tipo = "error";
                            return null;
                        }

                        if(dimensionAsignada == 1){
                            
                            if(infoVariable.valor.length !== valor.length || infoVariable.tipo !== node.assign.tipo){
                                console.log("ERROR arreglo - la dimension o el tipo no coinciden");
                                this.errores.addError("semantico","ERROR arreglo- la dimension o el tipo no coinciden", node.location.end.line, node.location.end.column);
                                node.valor = null;
                                node.tipo = "error";
                                return null;
                            }
                            this.entornoActual.updateVariable(node.id, valor);
                            this.symbols.updateVariable(node.id, valor);
                            node.valor =valor;
                            node.tipo = infoVariable.tipo;
                            return valor;


                        }else{
                            const lengthDeclarado = this.getMultiDimensionalArrayLength(infoVariable.valor);
                            const lengthAsignar = this.getMultiDimensionalArrayLength(valor);

                            if (infoVariable.tipo !== node.assign.tipo && lengthDeclarado !== lengthAsignar){
                                console.log("ERROR matrix - la dimension o el tipo no coinciden");
                                this.errores.addError("semantico","ERROR matrix - la dimension o el tipo no coinciden", node.location.end.line, node.location.end.column);
                                node.valor = null;
                                node.tipo = "error";
                                return null;
                            }
                            
                            this.entornoActual.updateVariable(node.id, valor);
                            this.symbols.updateVariable(node.id, valor);
                            node.valor =valor;
                            node.tipo = infoVariable.tipo;
                            return valor;

                        }
                }else{
                    
                if(node.assign.tipo == infoVariable.tipo){
                    //const valor = node.assign.accept(this);
                    this.entornoActual.updateVariable(node.id, valor);
                    this.symbols.updateVariable(node.id, valor);
                    node.valor = valor;
                    node.tipo = infoVariable.tipo;
                    return valor;
                } else if (node.assign.tipo == "int" && infoVariable.tipo == "float"){
                    //const valor = node.assign.accept(this);
                    node.valor = parseFloat(valor);
                    node.tipo = "float";
                    this.entornoActual.updateVariable(node.id, parseFloat(valor));
                    this.symbols.updateVariable(node.id, parseFloat(valor));
                    return valor;

                }else {
                    node.valor = null;
                    node.tipo = "error";
                    //!!PREGUNTAR SI SE DEBE ACTUALIZAR EL VALOR DE LA VARIABLE A NULL O SE DEJA IGUAL
                    this.entornoActual.updateVariable(node.id, null);
                    this.symbols.updateVariable(node.id, null);
                    console.log("Error de tipado en asignación, el valor declarado no coincide con el tipo de la variable");
                    this.errores.addError("semantico","Error de tipado en asignación, el valor declarado no coincide con el tipo de la variable", node.location.end.line, node.location.end.column);
                    return ;
                }                
            }
            }

            case '+=':
                node.assign.accept(this)
                if(node.assign.tipo != "int" && node.assign.tipo != "float" && node.assign.tipo != "string"){
                    console.log("Error de tipos (+=) solo trabaja con string/float/int");
                    this.errores.addError("semantico","Error de tipos (+=) solo trabaja con string/float/int", node.location.end.line, node.location.end.column);
                    return null;
                }

                if(node.assign.tipo == infoVariable.tipo){
                    const valor = node.assign.accept(this);
                    const addVariable = infoVariable.valor + valor;
                    this.entornoActual.updateVariable(node.id, addVariable);
                    this.symbols.updateVariable(node.id, addVariable);
                    node.valor = addVariable;
                    node.tipo = infoVariable.tipo;
                    return addVariable;
                } else if (node.assign.tipo == "int" && infoVariable.tipo == "float"){
                    const valor = node.assign.accept(this);
                    const addVariable = infoVariable.valor + valor;
                    node.valor = parseFloat(addVariable);
                    node.tipo = "float";
                    this.entornoActual.updateVariable(node.id, parseFloat(addVariable));
                    this.symbols.updateVariable(node.id, parseFloat(addVariable));
                    return addVariable;
        
                }else {
                    console.log("Error de tipado en asignación, el valor declarado no coincide con el tipo de la variable");
                    this.errores.addError("semantico","Error de tipado en asignación, el valor declarado no coincide con el tipo de la variable", node.location.end.line, node.location.end.column);
    
                    return ;
                }

            case '-=':
                node.assign.accept(this)
                if(node.assign.tipo != "int" && node.assign.tipo != "float"){
                    console.log("Error de tipos (-=) solo trabaja con float/int");
                    this.errores.addError("semantico","Error de tipos (-=) solo trabaja con float/int", node.location.end.line, node.location.end.column);
                    return null;
                }

                if(node.assign.tipo == infoVariable.tipo){
                    const valor = node.assign.accept(this);
                    const addVariable = infoVariable.valor - valor;
                    this.entornoActual.updateVariable(node.id, addVariable);
                    this.symbols.updateVariable(node.id, addVariable);
                    node.valor = addVariable;
                    node.tipo = infoVariable.tipo;
                    return addVariable;
                } else if (node.assign.tipo == "int" && infoVariable.tipo == "float"){
                    const valor = node.assign.accept(this);
                    const addVariable = infoVariable.valor - valor;
                    node.valor = parseFloat(addVariable);
                    node.tipo = "float";
                    this.entornoActual.updateVariable(node.id, parseFloat(addVariable));
                    this.symbols.updateVariable(node.id, parseFloat(addVariable));
                    return addVariable;
        
                }else {
                    console.log("Error de tipado en asignación, el valor declarado no coincide con el tipo de la variable");
                    this.errores.addError("semantico","Error de tipado en asignación, el valor declarado no coincide con el tipo de la variable", node.location.end.line, node.location.end.column);
    
                    return ;
                }
        
    }
    }


                /**
    * @type {BaseVisitor['visitTypeof']}
    */
        visitTypeof(node) {
            node.argumentos.accept(this);

            if (node.argumentos.tipo != null){
                node.valor = node.argumentos.tipo;
                node.tipo = "string";
                return node.valor;
            }else {
                console.log("Error de tipado en typeof");
                this.errores.addError("semantico","Error de tipado en typeof", node.location.end.line, node.location.end.column);
                return null;
            }

        }

        getArrayDimensions(arr) {
            if (!Array.isArray(arr)) {
                return 0; // no es arreglo
            }
            let dimensions = 0;
            while (Array.isArray(arr)) {
                dimensions++;
                arr = arr[0]; // baja las dimensiones
            }
            return dimensions;
        }

        checkAllSame(arr) {
            // tener las dimensiones para recorrer
            const dimensions = this.getArrayDimensions(arr);
            if (dimensions === 0) {
                return null;
                //por si no es un arreglo
            }
            // pasarlo a 1D para recorrer mas facil
            const flatArray = arr.flat(dimensions - 1);
            const repetido = flatArray[0];
            for (let i = 1; i < flatArray.length; i++) {
                if (flatArray[i] !== repetido) {
                    return null; // si no es igual
                }
            }
            return repetido;
        }


        processMatrix(array) {
            return array.map(item => {
                if (Array.isArray(item)) {
                    return this.processMatrix(item); // rec
                } else {
                    return item.accept(this); // cada elemento se evalua
                }
            });
        }

        processMatrixTipo(array) {
            return array.map(item => {
                if (Array.isArray(item)) {
                    return this.processMatrixTipo(item); // rec
                } else {
                    return item.tipo; // cada elemento se evalua
                }
            });
        }

        /**
         * @type {BaseVisitor['visitDeclaracionArreglo']}
         */
        visitDeclaracionArreglo(node){
            //console.log("DeclaracionArreglo1", node.exp);
            const dimensionDeclarada= node.dimension;

            const infoVariable = this.entornoActual.getBracketVar(node.id);

            const nombreVariable = node.id;

            if (this.reservedWords.includes(nombreVariable)) {
                console.log(`Error: '${nombreVariable}' es una palabra reservada y no puede ser usada como nombre de arreglo/matriz`);
                this.errores.addError("semantico", `Error: '${nombreVariable}'es una palabra reservada y no puede ser usada como nombre de arreglo/matriz.`, node.location.end.line, node.location.end.column);
                return;
            }

            if(infoVariable != null){
                console.log("Error: Arreglo/Matriz ya declarada en el entorno actual");
                this.errores.addError("semantico",`Error: Arreglo/Matriz ${nombreVariable} ya declarada en el entorno actual`, node.location.end.line, node.location.end.column);
                return ;
            }
// if ---> new
//else ---> declarados
            if (node.exp.tipoNew !== undefined){
                //referencia a new
                const ValorArreglo = node.exp.accept(this);
                if (node.exp.dimNew == dimensionDeclarada &&  node.exp.tipoNew == node.tipoz){
                    node.valor = ValorArreglo;
                    node.tipo = node.exp.tipoNew;
                    if(dimensionDeclarada==1){
                        console.log("DeclaracionArreglo(new):", node.id, ValorArreglo, node.tipo, "arreglo", node.location.end.line, node.location.end.column);
                        this.entornoActual.addVariable(node.id, ValorArreglo, node.tipo, "arreglo", node.location.end.line, node.location.end.column);
                        this.symbols.addVariable(node.id, ValorArreglo, node.tipo, "arreglo", node.location.end.line, node.location.end.column);
                        return;
                    }
                    console.log("DeclaracionMatrix:", node.id, ValorArreglo, node.tipo, "Matriz", node.location.end.line, node.location.end.column);
                    this.entornoActual.addVariable(node.id, ValorArreglo, node.tipo, "Matriz", node.location.end.line, node.location.end.column);
                    this.symbols.addVariable(node.id, ValorArreglo, node.tipo, "Matriz", node.location.end.line, node.location.end.column);
                    return ;
                }else{
                    console.log("ERROR arreglo/matrix  - error al declarar (tipado o dimensiones no coiciden)");
                    this.errores.addError("semantico","ERROR arreglo/matrix  - error al declarar (tipado o dimensiones no coiciden)", node.location.end.line, node.location.end.column);
                    node.valor = null;
                    node.tipo = "error";
                    return null;
                }


            }else if(node.exp.tipoNew == undefined && node.exp.id !== undefined){
                //referencia a otra variable
                const ValorArreglo = node.exp.accept(this);
                const dimensionExp = this.getArrayDimensions(ValorArreglo);

                //console.log("+++variable encontrada:", ValorArreglo, "dimensiones:", dimensionExp, "valor:", node.exp.valor, "tipo:", node.exp.tipo);

                if ((dimensionDeclarada == dimensionExp) && (node.exp.tipo == node.tipoz)) {
                    node.tipo = node.exp.tipo;
                    node.valor = ValorArreglo;
                    if(dimensionDeclarada==1){
                        console.log("DeclaracionArreglo:", node.id, ValorArreglo, node.tipo, "arreglo", node.location.end.line, node.location.end.column);
                        this.entornoActual.addVariable(node.id, ValorArreglo, node.tipo, "arreglo", node.location.end.line, node.location.end.column);
                        this.symbols.addVariable(node.id, ValorArreglo, node.tipo, "arreglo", node.location.end.line, node.location.end.column);
                        return;
                    }
                    console.log("DeclaracionMatrix:", node.id, ValorArreglo, node.tipo, "Matriz", node.location.end.line, node.location.end.column);
                    this.entornoActual.addVariable(node.id, ValorArreglo, node.tipo, "Matriz", node.location.end.line, node.location.end.column);
                    this.symbols.addVariable(node.id, ValorArreglo, node.tipo, "Matriz", node.location.end.line, node.location.end.column);
                    return ;
                }else{
                    console.log("ERROR matriz - error de tipos en la matriz/arreglo o dimensiones no coinciden");
                    this.errores.addError("semantico","ERROR matriz  - error de tipos en la matriz/arreglo o dimensiones no coinciden", node.location.end.line, node.location.end.column);
                    node.valor = null;
                    node.tipo = "error";
                    return null;
                }

            }else{
                const dimensionExp = this.getArrayDimensions(node.exp);
                if ((dimensionDeclarada == dimensionExp) ) {

                    if(dimensionDeclarada==1){
                        const valorArreglo = node.exp.map(ex => ex.accept(this));
                        const tipoArreglo = node.exp.map(ex => ex.tipo);
                        const tipoArregloFinal = this.checkAllSame(tipoArreglo);

                        if(tipoArregloFinal != node.tipoz){
                            console.log("ERROR arreglo - error de tipos en el arreglo");
                            this.errores.addError("semantico","ERROR arreglo - error de tipos en el arreglo", node.location.end.line, node.location.end.column);
                            node.valor = null;
                            node.tipo = "error";
                            return null;
                        }
                        node.valor = valorArreglo;
                        node.tipo =node.tipoz;
                        console.log("DeclaracionArreglo:", node.id, valorArreglo, node.tipo, "arreglo", node.location.end.line, node.location.end.column);
                        this.entornoActual.addVariable(node.id, valorArreglo, node.tipo, "arreglo", node.location.end.line, node.location.end.column);
                        this.symbols.addVariable(node.id, valorArreglo, node.tipo, "arreglo", node.location.end.line, node.location.end.column);

                    }else{
                        //console.log("MATRICES ACA");
                        const valorArreglo = this.processMatrix(node.exp);
                        const tipoArreglo = this.processMatrixTipo(node.exp);
                        const tipoArregloFinal = this.checkAllSame(tipoArreglo);

                        console.log("MATRIZ", valorArreglo, tipoArreglo, tipoArregloFinal);
                        if(tipoArregloFinal != node.tipoz){
                            console.log("ERROR matrix - error de tipos en la matriz");
                            this.errores.addError("semantico","ERROR matrix  - error de tipos en la matriz", node.location.end.line, node.location.end.column);
                            node.valor = null;
                            node.tipo = "error";
                            return null;
                        }

                        node.valor = valorArreglo;
                        node.tipo = node.tipoz;
                        console.log("DeclaracionMatrix:", node.id, valorArreglo, node.tipo, "Matriz", node.location.end.line, node.location.end.column);
                        this.entornoActual.addVariable(node.id, valorArreglo, node.tipo, "Matriz", node.location.end.line, node.location.end.column);
                        this.symbols.addVariable(node.id, valorArreglo, node.tipo, "Matriz", node.location.end.line, node.location.end.column);
                    }
                }else {
                    console.log("ERROR arreglo/matrix las dimensiones establecidas no coinciden con las dimensiones del arreglo");
                    this.errores.addError("semantico","ERROR arreglo/matrix las dimensiones establecidas no coinciden con las dimensiones del arreglo", node.location.end.line, node.location.end.column);
                    node.valor = null;
                    node.tipo = "error";
                    return null;

                }
            }

        }


        generateNewArray(dimensions, value) {
            if (dimensions.length === 0) {
                return value;
            }
            const currentDimension = dimensions[0];
            const restDimensions = dimensions.slice(1);
            const array = new Array(currentDimension);
            for (let i = 0; i < currentDimension; i++) {
                array[i] = this.generateNewArray(restDimensions, value);
            }
            return array;
        }
        


        checkAllPositive(array) {
            for (let i = 0; i < array.length; i++) {
                if (array[i] <= 0) {
                    return null;
                }
            }
            return true;
        }

                /**
         * @type {BaseVisitor['visitAsignacionArregloNew']}
         */
                visitAsignacionArregloNew(node){
                    const valorArreglo = node.exp.map(ex => ex.accept(this));
                    const tipoDeclarado= node.tipoNew;
                    //console.log("AsignacionArregloNew", valorArreglo);

                    if(this.checkAllPositive(valorArreglo) == null){
                        console.log("Error el arreglo/matrix no puede ser negativoo o 0");
                        this.errores.addError("semantico", "Error el arreglo/matrix no puede ser negativo o 0", node.location.end.line, node.location.end.column);
                        node.valor= null;
                        node.tipo = "error";
                        return null;

                    }


                    let arrayResult;

                    switch (tipoDeclarado) {
                        case "string":
                            arrayResult = this.generateNewArray(valorArreglo, "");
                            
                            break;
                        case "int":
                            arrayResult = this.generateNewArray(valorArreglo, 0);
                            break;
                        case "float":
                            arrayResult = this.generateNewArray(valorArreglo, 0.0);
                            break;
                        case "char":
                            arrayResult = this.generateNewArray(valorArreglo, '\u0000');
                            break;
                        case "boolean":
                            arrayResult = this.generateNewArray(valorArreglo, false);
                            break;
                        default:
                            node.valor= null;
                            node.tipo = "error";
                            console.log("Error en tipo de arreglo");
                            this.errores.addError("semantico", "Error en tipo de arreglo", node.location.end.line, node.location.end.column);
                            return null;
                    }

                    //console.log("Generated Array:", arrayResult);

                    node.tipo = tipoDeclarado;
                    node.valor = arrayResult;
                    return arrayResult;

                }

                accessArrayElement(valorArreglo, valorIndice) {
                    try {
                        let element = valorArreglo;
                        
                        for (let i = 0; i < valorIndice.length; i++) {
                            if (!Array.isArray(element) || valorIndice[i] >= element.length || valorIndice[i] < 0) {
                                console.log('Error: Los indices no coinciden con las dimensiones del arreglo');
                                return null;
                            }
                            element = element[valorIndice[i]];
                        }
                        
                        return element;
                    } catch (error) {
                        console.log('Error: Al momento de acceder al arreglo');
                        return null;
                    }
                }


                checkZeroMayor(array) {
                    for (let i = 0; i < array.length; i++) {
                        if (array[i] < 0) {  
                            return null;
                        }
                    }
                    return true;
                }

                /**
         * @type {BaseVisitor['visitAccederArreglo']}
         */
                visitAccederArreglo(node){
                    const nombreVariable = node.id;
                    const infoVariable = this.entornoActual.getVariable(nombreVariable);

                    if(infoVariable == null){
                        console.log(`Error: Arreglo/Matriz ${nombreVariable} no definida`);
                        this.errores.addError("semantico",`Error: Arreglo/Matriz ${nombreVariable} no definida`, node.location.end.line, node.location.end.column);
                        node.valor = null;
                        node.tipo = 'error';
                        return null;
                    }

                    if(infoVariable.simbType !== "arreglo" && infoVariable.simbType !== "Matriz"){
                        console.log(`Error: ${nombreVariable} no es un arreglo o matriz`);
                        this.errores.addError("semantico",`Error: ${nombreVariable} no es un arreglo o matriz`, node.location.end.line, node.location.end.column);
                        node.valor = null;
                        node.tipo = 'error';
                        return null;
                    }

                    const valorArreglo = infoVariable.valor;
                    const valorIndice = node.exp.map(ex => ex.accept(this));
                    const dimensionDeclarada = this.getArrayDimensions(valorArreglo);
                    
                    if(dimensionDeclarada !== valorIndice.length){
                        console.log(`Error: ${nombreVariable} dimensiones no coinciden`);
                        this.errores.addError("semantico",`Error: ${nombreVariable} dimensiones no coinciden`, node.location.end.line, node.location.end.column);
                        node.valor = null;
                        node.tipo = 'error';
                        return null;
                    }
                    console.log("valorIndice", valorIndice);
                    console.log(this.checkZeroMayor(valorIndice));
                    if(this.checkZeroMayor(valorIndice) == null){
                        console.log("Error no se puede acceder a una posicion negativa");
                        this.errores.addError("semantico", "Error no se puede acceder a una posicion negativa", node.location.end.line, node.location.end.column);
                        node.valor= null;
                        node.tipo = "error";
                        return null;
                    }

                    const ValorAccedido= this.accessArrayElement(valorArreglo, valorIndice);
                    node.valor = ValorAccedido;
                    node.tipo = infoVariable.tipo;
                    return ValorAccedido;

                }


                modifyArrayElement(valorArreglo, valorIndice, valorNuevo) {
                    try {
                        let element = valorArreglo;
                        
                        for (let i = 0; i < valorIndice.length - 1; i++) {
                            if (!Array.isArray(element) || valorIndice[i] >= element.length || valorIndice[i] < 0) {
                                console.log('Error: Los índices no coinciden con las dimensiones del arreglo.');
                                return null;
                            }
                            element = element[valorIndice[i]];
                        }
                        
                        const lastIn = valorIndice[valorIndice.length - 1];
                        if (!Array.isArray(element) || lastIn >= element.length || lastIn < 0) {
                            console.log('Error: El índice final no coincide con las dimensiones del arreglo.');
                            return null;
                        }
                        
                        element[lastIn] = valorNuevo;  
                        
                        return valorArreglo;
                    } catch (error) {
                        console.log('Error: Al momento de modificar el arreglo.');
                        return null;
                    }
                }

                SumArrayElement(valorArreglo, valorIndice, valorNuevo) {
                    try {
                        let element = valorArreglo;
                        
                        for (let i = 0; i < valorIndice.length - 1; i++) {
                            if (!Array.isArray(element) || valorIndice[i] >= element.length || valorIndice[i] < 0) {
                                console.log('Error: Los índices no coinciden con las dimensiones del arreglo.');
                                return null;
                            }
                            element = element[valorIndice[i]];
                        }
                        
                        const lastIn = valorIndice[valorIndice.length - 1];
                        if (!Array.isArray(element) || lastIn >= element.length || lastIn < 0) {
                            console.log('Error: El índice final no coincide con las dimensiones del arreglo.');
                            return null;
                        }
                        
                        element[lastIn] += valorNuevo;  
                        
                        return valorArreglo;
                    } catch (error) {
                        console.log('Error: Al momento de modificar el arreglo.');
                        return null;
                    }
                }

                SubArrayElement(valorArreglo, valorIndice, valorNuevo) {
                    try {
                        let element = valorArreglo;
                        
                        for (let i = 0; i < valorIndice.length - 1; i++) {
                            if (!Array.isArray(element) || valorIndice[i] >= element.length || valorIndice[i] < 0) {
                                console.log('Error: Los índices no coinciden con las dimensiones del arreglo.');
                                return null;
                            }
                            element = element[valorIndice[i]];
                        }
                        
                        const lastIn = valorIndice[valorIndice.length - 1];
                        if (!Array.isArray(element) || lastIn >= element.length || lastIn < 0) {
                            console.log('Error: El índice final no coincide con las dimensiones del arreglo.');
                            return null;
                        }
                        
                        element[lastIn] -= valorNuevo;  
                        
                        return valorArreglo;
                    } catch (error) {
                        console.log('Error: Al momento de modificar el arreglo.');
                        return null;
                    }
                }
        /**
         * @type {BaseVisitor['visitAssignIndiceArreglo']}
         */
                visitAssignIndiceArreglo(node) {
                    const nombreVariable = node.id;
                    const infoVariable = this.entornoActual.getVariable(nombreVariable);
                    let NuevoArreglo;
                    if(infoVariable == null){
                        console.log(`Error: Arreglo/Matriz ${nombreVariable} no definida`);
                        this.errores.addError("semantico",`Error: Arreglo/Matriz ${nombreVariable} no definida`, node.location.end.line, node.location.end.column);
                        node.valor = null;
                        node.tipo = 'error';
                        return null;
                    }

                    if(infoVariable.simbType !== "arreglo" && infoVariable.simbType !== "Matriz"){
                        console.log(`Error: ${nombreVariable} no es un arreglo o matriz`);
                        this.errores.addError("semantico",`Error: ${nombreVariable} no es un arreglo o matriz`, node.location.end.line, node.location.end.column);
                        node.valor = null;
                        node.tipo = 'error';
                        return null;
                    }

                    const valorArreglo = infoVariable.valor;
                    const valorIndice = node.exp.map(ex => ex.accept(this));
                    const dimensionDeclarada = this.getArrayDimensions(valorArreglo);
                    let valorNuevo = node.assign.accept(this);

                    if(infoVariable.tipo !== node.assign.tipo){
                        if(infoVariable.tipo == "float" && node.assign.tipo == "int"){
                            node.assign.tipo = "float";
                            node.assign.valor = valorNuevo*1.0;
                            valorNuevo = valorNuevo*1.0;
                            console.log("VERR", node.assign);
                            //return;
                        }else{
                            console.log(`Error: Error de tipos en la asignación`);
                            this.errores.addError("semantico",`Error: Error de tipos en la asignación`, node.location.end.line, node.location.end.column);
                            node.valor = null;
                            node.tipo = 'error';
                            return null;
                        }
                        
                    }

                    switch(node.op){

                        case "=":
                            NuevoArreglo = this.modifyArrayElement(valorArreglo, valorIndice, valorNuevo);
                            this.entornoActual.updateVariable(node.id, NuevoArreglo);
                            this.symbols.updateVariable(node.id, NuevoArreglo);
                            node.valor = NuevoArreglo;
                            node.tipo = infoVariable.tipo;
                            return NuevoArreglo;

                        case "+=":

                            if(node.assign.tipo !== "int" && node.assign.tipo !== "float" && node.assign.tipo !== "string"){
                                console.log(`Error: Error de tipos en la asignación`);
                                this.errores.addError("semantico",`Error: Error de tipos en la asignación`, node.location.end.line, node.location.end.column);
                                node.valor = null;
                                node.tipo = 'error';
                                return null;
                            }
                            NuevoArreglo = this.SumArrayElement(valorArreglo, valorIndice, valorNuevo);
                            this.entornoActual.updateVariable(node.id, NuevoArreglo);
                            this.symbols.updateVariable(node.id, NuevoArreglo);
                            node.valor = NuevoArreglo;
                            node.tipo = infoVariable.tipo;
                            return NuevoArreglo;

                        case "-=":
                            console.log("[] -=", node);
                            if(node.assign.tipo !== "int" && node.assign.tipo !== "float"){
                                console.log(`Error: Error de tipos en la asignación`);
                                this.errores.addError("semantico",`Error: Error de tipos en la asignación`, node.location.end.line, node.location.end.column);
                                node.valor = null;
                                node.tipo = 'error';
                                return null;
                            }

                            NuevoArreglo = this.SubArrayElement(valorArreglo, valorIndice, valorNuevo);
                            this.entornoActual.updateVariable(node.id, NuevoArreglo);
                            this.symbols.updateVariable(node.id, NuevoArreglo);
                            node.valor = NuevoArreglo;
                            node.tipo = infoVariable.tipo;
                            return NuevoArreglo;
                }
                }

//----------------------------------------FUNCIONES


        /**
    * @type {BaseVisitor['visitCall']}
    */
        visitCall(node) {
            const funcion = node.callee.accept(this);
            
            const argzVar = node.argumentos.map(arg => arg.accept(this));

            console.log("VISITCALL", node);
    
            if (!(funcion instanceof Invoke)) {
                console.log("Error, la funcion no es invocable");
                this.errores.addError("semantico","la funcion no es invocable", node.location.end.line, node.location.end.column);

            }

            if (funcion.argz() !== argzVar.length) {
                console.log("Error, los parametros encontrados no coinciden con los argumentos de la funcion");
                this.errores.addError("semantico","los parametros encontrados no coinciden con los argumentos de la funcion", node.location.end.line, node.location.end.column);

            }
            //----------------
            //node.valor = funcion.invoking(this, argzVar);

            
            switch(node.callee.id){
                
                    case "parseInt":
                        if (node.argumentos[0].tipo == "string" && !isNaN(funcion.invoking(this, argzVar)) ){
                            node.valor = funcion.invoking(this, argzVar);
                            node.tipo = "int";
                            
                            return node.valor;
                        }else {
                            console.log("Error de tipado en parseInt");
                            this.errores.addError("semantico","Error de tipado en parseInt", node.location.end.line, node.location.end.column);
                            return null;
                        }

                    case "parsefloat":
                        if (node.argumentos[0].tipo == "string" && !isNaN(funcion.invoking(this, argzVar)) ){
                            node.valor = funcion.invoking(this, argzVar);
                            node.tipo = "float";
                            return node.valor;
                        }else {
                            console.log("Error de tipado en parsefloat");
                            this.errores.addError("semantico","Error de tipado en parsefloat", node.location.end.line, node.location.end.column);
                            return null;
                        }

                    case "toString":
                        if ((node.argumentos[0].tipo == "float"||node.argumentos[0].tipo == "int" ||node.argumentos[0].tipo == "boolean")){
                            node.valor = funcion.invoking(this, argzVar);
                            node.tipo = "string";
                            return node.valor;
                        }else {
                            console.log("Error de tipado en toString");
                            this.errores.addError("semantico","Error de tipado en toString", node.location.end.line, node.location.end.column);
                            return null;
                        }

                    case "toLowerCase":
                        if (node.argumentos[0].tipo == "string"  ){
                            node.valor = funcion.invoking(this, argzVar);
                            node.tipo = "string";
                            return node.valor;
                        }else {
                            console.log("Error de tipado en toLowerCase");
                            this.errores.addError("semantico","Error de tipado en toLowerCase", node.location.end.line, node.location.end.column);
                            return null;
                        }

                    case "toUpperCase":
                        if (node.argumentos[0].tipo == "string" ){
                            node.valor = funcion.invoking(this, argzVar);
                            node.tipo = "string";
                            return node.valor;
                        }else {
                            console.log("Error de tipado en toUpperCase");
                            this.errores.addError("semantico","Error de tipado en toUpperCase", node.location.end.line, node.location.end.column);
                            return null;
                        }
                    default:
                        const resultado = funcion.invoking(this, node.argumentos);
                        console.log("RESULTADO", resultado);
                        if(resultado == null){
                            node.valor = null;
                            node.tipo = null;
                            return null;
                        }
                        node.valor = resultado.valor;
                        node.tipo = resultado.tipo;
                        return node.valor;

            }

            //pruebaaaaaaaaaaaaaaaa


            //pruebaaaaaaaaaaaaaaaaaaaaaaaa
/*
            console.log("Error llamada a funcion");
            this.errores.addError("semantico","Error llamada a funcion", node.location.end.line, node.location.end.column);
            return null;*/
        }


                /**
                 * @type {BaseVisitor['visitDeclaracionFunction']} 
                 */
                visitDeclaracionFunction(node) {
                    const AlienInfo = new AlienFunc(node, this.entornoActual, this.symbols,this.errores);
                    console.log("DeclaracionFunction", node);
                    const nombreVariable = node.id;

                    if (this.reservedWords.includes(nombreVariable)) {
                        console.log(`Error: '${nombreVariable}' es una palabra reservada y no puede ser usada como nombre de funcion.`);
                        this.errores.addError("semantico", `Error: '${nombreVariable}'es una palabra reservada y no puede ser usada como nombre de funcion.`, node.location.end.line, node.location.end.column);
                        return null;
                    }

                    this.entornoActual.addVariable(node.id, AlienInfo, node.tipoFunc, "funcion", node.location.end.line, node.location.end.column);
                    this.symbols.addVariable(node.id, AlienInfo.node.valor, node.tipoFunc, "funcion", node.location.end.line, node.location.end.column);
                }
}