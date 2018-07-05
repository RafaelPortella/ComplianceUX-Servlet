var cd = null;
var hash = null;
var participante = null;

function attribValues(codigo, codHash, part){
    if(codigo !== undefined && codigo !== "" && codigo !== null && 
       codHash !== undefined && codHash !== "" && codHash !== null && 
       part !== undefined && part !== "" && part !== null){
        cd           = codigo;
        hash         = codHash;
        participante = part;                     
        return "go";
    }
    return "break";
}

