import { Entorno } from "./entorno.js";
import { BaseVisitor } from "./visitor.js";

// SE COPIA DEL VISITOR.JS PARA REALIZAR LA IMPLEMENTACION 

export class InterpreterVisitor extends BaseVisitor {

    constructor(symbols) {
        super();
        //nuevos entornos con nuevos bloques!!
        this.entornoActual = new Entorno();
        this.symbols = symbols;
        //LA RESPUESTA QUE SE VA A MOSTRAR en sonsola
        this.salida = '';
    }

//AGREGAR ESTO ES SOLO PARA TENER LA INFO

    /**
      * @type {BaseVisitor['visitOperacion']}
      */
    visitOperacion(node) {
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

                case '>=':
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
                        console.error("Error de tipado");
                        node.tipo = 'error';
                        node.valor = null;
                        console.log("Error de tipado: ", tipoIzq, tipoDer);
                        throw new Error(`Error de tipado: ${tipoIzq} >= ${tipoDer}`);
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
                        console.error("Error de tipado");
                        node.tipo = 'error';
                        node.valor = null;
                        throw new Error(`Error de tipado: ${tipoIzq} <= ${tipoDer}`);
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
                            console.error("Error de tipado");
                            node.tipo = 'error';
                            node.valor = null;
                            throw new Error(`Error de tipado: ${tipoIzq} > ${tipoDer}`);
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
                            console.error("Error de tipado");
                            node.tipo = 'error';
                            node.valor = null;
                            throw new Error(`Error de tipado: ${tipoIzq} < ${tipoDer}`);
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
                                console.error("Error de tipado");
                                node.tipo = 'error';
                                node.valor = null;
                                throw new Error(`Error de tipado: ${tipoIzq} < ${tipoDer}`);
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
                                console.error("Error de tipado");
                                node.tipo = 'error';
                                node.valor = null;
                                throw new Error(`Error de tipado: ${tipoIzq} < ${tipoDer}`);
                            }

                            case '&&':
                                if ((tipoIzq === 'boolean') && ( tipoDer === 'boolean')) {
                                    node.tipo = 'boolean';
                                    node.valor = izq && der;
                                    return node.valor;
                                } else {
                                    //-----------------ERROR ---------------
                                    console.error("Error de tipado");
                                    node.tipo = 'error';
                                    node.valor = null;
                                    throw new Error(`Error de tipado: ${tipoIzq} > ${tipoDer}`);
                                }
        
                            case '||':
                                if ((tipoIzq === 'boolean') && ( tipoDer === 'boolean')) {
                                    node.tipo = 'boolean';
                                    node.valor = izq || der;
                                    return node.valor;
                                } else {
                                    //-----------------ERROR ---------------
                                    console.error("Error de tipado");
                                    node.tipo = 'error';
                                    node.valor = null;
                                    throw new Error(`Error de tipado: ${tipoIzq} > ${tipoDer}`);
                                }
            default:
                throw new Error(`Operador no soportado: ${node.op}`);
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
                throw new Error(`Error de tipos: Se esperaba un valor int/float en la operación '!', pero se encontró ${node.exp.tipo}.`);
            }

            case '!':
                if (node.exp.tipo === 'boolean') {
                    node.valor = !exp;
                    node.tipo = 'boolean';
                    //console.log("Unaria", node.valor, node.tipo);
                    return node.valor;
                } else {
                    throw new Error(`Error de tipos: Se esperaba un valor booleano en la operación '!', pero se encontró ${node.exp.tipo}.`);
                }
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
        const valorVariable = node.exp.accept(this);
        const infoVariable = this.entornoActual.getBracketVar(nombreVariable);
        node.valor = valorVariable;
        node.tipo = node.exp.tipo;

        if(infoVariable != null){
            console.log("Error: Variable ya declarada en el entorno actual");
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
    const infoVariable = this.entornoActual.getBracketVar(nombreVariable);
        if(infoVariable != null){
            console.log("Error: Variable ya declarada");
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
        //console.log("return de la variable", infoVariable);
        if(infoVariable != null){ 
        //console.log("RefVar", infoVariable.valor, infoVariable.tipo);
        node.valor = infoVariable.valor;
        node.tipo = infoVariable.tipo;
        return infoVariable.valor;
        } else {
                console.log(`Error: Variable ${nombreVariable} no definida`);
                return ;
        }
    }


    /**
      * @type {BaseVisitor['visitPrint']}
      */

//----------->>>>>>>>>>>>STATEMENTS
    //SI HAY UN NUMERO/STRING DEVUELVE EL OBJETO, EN CAMBIO SI YA PASO POR SUMA RESTA ETC DEVUELVE EL VALOR
    visitPrint(node) {
        const valorPrint = node.exp.accept(this);
        this.salida += valorPrint + '\n';
    }

//IF
    /**
     * @type {BaseVisitor['visitIf']}
     */
    visitIf(node) {
        try {
            const conditionIf = node.condition.accept(this);
        
            if (conditionIf) {
                node.trueBracket.accept(this);
            } else if (node.falseBracket) {
                node.falseBracket.accept(this);
            }

        } catch (error) {
            console.error('Error  IF:', error);
        }


    }

//WHILE
    /**
     * @type {BaseVisitor['visitWhile']}
     */
    visitWhile(node) {
        try {
        while (node.condition.accept(this)) {
            node.whileBracket.accept(this);
            //console.log("dentro while");
        }}catch (error) {
            console.error('Error  while:', error);
        }
    }


    //FOR
    /**
     * @type {BaseVisitor['visitFor']}
     */
    visitFor(node) {
        try {
        while (node.condition.accept(this)) {
            node.forBracket.accept(this);
            //console.log("dentro for");
        }}catch (error) {
            console.error('Error  for:', error);
        }
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
            console.error('Error  for:', error);
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
                    console.error("Error de tipado en asignación, el valor declarado no coincide con el tipo de la variable");
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
                    console.error("Error de tipado en asignación, el valor declarado no coincide con el tipo de la variable");
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
                    console.error("Error de tipado en asignación, el valor declarado no coincide con el tipo de la variable");
                    return ;
                }
        
    }
    }

}