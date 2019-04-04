//FUNCION PARA INSERTAR TEXTO EN POSICICION DE CURSOR //TODO ESTO NO LO MODIFIQUES
function insertAtCursor(myField, myValue) {
    //IE support
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
    }
    //MOZILLA and others
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos)
            + myValue
            + myField.value.substring(endPos, myField.value.length);
        myField.selectionStart = startPos + myValue.length;
        myField.selectionEnd = startPos + myValue.length;
    } else {
        myField.value += myValue;
    }
}


     //FUNCION PARA EVALUAR LA FUNCION DEL ALGORITMO
function F(x) { //esa x
     var funcion=document.getElementById('funcion').value;

     funcion = funcion.replace(/sin/ig,"Math.sin");
     funcion = funcion.replace(/cos/ig,"Math.cos");
     funcion = funcion.replace(/tan/ig,"Math.tan");
     funcion = funcion.replace(/e/ig,"Math.E");
     funcion = funcion.replace(/([a-z]|\d+(?:\.\d+)?)*\s*\^\s*([a-z]|\d+(?:\.\d+)?)/ig, "Math.pow($1, $2)");
     

//reemplazar equis
var equis=[];
for (var i =0;i < funcion.length;i++) {
     if (funcion[i].toLowerCase() === "x") equis.push(i);
}

var totalX = equis.length;
for(var i=0;i<totalX; i++){
     funcion=funcion.replace('x',x) // y aqui las "x" las cambia por el x que le metes
}

return eval(funcion);
}


function obtenerdatos(){
var Pa = document.getElementById('Aprox').value;
Pa = parseFloat(Pa);
var n;
var raizzz = "";
var rot = document.getElementById("totalraiz");
var diff;
var derivadaevalluada;

     var expr = document.getElementById('funcion').value;
       diff = nerdamer.getCore().Calculus.diff(nerdamer(expr).symbol).text();
      console.log(diff);


     diff = diff.replace(/sin/ig,"Math.sin");
     diff = diff.replace(/cos/ig,"Math.cos");
     diff = diff.replace(/tan/ig,"Math.tan");
     diff = diff.replace(/e/ig,"Math.E");
     diff = diff.replace(/([a-z]|\d+(?:\.\d+)?)*\s*\^\s*([a-z]|\d+(?:\.\d+)?)/ig, "Math.pow($1, $2)");

      //reemplazar equis
     var equis=[];
     for (var i =0;i < diff.length;i++) {
          if (diff[i].toLowerCase() === "x") equis.push(i);
     }

     var totalX = equis.length;
     for(var i=0;i<totalX; i++){
          diff=diff.replace('x',Pa) // se va a evaluar con el valor de An
     }

     derivadaevalluada= eval(diff);
     console.log(Math.abs(derivadaevalluada));


var filaDocumento = "";
var mostrar = document.getElementById("resultados");
     if(derivadaevalluada>1000){

          alert('No existe raiz en el intervalo ingresado');
     }else{

      var fnev;
      var ant=9999.99;
      fnev=Pa;
       n=1; 
      while(ant!=fnev){
        Pa=fnev;
        filaDocumento  +="<tr>"+

                "<td>"+ n +"</td>"+
                "<td>"+ Pa +"</td>"+
                "</tr>";
        ant = Pa;
        fnev=F(Pa);
        n++;
        if(n>=100){
          alert('NO EXISTE RAIZ')
        }

      }
               raizzz="LA RAIZ ES: "+Pa+" ";//RAYOS  
}
         
               mostrar.innerHTML = filaDocumento;
               rot.innerHTML = raizzz;
     }