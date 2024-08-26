
/**

 * @typedef {import('./nodos.js').Expresion} Expresion


 * @typedef {import('./nodos.js').Operacion} Operacion


 * @typedef {import('./nodos.js').Unaria} Unaria


 * @typedef {import('./nodos.js').Agrupacion} Agrupacion


 * @typedef {import('./nodos.js').Primitivos} Primitivos


 * @typedef {import('./nodos.js').DeclaracionVar} DeclaracionVar


 * @typedef {import('./nodos.js').DeclaracionVarTipo} DeclaracionVarTipo


 * @typedef {import('./nodos.js').RefVar} RefVar


 * @typedef {import('./nodos.js').Print} Print


 * @typedef {import('./nodos.js').ExpresionStatement} ExpresionStatement


 * @typedef {import('./nodos.js').Assign} Assign


 * @typedef {import('./nodos.js').If} If


 * @typedef {import('./nodos.js').While} While


 * @typedef {import('./nodos.js').Switch} Switch


 * @typedef {import('./nodos.js').CasesSwitch} CasesSwitch


 * @typedef {import('./nodos.js').For} For


 * @typedef {import('./nodos.js').Break} Break


 * @typedef {import('./nodos.js').Continue} Continue


 * @typedef {import('./nodos.js').Return} Return


 * @typedef {import('./nodos.js').Ternario} Ternario


 * @typedef {import('./nodos.js').Brackets} Brackets


 * @typedef {import('./nodos.js').Call} Call


 * @typedef {import('./nodos.js').Typeof} Typeof

 */


/**
 * Clase base para los visitantes
 * @abstract
 */
export class BaseVisitor {

    
    /**
     * @param {Expresion} node
     * @returns {any}
     */
    visitExpresion(node) {
        throw new Error('Metodo visitExpresion no implementado');
    }
    

    /**
     * @param {Operacion} node
     * @returns {any}
     */
    visitOperacion(node) {
        throw new Error('Metodo visitOperacion no implementado');
    }
    

    /**
     * @param {Unaria} node
     * @returns {any}
     */
    visitUnaria(node) {
        throw new Error('Metodo visitUnaria no implementado');
    }
    

    /**
     * @param {Agrupacion} node
     * @returns {any}
     */
    visitAgrupacion(node) {
        throw new Error('Metodo visitAgrupacion no implementado');
    }
    

    /**
     * @param {Primitivos} node
     * @returns {any}
     */
    visitPrimitivos(node) {
        throw new Error('Metodo visitPrimitivos no implementado');
    }
    

    /**
     * @param {DeclaracionVar} node
     * @returns {any}
     */
    visitDeclaracionVar(node) {
        throw new Error('Metodo visitDeclaracionVar no implementado');
    }
    

    /**
     * @param {DeclaracionVarTipo} node
     * @returns {any}
     */
    visitDeclaracionVarTipo(node) {
        throw new Error('Metodo visitDeclaracionVarTipo no implementado');
    }
    

    /**
     * @param {RefVar} node
     * @returns {any}
     */
    visitRefVar(node) {
        throw new Error('Metodo visitRefVar no implementado');
    }
    

    /**
     * @param {Print} node
     * @returns {any}
     */
    visitPrint(node) {
        throw new Error('Metodo visitPrint no implementado');
    }
    

    /**
     * @param {ExpresionStatement} node
     * @returns {any}
     */
    visitExpresionStatement(node) {
        throw new Error('Metodo visitExpresionStatement no implementado');
    }
    

    /**
     * @param {Assign} node
     * @returns {any}
     */
    visitAssign(node) {
        throw new Error('Metodo visitAssign no implementado');
    }
    

    /**
     * @param {If} node
     * @returns {any}
     */
    visitIf(node) {
        throw new Error('Metodo visitIf no implementado');
    }
    

    /**
     * @param {While} node
     * @returns {any}
     */
    visitWhile(node) {
        throw new Error('Metodo visitWhile no implementado');
    }
    

    /**
     * @param {Switch} node
     * @returns {any}
     */
    visitSwitch(node) {
        throw new Error('Metodo visitSwitch no implementado');
    }
    

    /**
     * @param {CasesSwitch} node
     * @returns {any}
     */
    visitCasesSwitch(node) {
        throw new Error('Metodo visitCasesSwitch no implementado');
    }
    

    /**
     * @param {For} node
     * @returns {any}
     */
    visitFor(node) {
        throw new Error('Metodo visitFor no implementado');
    }
    

    /**
     * @param {Break} node
     * @returns {any}
     */
    visitBreak(node) {
        throw new Error('Metodo visitBreak no implementado');
    }
    

    /**
     * @param {Continue} node
     * @returns {any}
     */
    visitContinue(node) {
        throw new Error('Metodo visitContinue no implementado');
    }
    

    /**
     * @param {Return} node
     * @returns {any}
     */
    visitReturn(node) {
        throw new Error('Metodo visitReturn no implementado');
    }
    

    /**
     * @param {Ternario} node
     * @returns {any}
     */
    visitTernario(node) {
        throw new Error('Metodo visitTernario no implementado');
    }
    

    /**
     * @param {Brackets} node
     * @returns {any}
     */
    visitBrackets(node) {
        throw new Error('Metodo visitBrackets no implementado');
    }
    

    /**
     * @param {Call} node
     * @returns {any}
     */
    visitCall(node) {
        throw new Error('Metodo visitCall no implementado');
    }
    

    /**
     * @param {Typeof} node
     * @returns {any}
     */
    visitTypeof(node) {
        throw new Error('Metodo visitTypeof no implementado');
    }
    
}
