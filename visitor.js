
/**

 * @typedef {import('./nodos.js').Expresion} Expresion


 * @typedef {import('./nodos.js').Operacion} Operacion


 * @typedef {import('./nodos.js').Unaria} Unaria


 * @typedef {import('./nodos.js').Agrupacion} Agrupacion


 * @typedef {import('./nodos.js').Primitivos} Primitivos


 * @typedef {import('./nodos.js').DeclaracionVariable} DeclaracionVariable


 * @typedef {import('./nodos.js').ReferenciaVariable} ReferenciaVariable


 * @typedef {import('./nodos.js').Print} Print


 * @typedef {import('./nodos.js').ExpresionStatement} ExpresionStatement


 * @typedef {import('./nodos.js').Assign} Assign


 * @typedef {import('./nodos.js').If} If


 * @typedef {import('./nodos.js').While} While


 * @typedef {import('./nodos.js').Brackets} Brackets

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
     * @param {DeclaracionVariable} node
     * @returns {any}
     */
    visitDeclaracionVariable(node) {
        throw new Error('Metodo visitDeclaracionVariable no implementado');
    }
    

    /**
     * @param {ReferenciaVariable} node
     * @returns {any}
     */
    visitReferenciaVariable(node) {
        throw new Error('Metodo visitReferenciaVariable no implementado');
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
     * @param {Brackets} node
     * @returns {any}
     */
    visitBrackets(node) {
        throw new Error('Metodo visitBrackets no implementado');
    }
    
}
