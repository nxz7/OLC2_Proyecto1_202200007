import { InterpreterVisitor } from "./interprete.js";
import { Entorno } from './entorno.js'

export class Invoke {


    argz() {
        throw new Error('No implementado');
    }

    /**
     * @param interprete {InterpreterVisitor}
     * @param args {any[]}
     */
    invoking(interprete, args) {
        throw new Error('No implementado');
    }

}