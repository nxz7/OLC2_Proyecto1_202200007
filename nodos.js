
/**
 * @typedef {Object} Location
 * @property {Object} start
 * @property {number} start.offset
 * @property {number} start.line
 * @property {number} start.column
 * @property {Object} end
 * @property {number} end.offset
 * @property {number} end.line
 * @property {number} end.column
*/
    

/**
 * @typedef {import('./visitor').BaseVisitor} BaseVisitor
 */

export class Expresion  {

    /**
    * @param {Object} options
    * @param {Location|null} options.location Ubicacion del nodo en el codigo fuente
 * @param {string} options.tipo tipo del resultado de la expresion
 * @param {any} options.valor valor de la expresion
    */
    constructor() {
        
        
        /**
         * Ubicacion del nodo en el codigo fuente
         * @type {Location|null}
        */
        this.location = null;


        /**
         * tipo del resultado de la expresion
         * @type {string}
        */
        this.tipo = null;


        /**
         * valor de la expresion
         * @type {any}
        */
        this.valor = null;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitExpresion(this);
    }
}
    
export class Operacion extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.izq  izquierda de la operacion
 * @param {Expresion} options.der  derecha de la operacion
 * @param {string} options.op Operador de la operacion
    */
    constructor({ izq, der, op }) {
        super();
        
        /**
         *  izquierda de la operacion
         * @type {Expresion}
        */
        this.izq = izq;


        /**
         *  derecha de la operacion
         * @type {Expresion}
        */
        this.der = der;


        /**
         * Operador de la operacion
         * @type {string}
        */
        this.op = op;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitOperacion(this);
    }
}
    
export class Unaria extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion unaria
 * @param {string} options.op Operador 
    */
    constructor({ exp, op }) {
        super();
        
        /**
         * Expresion unaria
         * @type {Expresion}
        */
        this.exp = exp;


        /**
         * Operador 
         * @type {string}
        */
        this.op = op;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitUnaria(this);
    }
}
    
export class Agrupacion extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion agrupada
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion agrupada
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAgrupacion(this);
    }
}
    
export class Primitivos extends Expresion {

    /**
    * @param {Object} options
    * @param {any} options.valor valor dato primitivo
 * @param {string} options.tipo tipado
    */
    constructor({ valor, tipo }) {
        super();
        
        /**
         * valor dato primitivo
         * @type {any}
        */
        this.valor = valor;


        /**
         * tipado
         * @type {string}
        */
        this.tipo = tipo;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitPrimitivos(this);
    }
}
    
export class DeclaracionVar extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la variable
 * @param {Expresion} options.exp VALOR DE LA VARIABLE
    */
    constructor({ id, exp }) {
        super();
        
        /**
         * Identificador de la variable
         * @type {string}
        */
        this.id = id;


        /**
         * VALOR DE LA VARIABLE
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitDeclaracionVar(this);
    }
}
    
export class DeclaracionVarTipo extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la variable
 * @param {Expresion} options.exp VALOR DE LA VARIABLE
 * @param {string} options.tipoz tipo variable
    */
    constructor({ id, exp, tipoz }) {
        super();
        
        /**
         * Identificador de la variable
         * @type {string}
        */
        this.id = id;


        /**
         * VALOR DE LA VARIABLE
         * @type {Expresion}
        */
        this.exp = exp;


        /**
         * tipo variable
         * @type {string}
        */
        this.tipoz = tipoz;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitDeclaracionVarTipo(this);
    }
}
    
export class RefVar extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id ID PARA BUSCAR LA VARIABLE
    */
    constructor({ id }) {
        super();
        
        /**
         * ID PARA BUSCAR LA VARIABLE
         * @type {string}
        */
        this.id = id;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitRefVar(this);
    }
}
    
export class Print extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion a imprimir
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion a imprimir
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitPrint(this);
    }
}
    
export class ExpresionStatement extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion a evaluar
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion a evaluar
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitExpresionStatement(this);
    }
}
    
export class Assign extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id nombre de lo que se va a asignar
 * @param {Expresion} options.assign lo que se le va a asignar al ID
    */
    constructor({ id, assign }) {
        super();
        
        /**
         * nombre de lo que se va a asignar
         * @type {string}
        */
        this.id = id;


        /**
         * lo que se le va a asignar al ID
         * @type {Expresion}
        */
        this.assign = assign;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAssign(this);
    }
}
    
export class If extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.condition Condicion if(--)
 * @param {Expresion} options.trueBracket trueBracket -> ejecuta si la condicion es verdadera
 * @param {Expresion|undefined} options.falseBracket falseBracket -> ejecuta si la condicion es falsa
    */
    constructor({ condition, trueBracket, falseBracket }) {
        super();
        
        /**
         * Condicion if(--)
         * @type {Expresion}
        */
        this.condition = condition;


        /**
         * trueBracket -> ejecuta si la condicion es verdadera
         * @type {Expresion}
        */
        this.trueBracket = trueBracket;


        /**
         * falseBracket -> ejecuta si la condicion es falsa
         * @type {Expresion|undefined}
        */
        this.falseBracket = falseBracket;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitIf(this);
    }
}
    
export class While extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.condition Condicion  - While (--)
 * @param {Expresion} options.whileBracket whileBracket --> ejecuta mientras la condicion sea verdadera
    */
    constructor({ condition, whileBracket }) {
        super();
        
        /**
         * Condicion  - While (--)
         * @type {Expresion}
        */
        this.condition = condition;


        /**
         * whileBracket --> ejecuta mientras la condicion sea verdadera
         * @type {Expresion}
        */
        this.whileBracket = whileBracket;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitWhile(this);
    }
}
    
export class Brackets extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion[]} options.declaraciones entorno bracketse declarado
    */
    constructor({ declaraciones }) {
        super();
        
        /**
         * entorno bracketse declarado
         * @type {Expresion[]}
        */
        this.declaraciones = declaraciones;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitBrackets(this);
    }
}
    
export default { Expresion, Operacion, Unaria, Agrupacion, Primitivos, DeclaracionVar, DeclaracionVarTipo, RefVar, Print, ExpresionStatement, Assign, If, While, Brackets }
