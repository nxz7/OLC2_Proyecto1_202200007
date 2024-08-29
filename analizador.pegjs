
{
  //-------------------------llama los visit
  const crearNodo = (tipoNodo, props) =>{
    const tipos = {
      //se pone el nombre de los que esta en NODOS.JS
      'agrupacion': nodos.Agrupacion,
      'Primitivos': nodos.Primitivos,
      'operacion': nodos.Operacion,
      'unaria': nodos.Unaria,
      'declaracionVar': nodos.DeclaracionVar,
      'refVar': nodos.RefVar,
      'print': nodos.Print,
      'expresionStatement': nodos.ExpresionStatement,
      'if': nodos.If,
      'while': nodos.While,
      'for': nodos.For,
      'switch': nodos.Switch,
      'break': nodos.Break,
      'continue': nodos.Continue,
      'return': nodos.Return,
      'call': nodos.Call,
      'declaracionArreglo': nodos.DeclaracionArreglo,
      'typeof': nodos.Typeof,
      'assign': nodos.Assign,
      'asignacionArregloNew': nodos.AsignacionArregloNew,
      'ternario': nodos.Ternario,
      'accederArreglo':nodos.AccederArreglo,
      'brackets': nodos.Brackets,
      'declaracionVarTipo': nodos.DeclaracionVarTipo,
      'casesSwitch': nodos.CasesSwitch
    }

    const nodo = new tipos[tipoNodo](props)
    nodo.location = location()
    return nodo
  }
}

programa = _ decl:Declaracion* _ { return decl }

//>MAIN
Declaracion = decl:DecVariable _ { return decl }
            / statement:Statement _ { return statement }

//---------------declaracion de variables, clases y funciones
DecVariable = "var" _ id:ID _ "=" _ exp:Expresion _ ";" { return crearNodo('declaracionVar', { id, exp}) }
            / DeclaracionArray
            / tipoz:TiposVar _ id:ID _  
            TipadoValor:(
              "=" _ TipadoValor:Expresion _  { return  TipadoValor  }
            )?_";" { return crearNodo('declaracionVarTipo', { id, exp:TipadoValor, tipoz }) }

//>>>>>>>>>>>>>>>>>>>>>>ARREGLOS>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//dimension de acuerdo a los corchetes (array o matrix )
DeclaracionArray = tipoz:TiposVar "[]" dims:Corchetes* _ id:ID _ "=" _ exp:MainArrayElements _ ";" {
  return crearNodo('declaracionArreglo', {id,exp, tipoz, dimension: dims.length+1});
}


Corchetes ="[]" { return text() }

MainArrayElements = "{" _ elements:NestedArrayElements _ "}" {return elements;}
                  /"new" _ tipoNew:TiposVar exp:NestedSize { return crearNodo('asignacionArregloNew', { tipoNew, exp, dimNew:exp.length }) }
                  / id:ID { return crearNodo('refVar', { id }) }

NestedSize = "[" _ exp:Expresion _ "]" _ tail:("[" _ expTail:Expresion _ "]")* {
  return [exp].concat(tail.map(function(d) { return d[2]; }));
}

//lleno de expresiones o mas arreglos(matriz)- recursivo
NestedArrayElements = head:(Expresion / MainArrayElements) tail:(_ "," _ (Expresion / MainArrayElements))* {
  return [head].concat(tail.map(function(element) { return element[3]; }));
}


//----------------aca van los print, if else y todo tipo de statements ---------------
Statement = "System.out.println(" _ Listaexp:ListaExpresiones* _ ")" _ ";" { return crearNodo('print', { Listaexp }) }
    / "{" _ decl:Declaracion* _ "}" { return crearNodo('brackets', { declaraciones:decl }) }
    / "while" _ "(" _ condition:Expresion _ ")" _ whileBracket:Statement { return crearNodo('while', { condition, whileBracket }) }
    / "if" _ "(" _ condition:Expresion _ ")" _ trueBracket:Statement
      falseBracket:(
        _ "else" _ falseBracket:Statement { return falseBracket } 
      )? { return crearNodo('if', { condition, trueBracket, falseBracket }) }
    / "for" _ "(" _ initialization:FirstFor?  _ condition:Expresion _ ";" _ update:Expresion _ ")" _ forBracket:Statement {
      return crearNodo('for', { initialization, condition, update, forBracket })}
    / "switch" _ "(" _ exp:Expresion _ ")" _ "{" _ cases:Case* _ Default:DefaultCase? _ "}" { return crearNodo('switch', { exp, cases, Default }) }
    / "break" _ ";" { return crearNodo('break') }
    / "continue" _ ";" { return crearNodo('continue') }
    / "return" _ exp:Expresion? _ ";" { return crearNodo('return', { exp }) }
    / exp:Expresion _ ";" { return crearNodo('expresionStatement', { exp }) }

