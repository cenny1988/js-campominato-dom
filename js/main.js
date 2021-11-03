// Parte 1
/*
Consegna L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata,
in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro (o simili, l’importante è dare all’utente il feedback che ha scoperto una casella che rimarrà scoperta, con il numero relativo).
*/
// Parte 2
/**
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l’utente clicca su ogni cella:
se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina,

altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
(come detto sull’effetiva interfaccia fate voi, non ci son specifiche vincolanti, ma partite semplici)
La partita termina quando il giocatore clicca su una bomba
o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve scoprire tutte le bombe e comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato un quadratino con un numero consentito. (quindi se ci pensate dovrete tenere traccia del punteggio).
*/


// user sceglie il livello del gioco cliccando sul bottone relativo
// quindi in base al livello la griglia avrà 100 81 o 49 celle.
const level1 = document.getElementById('level1');
const level2 = document.getElementById('level2');
const level3 = document.getElementById('level3');
const grid = document.getElementById('grid');
let bombs = [];
const result = document.getElementById('cell-checked');

//console.log(squareCount);

// scelta utente
level1.addEventListener('click',
    ()=> generateGrid(100, 'ten'),
    
);

level2.addEventListener('click',
    ()=> generateGrid(81, 'nine')
);

level3.addEventListener('click',
    ()=> generateGrid(49, 'seven')
);

// creazione griglia celle con numerazione interna
function generateGrid(numCell, helperClass){
    grid.innerHTML = ""; // reset griglia!
    let squareCount = 0;
    


    //generiamo un array di 16 numeri random
    generateBomb(numCell);
    console.log(bombs);

    for (i=0; i<numCell; i++) {
        squareCount=0;
        let square = createElementWith2Class('div','square',helperClass)//richiama funz per creare div con 2 classi da passare

        let squareSpan = document.createElement('span');//crea span con numero cella
        squareSpan.append(i+1);

        // se il numero i-esimo è uguale ed incluso ad un numero nell array bombe allora aggiungiamo classe css bombs allo square....
        if (bombs.includes(i+1)){
            square.classList.add('bomb');
        }
        
        square.appendChild(squareSpan);//appendi span nella cella

        
        // evento click sulla cella singola che aggiunge classe checked
        square.addEventListener('click',
            function(){
                //aggungi la classe checked allo square, 
                this.classList.add('checked');

                //se troviamo valore: square ${helperClass} bombs checked --> hai perso / scoppiano bombe
                if ( this.classList.value === `square ${helperClass} bomb checked` ){
                    // hai perso!
                    console.log('hai perso!');
                    let bombe = document.getElementsByClassName('bomb');//selezioniamo tutte le bombe

                    // esplosione bombe
                    for ( j=0; j<bombe.length; j++){
                        bombe[j].classList.add('checked');
                    }
                    
                }

                squareCount++ ;
                result.innerText = `Punteggio: ${squareCount}`;
                return squareCount
            }
            
        );
        
        
        

        grid.appendChild(square);//appendi cella nella griglia
    }

    return squareCount
}

// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.

//generiamo un array di 16 numeri random tutti diversi che simulano le bombe

function generateBomb(numCell){
    bombs = [];
    let i=0;
    while (i<15) {
        let n = numRandom(numCell)
        if (bombs.includes(n)===false){
            bombs.push(n);
            i++;
        }  
    }
    return bombs;
}

// funzione numero random 
function numRandom(numCell){
    return Math.floor(Math.random() * numCell) + 1;
}

// crea elemento div con 2 classi da passare 
function createElementWith2Class(elType,class1,class2){
    let newSquare = document.createElement(elType);
    newSquare.classList.add(class1,class2);
    return newSquare
}
