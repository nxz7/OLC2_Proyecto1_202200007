
{
  //jala los metodos creados para visitar
  const crearNodo = (tipoNodo, props) =>{
    const tipos = {
      //se pone el nombre de los que esta en nodos
      'agrupacion': nodos.Agrupacion,
      'Primitivos': nodos.Primitivos,
      'operacion': nodos.Operacion,
      'unaria': nodos.Unaria,
      'declaracionVariable': nodos.DeclaracionVariable,
      'referenciaVariable': nodos.ReferenciaVariable,
      'print': nodos.Print,
      'expresionStatement': nodos.ExpresionStatement
    }

    const nodo = new tipos[tipoNodo](props)
    nodo.location = location()
    return nodo
  }
}

programa = _ decl:Declaracion* _ { return decl }

Declaracion = decl:DecVariable _ { return decl }
            / statement:Statement _ { return statement }

DecVariable = "var" _ id:ID _ "=" _ exp:Expresion _ ";" { return crearNodo('declaracionVariable', { id, exp }) }

Statement = "System.out.println(" _ exp:Expresion _ ")" _ ";" { return crearNodo('print', { exp }) }
    / exp:Expresion _ ";" { return crearNodo('expresionStatement', { exp }) }

//restriccion de NO empezar con un numero
ID = [a-zA-Z_][a-zA-Z0-9_]* { return text() }
String = "\"" [^\"]* "\"" { return text() }
Charr = "\'" [^\']* "\'" { return text() }

//---------------------------------------

Expresion = logicoOr


logicoOr = izq:logicoAnd expansion:(
  _ op:("||") _ der:logicoAnd { return { tipo: op, der } }
)* { 
  return expansion.reduce(
    (previousOp, actualOp) => {
      const { tipo, der } = actualOp
      return crearNodo('operacion', { op:tipo, izq: previousOp, der  })
    },
    izq
  )
}


logicoAnd = izq:DesIgualdad expansion:(
  _ op:("&&") _ der:DesIgualdad { return { tipo: op, der } }
)* { 
  return expansion.reduce(
    (previousOp, actualOp) => {
      const { tipo, der } = actualOp
      return crearNodo('operacion', { op:tipo, izq: previousOp, der  })
    },
    izq
  )
}



DesIgualdad = izq:Relacional expansion:(
  _ op:("!=" / "==") _ der:Relacional { return { tipo: op, der } }
)* { 
  return expansion.reduce(
    (previousOp, actualOp) => {
      const { tipo, der } = actualOp
      return crearNodo('operacion', { op:tipo, izq: previousOp, der  })
    },
    izq
  )
}

Relacional = izq:Suma expansion:(
  _ op:(">=" / "<="/">" / "<") _ der:Suma { return { tipo: op, der } }
)* { 
  return expansion.reduce(
    (previousOp, actualOp) => {
      const { tipo, der } = actualOp
      return crearNodo('operacion', { op:tipo, izq: previousOp, der  })
    },
    izq
  )
}


Suma = izq:Multiplicacion expansion:(
  _ op:("+" / "-") _ der:Multiplicacion { return { tipo: op, der } }
)* { 
  return expansion.reduce(
    (previousOp, actualOp) => {
      const { tipo, der } = actualOp
      return crearNodo('operacion', { op:tipo, izq: previousOp, der  })
    },
    izq
  )
}

Multiplicacion = izq:Unaria expansion:(
  _ op:("*" / "/" /"%") _ der:Unaria { return { tipo: op, der } }
)* {
    return expansion.reduce(
      (previousOp, actualOp) => {
        const { tipo, der } = actualOp
        return crearNodo('operacion', { op:tipo, izq: previousOp, der })
      },
      izq
    )
}

Unaria = ope:("-"/"!") _ num:Numero { return crearNodo('unaria', { op: ope, exp: num }) }
/ Numero

tipoFloat =[0-9]+( "." [0-9]+ ) {return parseFloat(text(), 10)}
tipoInt = [0-9]+ {return parseInt(text(), 10)}


Numero =   floatN:tipoFloat {return crearNodo('Primitivos', { valor: floatN, tipo: "float" })}
  / intN:tipoInt {return crearNodo('Primitivos', { valor: intN, tipo: "int" })}
  /"true" {return crearNodo('Primitivos', { valor: true, tipo: "boolean" })}
  /"false" {return crearNodo('Primitivos', { valor: false, tipo: "boolean" })}
  / "(" _ exp:Expresion _ ")" { return crearNodo('agrupacion', { exp }) }
  / "[" _ exp:Expresion _ "]" { return crearNodo('agrupacion', { exp }) }
  / id:ID { return crearNodo('referenciaVariable', { id }) }
  / str:String { return crearNodo('Primitivos', { valor: str, tipo: "string" }) }
  / char:Charr { return crearNodo('Primitivos', { valor: char, tipo: "char" }) }
  / "null" {return crearNodo('Primitivos', { valor: null, tipo: "null" })}


_ = [ \t\n\r]*