// SEPARAR PRIMERA CONDICION DE FOR

ListaExpresiones = "," _ exp:Expresion _ { return exp }
		/exp: Expresion _ { return exp }

// para arreglar que no vengan dos ;; y de error
FirstFor = decl:DecVariable { return decl  }
        / exp:Expresion _ ";" { return exp }
        / ";" { return null }

Case = "case" _ valorCase:Expresion _ ":" _ caseBracket:Declaracion* { return crearNodo('casesSwitch', { valorCase, declaraciones:caseBracket }) }

DefaultCase = "default" _ ":" _ defaultBracket:Declaracion*  { return crearNodo('brackets', { declaraciones:defaultBracket }) }
//----arreglar for
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


//restriccion de NO empezar con un numero
ID = [a-zA-Z_][a-zA-Z0-9_]* { return text() }
String = "\"" ( "\\" "\"" / [^\"] )* "\"" { return text() }
Charr = "\'" [^\']* "\'" { return text() }
IntTernario = "?" { return text() } 
//---------------------------------------

Expresion = Assign

Assign = id:ID _ op:("="/"+="/"-=") _ assign:AsignarNewValue { return crearNodo('assign', { id, assign, op}) }
          / Ternario

AsignarNewValue =  "{" _ elements:NestedArrayElements _ "}" {return elements;}
                /"new" _ tipoNew:TiposVar exp:NestedSize { return crearNodo('asignacionArregloNew', { tipoNew, exp, dimNew:exp.length }) }
                /  exp:Expresion  { return exp }


Ternario = condition:logicoOr _ IntTernario _ TrueB:Expresion _ ":" _ FalseB:Expresion {return crearNodo('ternario', { condition, TrueB, FalseB })} 
/ logicoOr


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

Unaria = ope:("-"/"!") _ num:Unaria { return crearNodo('unaria', { op: ope, exp: num }) }
/ Call

Call = callee:TypeOF _ params:("(" argumentos:Argz? ")" { return argumentos })* {
  return params.reduce(
    (callee, argumentos) => {
      return crearNodo('call', { callee, argumentos: argumentos || [] })
    },
    callee
  )
}

TypeOF = "typeof"  _ argumentos:Expresion _  {return crearNodo('typeof', {  argumentos: argumentos || [] })}
/ Prim


Argz = argum:Expresion _ argumentos:("," _ exp:Expresion { return exp })* { return [argum, ...argumentos] }



tipoFloat =[0-9]+( "." [0-9]+ ) {return parseFloat(text(), 10)}
tipoInt = [0-9]+ {return parseInt(text(), 10)}


Prim =  floatN:tipoFloat {return crearNodo('Primitivos', { valor: floatN, tipo: "float" })}
  / intN:tipoInt {return crearNodo('Primitivos', { valor: intN, tipo: "int" })}
  / str:String { return crearNodo('Primitivos', { valor: str, tipo: "string" }) }
  / char:Charr { return crearNodo('Primitivos', { valor: char, tipo: "char" }) }
  /"true" {return crearNodo('Primitivos', { valor: true, tipo: "boolean" })}
  /"false" {return crearNodo('Primitivos', { valor: false, tipo: "boolean" })}
  / "(" _ exp:Expresion _ ")" { return crearNodo('agrupacion', { exp }) }
  / "[" _ exp:Expresion _ "]" { return crearNodo('agrupacion', { exp }) }
  / "null" {return crearNodo('Primitivos', { valor: null, tipo: "null" })}
  / id:ID exp:NestedSize { return crearNodo('accederArreglo', { id, exp }) }
  / id:ID { return crearNodo('refVar', { id }) }


TiposVar = "int"{ return text() } 
/ "float"{ return text() } 
/ "boolean" { return text() }
/ "char" { return text() }
/ "string" { return text() }


// en cualquier lugar puede haber un espacio -> en cualquier lugar puede haber un comentario
_ = ([ \t\n\r] / Comentarios)* 


Comentarios = "//" (![\n] .)*
            / "/*" (!("*/") .)* "*/"

