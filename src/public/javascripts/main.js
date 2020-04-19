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
        userScore.appendChild(document.createTextNode("User Score - " + score(user)));
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
    const suits = ["C", "D", "H", "S"];
    const cards = [];
    const top = [];

    for (let i = 0; i < array.length; i++) {
        const suit = suits[Math.floor(Math.random() * 4)];
        if (top.indexOf(array[i] + suit + ".png") === -1){
            top.push(array[i] + suit + ".png");
        } 
        else {
            i--; 
        }
    }
    console.log(top);

    for (let i = 1; i <= 52; i++){
        let card = "";
        //Jack
        if (i % 13 === 11) {
            card = "J" + suits[Math.floor((i - 1)/13)] + ".png";
        } 
        //Queen
        else if (i % 13 === 12) {
            card = "Q" + suits[Math.floor((i - 1)/13)] + ".png";
        } 
        //King
        else if (i % 13 === 0) {
            card = "K" + suits[Math.floor((i - 1)/13)] + ".png";
        } 
        //Ace (When i is 1 or 14)
        else if (i % 13 === 1) {
            card = "A" + suits[Math.floor((i - 1)/13)] + ".png";
        } 
        //Everything else 
        else {
            card = (i%13) + suits[Math.floor((i - 1)/13)] + ".png";
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
function display(cards, section) {
    if (section.getAttribute('class') === "computer") {
        cards.forEach((card) => {
            const img = document.createElement('img');
            if (cards.indexOf(card) !== 0){
                img.setAttribute('src', '../cards/card_back.png');
            } 
            else {
                img.setAttribute('src', '../cards/' + card);
            }
            section.appendChild(img);
        });
    } 
    else {
        cards.forEach((card) => {
            const img = document.createElement('img');
            img.setAttribute('src', '../cards/' + card);
            section.appendChild(img);
        });
    }
}
function score(hand) {
    let score = 0;
    let aces = 0;
    hand.forEach((card) => {
        const value = card.charAt(0);
        if (value === "J" || value === "Q" || value === "K") {
            score += 10;
        } 
        else if (value === "A") {
            aces++;
        } 
        else {
            score += parseInt(value);
        }
    });

    if (aces === 1) { 
        if (score + 11 > 21){
            score++;
        } 
        else {
            score += 11;
        }
    } 
    else if (aces >= 2) {
        score += (aces - 1);
        if (score + 11 > 21) {
            score++;
        } 
        else {
            score += 11;
        }
    }
    return score;
}
