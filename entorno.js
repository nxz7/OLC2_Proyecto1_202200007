


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
    addVariable(nombre, valor, tipo, simbType, linea, columna) {
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

        console.log(`la variable:  ${nombre} - aun no existe en el entorno`);
        return null;
    }


        /**
     * @param {string} nombre
     */
        getBracketVar(nombre) {
            const currentV = this.valores[nombre];
            // Solo revisa si existe en el entorno actual
            if (currentV) return currentV;
    
            console.log(`la variable: ${nombre} no existe en el entorno actual`);
            return null;
        }

    /**
     * @param {string} nombre
     * @param {any} valor
     * @param {string} tipo
     * @param {string} simbType
     * @param {any} linea
     * @param {any} columna
     */
    updateVariable(nombre, valor, tipo, simbType, linea, columna) {
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
            this.padre.updateVariable(nombre, valor, tipo, simbType, linea, columna);
            return;
        }

        throw new Error(`La variable ${nombre} no se encuentra definida dentro del código ejecutado`);
    }

    }