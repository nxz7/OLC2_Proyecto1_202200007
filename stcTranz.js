export class BreakException extends Error {
    constructor() {
        super('Break');
    }
}

export class ContinueException extends Error {
    constructor() {
        super('Continue');
    }
}

export class ReturnException extends Error {
    /**
     * @param {any} rtnValue
     */
    constructor(rtnValue, rtnTipo) {
        super('Return');
        this.rtnValue = rtnValue;
        this.rtnTipo = rtnTipo;
    }
}