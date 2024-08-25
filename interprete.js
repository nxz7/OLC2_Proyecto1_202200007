import { Entorno } from "./entorno.js";
import { CasesSwitch } from "./nodos.js";
import { BaseVisitor } from "./visitor.js";
import nodos, { Expresion } from './nodos.js'
import { BreakException, ContinueException, ReturnException } from "./stcTranz.js";
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
    }

//AGREGAR ESTO ES SOLO PARA TENER LA INFO

    /**
      * @type {BaseVisitor['visitOperacion']}
      */
    visitOperacion(node) {
        //regresa el numero
        const izq = node.izq.accept(this);
        const der = node.der.accept(this);
        console.log("Operacion", izq, node.op, der);

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
            return;
        }

        const valorVariable = node.exp.accept(this);
        const infoVariable = this.entornoActual.getBracketVar(nombreVariable);
        node.valor = valorVariable;
        node.tipo = node.exp.tipo;

        if(infoVariable != null){
            console.log("Error: Variable ya declarada en el entorno actual");
            this.errores.addError("semantico",`Error: Variable ${nombreVariable} ya declarada en el entorno actual`, node.location.end.line, node.location.end.column);
            return ;

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
        return;
    }

    const infoVariable = this.entornoActual.getBracketVar(nombreVariable);
        if(infoVariable != null){
            console.log("Error: Variable ya declarada");
            this.errores.addError("semantico",`Error: Variable ${nombreVariable} ya declarada en el entorno actual`, node.location.end.line, node.location.end.column);
            return ;

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
        //console.log("!!!1 return de la variable", this.entornoActual.getVariable(nombreVariable));
        //console.log("!!!2 return de la variable", infoVariable);
        if(infoVariable != null){ 
        //console.log("RefVar!!!" , infoVariable.valor, infoVariable.tipo);
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

            if (exp.tipo === 'string' && exp.valor != null && exp.valor!= undefined ) {
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
            if (node.exp) {
                node.valor = node.exp.accept(this);
                node.tipo = node.exp.tipo
                rtnValue = node.exp.accept(this);
            }
            throw new ReturnException(rtnValue);
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

    visitAssign(node) {
        const nombreVariable = node.id;
        const infoVariable = this.entornoActual.getVariable(nombreVariable);
        const valor = node.assign.accept(this);
        //console.log("Asiganr: ", node);
        switch (node.op) {
        //console.log("azzzign", node.assign.tipo, node.assign.valor);

            case '=':
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

            case '+=':
                if(node.assign.tipo == infoVariable.tipo){
                    //const valor = node.assign.accept(this);
                    const addVariable = infoVariable.valor + valor;
                    this.entornoActual.updateVariable(node.id, addVariable);
                    this.symbols.updateVariable(node.id, addVariable);
                    node.valor = addVariable;
                    node.tipo = infoVariable.tipo;
                    return addVariable;
                } else if (node.assign.tipo == "int" && infoVariable.tipo == "float"){
                    //const valor = node.assign.accept(this);
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
                if(node.assign.tipo == infoVariable.tipo){
                    //const valor = node.assign.accept(this);
                    const addVariable = infoVariable.valor - valor;
                    this.entornoActual.updateVariable(node.id, addVariable);
                    this.symbols.updateVariable(node.id, addVariable);
                    node.valor = addVariable;
                    node.tipo = infoVariable.tipo;
                    return addVariable;
                } else if (node.assign.tipo == "int" && infoVariable.tipo == "float"){
                    //const valor = node.assign.accept(this);
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

}