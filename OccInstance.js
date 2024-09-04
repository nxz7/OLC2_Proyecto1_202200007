import { StructzClz } from "./StructzClz.js";


//strcuts es la plantilla y la instance es cuando se usa esa plantilla
export class OccInstance{

    constructor(structzClz){
        this.structzClz = structzClz;
        this.attributes = {};
    }

    set(id, valor, tipo) {
        this.attributes[id] = { id, valor, tipo };

        console.log("-> set", this.attributes);
    }

    get(id) {
        console.log("1",id);
        console.log("2",this.attributes.hasOwnProperty(id));
        console.log("3",this.attributes);
        console.log("4",this.attributes[id]);
        if (this.attributes.hasOwnProperty(id)) {
            return this.attributes[id];
        }
        console.log(`Error, no se pudo acceder a la propiedad del struct: ${id}`);
    }
}