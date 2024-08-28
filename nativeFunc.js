import { Invoke } from "./invoke.js";


class NativeFunc extends Invoke {
    constructor(argz, func) {
        super();
        this.argz = argz;
        this.invoking = func;
    }
}


export const native = {
    'parseInt': new NativeFunc(
        () => 1,
        (interprete, value) => {
            const parsedValue = parseInt(String(value));
            if (isNaN(parsedValue)) {
                console.log(`Error: ${value} no es un número`);
                return null;
            }
            return parsedValue;
        }
    ),
    'toString': new NativeFunc(
        () => 1,
        (interprete, value) => {
            
            return String(value);
        }
    ),
    'parsefloat': new NativeFunc(
        () => 1,
        (interprete, value) => {
            const parsedValue = parseFloat(String(value));
            if (isNaN(parsedValue)) {
                console.log(`Error: ${value} no es un número decimal`);
                return null;
            }
            return parsedValue;
        }
    ),
    'toLowerCase': new NativeFunc(
    () => 1,
    (interprete, value) => {
        return String(value).toLowerCase();
    }),

    'toUpperCase': new NativeFunc(
    () => 1,
    (interprete, value) => {
        return String(value).toUpperCase();
    })

}