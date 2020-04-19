document.addEventListener('DOMContentLoaded', main);

function main() {
    //Handle the Form Submission
    let array; 
    document.addEventListener("submit", function(event) {
        let form = document.querySelector(".start"); 
        event.preventDefault();
        form.style.display = "none";
        array = document.getElementById("startValues").value.split(',');

        //Generate a Deck of Cards and Deal Cards
        let deck = generateDeck(array);
        let user = []; 
        let computer = []; 
        
        console.log(deck); 

        computer.push(deck.shift());
        user.push(deck.shift());
        computer.push(deck.shift());
        user.push(deck.shift());


        console.log(computer); 
        console.log(user);
        //Get <div class="game">
        const game = document.querySelector(".game"); 


        //<div class="computer"> 
        const computerSection = document.createElement("section"); 
        computerSection.setAttribute("class", 'computer'); 

        //<h3>Computer Score</h3> 
        const computerScore = document.createElement("h3"); 
        computerScore.appendChild(document.createTextNode("Computer Score - ?"));
        computerSection.appendChild(computerScore); 

        game.appendChild(computerSection)

        //<div class="user"> 
        const userSection = document.createElement("section"); 
        userSection.setAttribute("class", 'user'); 

        //<h3>user score</h3>
        const userScore = document.createElement("h3"); 
        userScore.appendChild(document.createTextNode("User Score - ?"));
        userSection.appendChild(userScore); 

        game.appendChild(userSection); 
        

        //Create <div class="buttons"> 
        const buttons = document.createElement("div"); 
        buttons.setAttribute("class", "buttons"); 
        //<button>Stand</button>
        const stand = document.createElement('button');
        stand.appendChild(document.createTextNode("Stand"));
        buttons.appendChild(stand);
        //<button>hit</button>
        const hit = document.createElement('button');
        hit.appendChild(document.createTextNode("Hit"));
        buttons.appendChild(hit); 

        game.appendChild(buttons);

        display(computer, computerSection); 
        display(user, userSection);
    }); 
}
function generateDeck(array) {
    const suits = ["clubs", "diamonds", "hearts", "spades"];
    const cards = [];
    const top = [];

    for (let i = 0; i < array.length; i++) {
        const suit = suits[Math.floor(Math.random() * 4)];
        if (array[i] === "J") {
            if (top.indexOf("jack_of_" + suit + ".png") === -1){
                top.push("jack_of_" + suit + ".png");
            } 
            else {
                i--; 
            }
        } 
        else if (array[i] === "Q"){
            if (top.indexOf("queen_of_" + suit + ".png") === -1){
                top.push("queen_of_" + suit + ".png");
            } 
            else {
                i--; 
            }
        } 
        else if (array[i] === "K"){
            if (top.indexOf("king_of_" + suit + ".png") === -1){
                top.push("king_of_" + suit + ".png");
            } 
            else {
                i--; 
            }
        } 
        else if (array[i] === "A") {
            if (top.indexOf("ace_of_" + suit + ".png") === -1){
                top.push("ace_of_" + suit + ".png");
            } 
            else {
                i--; 
            }
        } 
        else {
            if (top.indexOf(array[i] + "_of_" + suit + ".png") === -1){
                top.push(array[i] + "_of_" + suit + ".png");
            } 
            else {
                i--; 
            }
        }
    }
    console.log(top);

    for (let i = 1; i <= 52; i++){
        let card = "";
        //Jack
        if (i % 13 === 11) {
            card = "jack_of_" + suits[Math.floor((i - 1)/13)] + ".png";
        } 
        //Queen
        else if (i % 13 === 12) {
            card = "queen_of_" + suits[Math.floor((i - 1)/13)] + ".png";
        } 
        //King
        else if (i % 13 === 0) {
            card = "king_of_" + suits[Math.floor((i - 1)/13)] + ".png";
        } 
        //Ace (When i is 1 or 14)
        else if (i % 13 === 1) {
            card = "ace_of_" + suits[Math.floor((i - 1)/13)] + ".png";
        } 
        //Everything else 
        else {
            card = (i%13) + "_of_" + suits[Math.floor((i - 1)/13)] + ".png";
        }

        //If these cards are not on the top of the deck
        if (top.indexOf(card) === -1){
            cards.push(card);
        }
    }
    // shuffle(cards);
    return top.concat(cards);
}
function shuffle(cards) {
    let i = 0;
    let j = 0;
    let temp; 
    for (i = cards.length - 1; i > 0; i --) {
        j = Math.floor(Math.random() * (i + 1))
        temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }
}
function display(cards, div) {
    if (div.getAttribute('class') === "computer") {
        cards.forEach((card) => {
            const img = document.createElement('img');
            if (cards.indexOf(card) !== 0){
                img.setAttribute('src', '../cards/card_back.png');
            } 
            else {
                img.setAttribute('src', '../cards/' + card);
            }
            div.appendChild(img);
        });
    } 
    else {
        cards.forEach((card) => {
            const img = document.createElement('img');
            img.setAttribute('src', '../cards/' + card);
            div.appendChild(img);
        });
    }
}