

export class Entorno {

//tipar el entorno 
    /**
        * @param {Entorno} padre
     */
    constructor(padre = undefined) {
        this.valores = {};
        this.padre = padre;
    }

    /**
     * @param {string} nombre
     * @param {any} valor
     */
    setVariable(nombre, valor) {
        this.valores[nombre] = valor;
    }

    /**
     * @param {string} nombre
     */
    getVariable(nombre) {
        const currentV = this.valores[nombre];
//ver si existe y devolver el valor
        if (currentV ) return currentV ;
//si no exxiste revisar el padre y asi en recursividad
        if (!currentV  && this.padre) {
            return this.padre.getVariable(nombre);
        }

        throw new Error(`Error con variable:  ${nombre} - no encontrada`);
    }


    assignVariable(nombre, valor) {
        const valorAssign = this.valores[nombre];
//si si existe la variable ponerle el valor que se mando
        if (valorAssign) {
            this.valores[nombre] = valor;
            //regresar
            return;
        }
//si no entro al primer if y si tiene padre se hace lo de regresar a buscar en el entorno padre
        if (!valorAssign && this.padre) {
            this.padre.assignVariable(nombre, valor);
            return;
        }

        throw new Error(`la variable ${nombre} no se encunetra definida dentro del codigo ejecutado`);
    }

}