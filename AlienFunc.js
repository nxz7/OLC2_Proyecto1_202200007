import { Entorno } from "./entorno.js";
import { Invoke } from "./invoke.js";
import { DeclaracionFunction } from "./nodos.js";
import { ReturnException } from "./stcTranz.js";
import { Symbols } from "./Symbols.js";
import { ErroresTabla } from './ErroresTabla.js';


export class AlienFunc extends Invoke {

//closure es el entorno padre ---> encapsula la clase 
//closure [ENTORNO] - MANDAR EN
    constructor(node, closure, symbols, errores) {
        super();
        /**
         * @type {DeclaracionFunction}
         */
        this.node = node;

        /**
         * @type {Symbols}
         */

        this.symbols = symbols;
        /**
         * @type {Entorno}
         */
        this.closure = closure;


        /**
         * @type {ErroresTabla}
         */
        this.errores = errores;
    }

    //comprobacion de parametros -- > verificar tipado
    //ARGZ AYUDA A VERIFICAR LOS PARAMETROS, para que cuando los invoque en la linea 46 si coincidan
    argz() {
        return this.node.Parameters.length;
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

    /**
    * @type {Invoke['invoking']}
    */
    invoking(interprete, args) {
        const enAfterCall = new Entorno(this.closure);
        //valor de retorno declarado en la funcion
        console.log("RED",this.node.res);
        const IdealRet = this.node.tipoFunc;

        // ------------------CREAR LAS VARIABLES Y VER QUE COINCIDA CON LA INFO DECLARACRADA Y LA INFO MANDADA
        for (let i = 0; i < this.node.Parameters.length; i++) {
            const parameter = this.node.Parameters[i];
        
            // REVISAR EL TIPO - tipoDeclarado==TipoMandado
            if (parameter.tipo !== args[i].tipo) {
                console.log(`Error: el tipo de parametro ${parameter} no coincide con el valor mandado`);
                this.errores.addError("Semantico", `Error: el tipo de parametro ${parameter} no coincide con el valor mandado`, 27, 7);
                this.node.tipo = "error"
                this.node.valor = null;
                return null; // ERROR SE MANEJA ACA
            }
            // SE AGREGA 
            console.log("agregada", parameter.id, args[i].valor, args[i].tipo);

            if(Array.isArray(args[i].valor)){
                const dimensions = this.getArrayDimensions(args[i].valor);

                if(dimensions===1){
                    enAfterCall.addVariable(parameter.id, args[i].valor, args[i].tipo, "arreglo", 27, 7);
                    this.symbols.addVariable(parameter.id, args[i].valor, args[i].tipo, "arreglo", 27, 7);
                }else{
                    enAfterCall.addVariable(parameter.id, args[i].valor, args[i].tipo, "Matriz", 77, 27);
                    this.symbols.addVariable(parameter.id, args[i].valor, args[i].tipo, "Matriz",77, 27);
                }

            }else{
                enAfterCall.addVariable(parameter.id, args[i].valor, args[i].tipo, "variableFun", 74, 7);
                this.symbols.addVariable(parameter.id, args[i].valor, args[i].tipo, "variableFun", 74, 7);
            }
            
        }

        const enBeforeCall = interprete.entornoActual;
        interprete.entornoActual = enAfterCall;

        try {
            //correr la info del bracket
            this.node.brackets.accept(interprete);
        } catch (error) {
            interprete.entornoActual = enBeforeCall;

            if (error instanceof ReturnException) {
                    console.log("thisNode", this.node);

                if(IdealRet !== error.rtnTipo){
                    console.log(`Error: el tipo de retorno ${error.rtnTipo} no coincide con el valor mandado`);
                    this.errores.addError("Semantico", `Error: el tipo de retorno ${error.rtnTipo} no coincide con el valor mandado`, 27, 7);
                    return null;
                }

                if(IdealRet === "void"){
                    this.node.tipo = null;
                    this.node.valor = null;
                    return null;
                }
                if(this.node.res!==null  && !Array.isArray(error.rtnValue)){
                    console.log(`Error: el tipo de retorno ${error.rtnTipo} no coincide con el valor mandado -[]`);
                    this.errores.addError("Semantico", `Error: el tipo de retorno ${error.rtnTipo} no coincide con el valor mandado -[]`, 27, 7);
                    this.node.tipo = null;
                    this.node.valor = null;
                    return null;
                }

//RECURSIVIDAD --> 
                this.node.tipo = error.rtnTipo;
                this.node.valor = error.rtnValue;
                return this.node;
            }

            // CONTINUE -BREAK
            throw error;
        }

        interprete.entornoActual = enBeforeCall;
        return null;
    }


}