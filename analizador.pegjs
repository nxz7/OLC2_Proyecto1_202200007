
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
      'declaracionStructz': nodos.DeclaracionStructz,
      'typeof': nodos.Typeof,
      'assign': nodos.Assign,
      'asignacionArregloNew': nodos.AsignacionArregloNew,
      'assignIndiceArreglo': nodos.AssignIndiceArreglo,
      'ternario': nodos.Ternario,
      'accederArreglo':nodos.AccederArreglo,
      'funcionesArreglo': nodos.FuncionesArreglo,
      'brackets': nodos.Brackets,
      'declaracionVarTipo': nodos.DeclaracionVarTipo,
      'casesSwitch': nodos.CasesSwitch,
      'occurenceStruct': nodos.OccurenceStruct,
      'declaracionFunction': nodos.DeclaracionFunction,
      'getterStruct': nodos.GetterStruct,
      'setterStruct': nodos.SetterStruct,
      'creacionInstanceStruct': nodos.CreacionInstanceStruct,
      'forEach': nodos.ForEach
    }

    const nodo = new tipos[tipoNodo](props)
    nodo.location = location()
    return nodo
  }
}

programa = _ decl:Declaracion* _ { return decl }

//>MAIN
Declaracion = decl:DecFunction _ { return decl }
            / decl:DecVariable _ { return decl }
            / decl:DecStructz _ { return decl }
            / statement:Statement _ { return statement }


DecFunction = tipoFunc:"void" _ id:ID _ "(" _ Parameters:Parametros? _ ")" _ brackets:Brackets { return crearNodo('declaracionFunction', { tipoFunc, id, Parameters: Parameters || [], brackets,res: null }) }
            /tipoFunc:TiposVar res:Corchetes* _ id:ID _ "(" _ Parameters:Parametros? _ ")" _ brackets:Brackets { return crearNodo('declaracionFunction', { tipoFunc, id, Parameters: Parameters || [], brackets, res: res.length ||null  }) }


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
//---------------DECLARACION STRUCTZZZZZZZ
DecStructz = "struct" _ id:ID _ "{" _ decl:StructAttrbtz* _ "}" _ ";" { return crearNodo('declaracionStructz', { id, declaraciones: decl }) }
            /idStruct:ID _ id:ID _"=" _ exp:Expresion _ ";" { return crearNodo('creacionInstanceStruct', { idStruct, id, exp }) }

//----STRCUTS UNICAMENTE ATRIBUTOS
StructAttrbtz= decl:DecVariable _ { return decl }
            /idStruct:ID _ id:ID _ ";"{ return crearNodo('creacionInstanceStruct', { idStruct, id, exp: null }) }

//cambio! 

//----------------aca van los print, if else y todo tipo de statements ---------------
Statement = "System.out.println(" _ Listaexp:ListaExpresiones* _ ")" _ ";" { return crearNodo('print', { Listaexp }) }
    / Brackets:Brackets{ return Brackets }
    / "while" _ "(" _ condition:Expresion _ ")" _ whileBracket:Statement { return crearNodo('while', { condition, whileBracket }) }
    / "if" _ "(" _ condition:Expresion _ ")" _ trueBracket:Statement
      falseBracket:(
        _ "else" _ falseBracket:Statement { return falseBracket } 
      )? { return crearNodo('if', { condition, trueBracket, falseBracket }) }
    / "for" _ "("_ id:TempForEach _ ":"_ id2:Prim _ ")" _ forEachBracket:Statement { return crearNodo('forEach', { id, id2, forEachBracket}) }
    / "for" _ "(" _ initialization:FirstFor?  _ condition:Expresion _ ";" _ update:Expresion _ ")" _ forBracket:Statement {
      return crearNodo('for', { initialization, condition, update, forBracket })}
    / "switch" _ "(" _ exp:Expresion _ ")" _ "{" _ cases:Case* _ Default:DefaultCase? _ "}" { return crearNodo('switch', { exp, cases, Default }) }
    / "break" _ ";" { return crearNodo('break') }
    / "continue" _ ";" { return crearNodo('continue') }
    / "return" _ exp:ReturnElements? _ ";" { return crearNodo('return', { exp }) }
    / exp:Expresion _ ";" { return crearNodo('expresionStatement', { exp }) }

//SEPARARA PARA BRACKETS
Brackets="{" _ decl:Declaracion* _ "}" { return crearNodo('brackets', { declaraciones:decl }) }



TempForEach = tipoz:TiposVar _ id:ID { return crearNodo('declaracionVarTipo', { id, exp:null, tipoz }) }

