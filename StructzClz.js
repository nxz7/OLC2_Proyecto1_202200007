import { Invoke } from './invoke.js';
import { AlienFunc } from './AlienFunc.js';
import { Expresion } from './nodos.js';
import { OccInstance } from './OccInstance.js';

export class StructzClz extends Invoke{
        constructor(id, attributes){
            super();

            this.id = id;

            //las att son un map
            this.attributes = attributes;
        }

    argz() {
        return 0;
    }

    /**
     * @type {Invoke['invoking']}
     */
    invoking(interprete, args) {
        const CurrentInstance = new OccInstance(this);
        console.log("attributes",this.attributes);
        console.log("Arreglos en structs",args);


        for (const key in this.attributes) {
            if (this.attributes.hasOwnProperty(key)) {
                const attribute = this.attributes[key];
        
                // ENCONTRAR UNA QUE COICIDA
                const arg = args.find(a => a.id === attribute.id);
        
                if (!arg) {
                    console.log(`Error: No se encontró un argumento que coincida con el atributo id=${attribute.id}.`);
                    return;
                }
        
                console.log("arg", arg.id, arg.tipo);
                console.log("attribute", attribute.id, attribute.tipo);
        
                // Check if the tipo matches
                if (attribute.tipo !== arg.tipo) {
                    console.log(`Error: El atributo declarado no coincide para ${key}: se esperaba id=${attribute.id}, tipo=${attribute.tipo} se obtuvo -> id=${arg.id}, tipo=${arg.tipo}.`);
                    return ;
                }
            }
        }

        Object.entries(args).forEach(([id, arg]) => {
            console.log("ID",arg.id);
            console.log("tipo", arg.tipo);
            console.log("VALOR", arg.valor);
            CurrentInstance.set(arg.id, arg.valor, arg.tipo);
        });


        return CurrentInstance;
    }


}