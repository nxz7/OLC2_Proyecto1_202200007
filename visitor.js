
/**

 * @typedef {import('./nodos').Expresion} Expresion


 * @typedef {import('./nodos').Operacion} Operacion


 * @typedef {import('./nodos').Unaria} Unaria


 * @typedef {import('./nodos').Agrupacion} Agrupacion


 * @typedef {import('./nodos').Primitivos} Primitivos


 * @typedef {import('./nodos').DeclaracionVariable} DeclaracionVariable


 * @typedef {import('./nodos').ReferenciaVariable} ReferenciaVariable


 * @typedef {import('./nodos').Print} Print


 * @typedef {import('./nodos').ExpresionStatement} ExpresionStatement

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
    
}
