let minasMax = 0
let colUser = 0
let rowUser = 0

function iniciarPartida(){
    rowUser = parseInt(prompt("Numero de filas"))
    if (rowUser > 30){
        rowUser = 30
    }
    else if (rowUser <10){
        rowUser = 10
    }
    colUser = parseInt(prompt("Numero de columnas"))
    if (colUser > 30){
        colUser = 30
    }
    else if (colUser <10){
        colUser = 10
    }
    // minasMax = parseInt(colUser*rowUser*0.17)
    minasMax = 1  
    crearTabla()
}

function crearTabla(){
    taulellHtml = "<table>"
    taula = document.getElementById("taulell")


    for (let i=1;i<=rowUser;i++){
        taulellHtml += "<tr>";
        for (let j=1;j<=colUser;j++){
            taulellHtml+= `<td id=${i+"-"+j} data-mina="false" data-num="0" data-abierto="false"><img id=${i+"--"+j} src="/imagenes/fons20px.jpg" onclick="obreCasella(${i},${j})"></td>`;
            
        }
        taulellHtml += "</tr>";
    } 
    taulellHtml += "</table>"
    taula.innerHTML = taulellHtml;
    setmines()
    calculaAdjacents()
}

function obreCasella(row,col){
    // console.log(row +"-"+ col)
    jose = document.getElementById(`${row}-${col}`)
    if(jose && jose.dataset.mina == "true"){
        console.log("BOMBA")
        jose.innerHTML = `<img src="/imagenes/mina20px.jpg">`
        enseñarBombas()
        desactivarClick()
        alert("Has perdido")
        otra = prompt("Quieres jugar otra partida? (si/no)")
        if(otra == "si"){
            iniciarPartida()
        }
    }
    else{
        jose.innerHTML = jose.dataset.num
        if(jose.dataset.num == 0){
            for(x=-1; x<=1; x++){
                for(y=-1; y<=1; y++){
                    if(row+x >=1 && row+x<=rowUser && col+y >=1 && col+y<=colUser ){
                        juan = document.getElementById(`${(row+x) +"-"+ (col+y)}`)
                        console.log(juan)
                        if(juan != null){
                            if (juan.dataset.abierto == "false"){
                                juan.dataset.abierto = "true"
                                juan.innerHTML = juan.dataset.num
                                if(juan.dataset.num == "0"){
                                    obreCasella(row+x,col+y)
                                }
                                
                            }
                        }
                        
                    }
                    
                }
            } 
        }
        else{
            juan.innerHTML = juan.dataset.num
        }
    }
    
    
}

function destaparCeros(row,col){
    juan = document.getElementById(`${row +"-"+ col}`)
    // console.log(juan)
    for(x=-1; x<=1; x++){
        for(y=-1; y<=1; y++){
            if(row+x >=1 && row+x<=rowUser && col+y >=1 && col+y<=colUser ){
                juan = document.getElementById(`${(row+x) +"-"+ (col+y)}`)
                console.log(juan)
                if(juan != null){
                    if (juan.dataset.abierto == "false"){
                        juan.dataset.abierto = "true"
                        juan.innerHTML = juan.dataset.num
                        if(juan.dataset.num == "0"){
                            destaparCeros(row+x,col+y)
                        }
                        
                    }
                }
                
            }
            
        }
    } 
}

function desactivarClick(){
    let casilla
    for (let i=1;i<=colUser;i++){
        for (let j=1;j<=rowUser;j++){
            casilla= document.getElementById(`${i +"--"+ j}`);
            if (casilla != null){
                casilla.onclick="";
            }
        }
    }
}

function enseñarBombas(){
    for (let i=1;i<=colUser;i++){
        for (let j=1;j<=rowUser;j++){
            bomba= document.getElementById(`${i +"-"+ j}`);
            if(bomba.dataset.mina==="true"){
                bomba.innerHTML=`<img src="imagenes/mina20px.jpg"></img>`;
                
            }
        }
    }
}

function setmines(){

    let felipe, x, y
    // console.log(colUser)
    // console.log(rowUser)
    // console.log(minasMax) 
    do{
        x = parseInt((Math.random() * rowUser)+1)
        y = parseInt((Math.random() * colUser)+1)
        felipe = document.getElementById(`${x}-${y}`)
        // console.log(`${x}-${y}`)
        if(felipe && felipe.dataset.mina == "false"){
            felipe.dataset.mina = "true";
            minasMax--;
        }
    }while(minasMax > 0)
    
}

function calculaAdjacents(){
    contador = 0
    
    for(a=1; a <= rowUser; a++){
        for(b=1; b <= colUser; b++){
            for(x=-1; x<=1; x++){
                for(y=-1; y<=1; y++){
                    bomba = esMina(a+x,b+y)
                    if (bomba){
                        contador++
                    }
                }
            }
            setNum(a,b,contador)
            contador = 0;
        }
    }
}

function esMina(row,col){
    // console.log(row)
    // console.log(col)
    if (row <= 0 || row > rowUser){
        return false
    }
    else if (col <= 0 || col > colUser){
        return false
    }
    else{
        pedro = document.getElementById(`${row}-${col}`)
        if(pedro.dataset.mina == "true"){
            return true
        }
        return false
    } 
    
}

function setNum(a,b,contador){
    // console.log("numero de minas: " + contador)
    manu = document.getElementById(`${a}-${b}`)
    manu.dataset.num = contador
}
