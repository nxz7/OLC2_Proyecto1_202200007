


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
         * @param {string} tipo
         * @param {string} simbType
         * @param {any} linea
         * @param {any} columna
         */
    setVariable(nombre, valor, tipo, simbType, linea, columna) {
        this.valores[nombre] = { valor, tipo, simbType, linea, columna };
        console.log("Estado actual de valores:", this.valores);
    }

    /**
     * @param {string} nombre
     */
    getVariable(nombre) {
        const currentV = this.valores[nombre];
        // Ver si existe y devolver el valor
        if (currentV) return currentV;
        // Si no existe, revisar el padre y así en recursividad
        if (!currentV && this.padre) {
            return this.padre.getVariable(nombre);
        }

        throw new Error(`Error con variable: ${nombre} - no encontrada`);
    }

    /**
     * @param {string} nombre
     * @param {any} valor
     * @param {string} tipo
     * @param {string} simbType
     * @param {any} linea
     * @param {any} columna
     */
    assignVariable(nombre, valor, tipo, simbType, linea, columna) {
        const valorAssign = this.valores[nombre];
        // Si existe la variable, actualizar su valor y demás propiedades
        if (valorAssign) {
            this.valores[nombre] = { 
                ...valorAssign, // solo para mantener las propiedades anteriores
                valor // update solo valor
            };
            console.log("Estado actual de valores:", this.valores);
            return;
        }
        // Si no existe en este entorno, buscar en el entorno padre
        if (!valorAssign && this.padre) {
            this.padre.assignVariable(nombre, valor, tipo, simbType, linea, columna);
            return;
        }

        throw new Error(`La variable ${nombre} no se encuentra definida dentro del código ejecutado`);
    }

    }