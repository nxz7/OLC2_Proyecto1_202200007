
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
    * @param {Expresion[]} options.Listaexp Expresiones a imprimir
    */
    constructor({ Listaexp }) {
        super();
        
        /**
         * Expresiones a imprimir
         * @type {Expresion[]}
        */
        this.Listaexp = Listaexp;

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
 * @param {string} options.op mira si es = / +=/-=
    */
    constructor({ id, assign, op }) {
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


        /**
         * mira si es = / +=/-=
         * @type {string}
        */
        this.op = op;

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
    
export class Switch extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp ---> expresion a evaluar switch(--)
 * @param {Expresion[]} options.cases casos del switch
 * @param {Expresion} options.Default default del switch
    */
    constructor({ exp, cases, Default }) {
        super();
        
        /**
         * ---> expresion a evaluar switch(--)
         * @type {Expresion}
        */
        this.exp = exp;


        /**
         * casos del switch
         * @type {Expresion[]}
        */
        this.cases = cases;


        /**
         * default del switch
         * @type {Expresion}
        */
        this.Default = Default;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitSwitch(this);
    }
}
    
export class CasesSwitch extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion[]} options.declaraciones entorno bracketse declarado
 * @param {Expresion} options.valorCase valor del caso a evaluar
    */
    constructor({ declaraciones, valorCase }) {
        super();
        
        /**
         * entorno bracketse declarado
         * @type {Expresion[]}
        */
        this.declaraciones = declaraciones;


        /**
         * valor del caso a evaluar
         * @type {Expresion}
        */
        this.valorCase = valorCase;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitCasesSwitch(this);
    }
}
    
export class For extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.initialization inicializacion del for - 1 componente
 * @param {Expresion} options.condition Condicion del for - 2 conponente
 * @param {Expresion} options.update update del for, incremento/decremento - 3 componente
 * @param {Expresion} options.forBracket forBracket --> ejecuta mientras la condicion sea verdadera
    */
    constructor({ initialization, condition, update, forBracket }) {
        super();
        
        /**
         * inicializacion del for - 1 componente
         * @type {Expresion}
        */
        this.initialization = initialization;


        /**
         * Condicion del for - 2 conponente
         * @type {Expresion}
        */
        this.condition = condition;


        /**
         * update del for, incremento/decremento - 3 componente
         * @type {Expresion}
        */
        this.update = update;


        /**
         * forBracket --> ejecuta mientras la condicion sea verdadera
         * @type {Expresion}
        */
        this.forBracket = forBracket;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitFor(this);
    }
}
    
export class Break extends Expresion {

    /**
    * @param {Object} options
    * 
    */
    constructor() {
        super();
        
    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitBreak(this);
    }
}
    
export class Continue extends Expresion {

    /**
    * @param {Object} options
    * 
    */
    constructor() {
        super();
        
    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitContinue(this);
    }
}
    
export class Return extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp en el caso de que retorne algo
    */
    constructor({ exp }) {
        super();
        
        /**
         * en el caso de que retorne algo
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitReturn(this);
    }
}
    
export class Ternario extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.condition Condicion  - TERNARIO
 * @param {Expresion} options.TrueB VERDADERO TERNARIO
 * @param {Expresion} options.FalseB FALSO TERNARIO
    */
    constructor({ condition, TrueB, FalseB }) {
        super();
        
        /**
         * Condicion  - TERNARIO
         * @type {Expresion}
        */
        this.condition = condition;


        /**
         * VERDADERO TERNARIO
         * @type {Expresion}
        */
        this.TrueB = TrueB;


        /**
         * FALSO TERNARIO
         * @type {Expresion}
        */
        this.FalseB = FalseB;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitTernario(this);
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
    
export class Call extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.callee lo que se va a llamar
 * @param {Expresion[]} options.argumentos arreglo si tiene
    */
    constructor({ callee, argumentos }) {
        super();
        
        /**
         * lo que se va a llamar
         * @type {Expresion}
        */
        this.callee = callee;


        /**
         * arreglo si tiene
         * @type {Expresion[]}
        */
        this.argumentos = argumentos;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitCall(this);
    }
}
    
export class Typeof extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion[]} options.argumentos arreglo si tiene
    */
    constructor({ argumentos }) {
        super();
        
        /**
         * arreglo si tiene
         * @type {Expresion[]}
        */
        this.argumentos = argumentos;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitTypeof(this);
    }
}
    
export class DeclaracionArreglo extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la variable
 * @param {Expresion[]} options.exp VALOR DE LA VARIABLE
 * @param {string} options.tipoz tipo variable
 * @param {number} options.dimension dimension del arreglo
    */
    constructor({ id, exp, tipoz, dimension }) {
        super();
        
        /**
         * Identificador de la variable
         * @type {string}
        */
        this.id = id;


        /**
         * VALOR DE LA VARIABLE
         * @type {Expresion[]}
        */
        this.exp = exp;


        /**
         * tipo variable
         * @type {string}
        */
        this.tipoz = tipoz;


        /**
         * dimension del arreglo
         * @type {number}
        */
        this.dimension = dimension;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitDeclaracionArreglo(this);
    }
}
    
export class AsignacionArregloNew extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipoNew tipo variable
 * @param {number} options.exp tamaño
 * @param {number} options.dimNew dimension del arreglo
    */
    constructor({ tipoNew, exp, dimNew }) {
        super();
        
        /**
         * tipo variable
         * @type {string}
        */
        this.tipoNew = tipoNew;


        /**
         * tamaño
         * @type {number}
        */
        this.exp = exp;


        /**
         * dimension del arreglo
         * @type {number}
        */
        this.dimNew = dimNew;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAsignacionArregloNew(this);
    }
}
    
export class AccederArreglo extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id ID PARA BUSCAR LA VARIABLE
 * @param {Expresion[]} options.exp valores de acceso
    */
    constructor({ id, exp }) {
        super();
        
        /**
         * ID PARA BUSCAR LA VARIABLE
         * @type {string}
        */
        this.id = id;


        /**
         * valores de acceso
         * @type {Expresion[]}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAccederArreglo(this);
    }
}
    
export default { Expresion, Operacion, Unaria, Agrupacion, Primitivos, DeclaracionVar, DeclaracionVarTipo, RefVar, Print, ExpresionStatement, Assign, If, While, Switch, CasesSwitch, For, Break, Continue, Return, Ternario, Brackets, Call, Typeof, DeclaracionArreglo, AsignacionArregloNew, AccederArreglo }