//-----------------PARAMETROS DE FUNCIONES-------------------

Parametros = first:Parametro _ rest:("," _ param:Parametro { return param })* { return [first, ...rest] }
Parametro = tipo:TiposVar _ id:ID { return { tipo: tipo, id: id } }
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

Assign = id:ID  exp:NestedSize _ op:("="/"+="/"-=") _ assign:Expresion { return crearNodo('assignIndiceArreglo', { id, exp, assign, op}) }
        /toAssign:Call _ "=" _ valorAttr: AsignarNewValue { 
        if (toAssign instanceof nodos.RefVar) {return crearNodo('assign', { id:toAssign.id, assign:valorAttr, op:"="})} 
        if (!(toAssign instanceof nodos.GetterStruct)) {console.log('Error: Para asignarle valor esta debe ser una propiedad de un objeto');}
        return crearNodo('setterStruct', { structObj: toAssign.callObj, attribute: toAssign.attribute, valorAttr })}
        /id:ID _ op:("+="/"-=") _ assign:AsignarNewValue { return crearNodo('assign', { id, assign, op}) }
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

Relacional = izq:SumaSub expansion:(
  _ op:(">=" / "<="/">" / "<") _ der:SumaSub { return { tipo: op, der } }
)* { 
  return expansion.reduce(
    (previousOp, actualOp) => {
      const { tipo, der } = actualOp
      return crearNodo('operacion', { op:tipo, izq: previousOp, der  })
    },
    izq
  )
}


SumaSub = izq:MulDivMod expansion:(
  _ op:("+" / "-") _ der:MulDivMod{ return { tipo: op, der } }
)* { 
  return expansion.reduce(
    (previousOp, actualOp) => {
      const { tipo, der } = actualOp
      return crearNodo('operacion', { op:tipo, izq: previousOp, der  })
    },
    izq
  )
}

MulDivMod = izq:Unaria expansion:(
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

Call = callee:(laDELobj/TypeOF) _ 
Op:( "(" argumentos:Argz? ")" { return {argumentos, tipo: 'CallFuncion'} }
  / ("." _ id:ID _ { return { id, tipo: 'get' } }))* 
  { const OpTipo = Op.reduce(
    (callObj, argumentos) => { const { tipo, id, argumentos:argg } = argumentos
      if (tipo === 'CallFuncion') {
        return crearNodo('call', { callee: callObj, argumentos: argg || [] })
      } else if(tipo === 'get'){
        return crearNodo('getterStruct', { callObj, attribute:id })
      }},
    callee)
  return OpTipo
}

laDELobj= id:"Object.keys" { return crearNodo('refVar', { id }) }

TypeOF = "typeof"  _ argumentos:TypeOF _  {return crearNodo('typeof', {  argumentos: argumentos || [] })}
        / Prim

//---- getter y setter de los argumentos


Argz = argum:ReturnElements _ argumentos:("," _ exp:ReturnElements { return exp })* { return [argum, ...argumentos] }

ReturnElements = "{" _ elements:NestedArrayElements _ "}" {return elements;}
                /"new" _ tipoNew:TiposVar exp:NestedSize { return crearNodo('asignacionArregloNew', { tipoNew, exp, dimNew:exp.length }) }
                /  exp:Expresion  { return exp }




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
  / id:ID "{" _ attributes:attStructs? _ "}" { return crearNodo('occurenceStruct', { id, attributes: attributes || [] }) }
  /id:ID "."funcion:("length"/"join"/"indexOf") exp:("(" exp: Argz? ")"{ return exp })? { return crearNodo('funcionesArreglo', { id, funcion, exp: exp ||null }) }
  / id:ID exp:NestedSize { return crearNodo('accederArreglo', { id, exp }) }
  / id:ID { return crearNodo('refVar', { id }) }




attStructs = first:attItem rest:("," _ attItem)* {
    return [first, ...rest.map(item => item[2])];
}

attItem = id:ID _ ":" _ prim:Prim {
    return { id, valor: prim.valor, tipo: prim.tipo };
}

// "new" _ id:ID _ "(" _ attributes:Argz? _ ")" { return crearNodo('occurenceStruct', { id, attributes: attributes || [] }) }

TiposVar = "int"{ return text() } 
/ "float"{ return text() } 
/ "boolean" { return text() }
/ "char" { return text() }
/ "string" { return text() }



// en cualquier lugar puede haber un espacio -> en cualquier lugar puede haber un comentario
_ = ([ \t\n\r] / Comentarios)* 


Comentarios = "//" (![\n] .)*
            / "/*" (!("*/") .)* "*/"

