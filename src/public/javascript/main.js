document.addEventListener('DOMContentLoaded', main);

function main() {
    //Handle the Form Submission
    let array;
    document.addEventListener("submit", function (event) {
        let form = document.querySelector(".start");
        event.preventDefault();
        form.style.display = "none";

        array = document.getElementById("startValues").value.split(',');

        //Generate a Deck of Cards and Deal Cards
        let deck = generateDeck(array);
        let user = [];
        let computer = [];

        computer.push(deck.shift());
        user.push(deck.shift());
        computer.push(deck.shift());
        user.push(deck.shift());

        //Get <div class="game">
        const game = document.querySelector(".game");
        game.style.display = "block";

        //<div class="computer"> 
        const computerSection = document.createElement("section");
        computerSection.setAttribute("class", 'computer');

        //<h3>Computer Score</h3> 
        const computerScore = document.createElement("h3");
        computerScore.appendChild(document.createTextNode("Computer Score - ?"));
        computerSection.appendChild(computerScore);

        game.appendChild(computerSection)

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

        //<div class="user"> 
        const userSection = document.createElement("section");
        userSection.setAttribute("class", 'user');

        //<h3>user score</h3>
        const userScore = document.createElement("h3");
        userScore.appendChild(document.createTextNode("User Score - " + score(user)));
        userSection.appendChild(userScore);

        game.appendChild(userSection);

        const computerImgs = document.createElement("div");
        computerImgs.setAttribute("class", "images");
        computerImgs.setAttribute("id", "computer");
        computerSection.appendChild(computerImgs);

        const userImgs = document.createElement("div");
        userImgs.setAttribute("class", "images");
        userSection.appendChild(userImgs);

        display(computer, computerImgs);
        display(user, userImgs);


        hit.addEventListener("click", function (event) {
            event.preventDefault();
            const current = deck.shift();
            user.push(current);
            const card = document.createElement("img");
            card.setAttribute("src", "../cards/" + current);
            userImgs.appendChild(card);

            let text = document.createTextNode("User Score - " + score(user));
            userScore.replaceChild(text, userScore.firstChild);

            //if you hit and the game is over
            if (gameOver(score(user), score(computer))) {
                for (let i = 0; i < computerImgs.childNodes.length; i++) {
                    let child = computerImgs.childNodes[i];
                    child.setAttribute('src', '../cards/' + computer[i]);
                }
                text = document.createTextNode("Computer Score - " + score(computer));
                computerScore.replaceChild(text, computerScore.firstChild);
                winner(score(user), score(computer), game, buttons);
            }
        });

        stand.addEventListener("click", function (event) {
            event.preventDefault();
            while (!(gameOver(score(user), score(computer)))) {
                if (score(computer) >= 18) {
                    for (let i = 0; i < computerImgs.childNodes.length; i++) {
                        let child = computerImgs.childNodes[i];
                        child.setAttribute('src', '../cards/' + computer[i]);
                    }
                    let text = document.createTextNode("Computer Score - " + score(computer));
                    computerScore.replaceChild(text, computerScore.firstChild);
                    break;
                }
                else {
                    computerMove(deck, computer, computerImgs);
                    for (let i = 0; i < computerImgs.childNodes.length; i++) {
                        let child = computerImgs.childNodes[i];
                        child.setAttribute('src', '../cards/' + computer[i]);
                    }
                    let text = document.createTextNode("Computer Score - " + score(computer));
                    computerScore.replaceChild(text, computerScore.firstChild);
                }
            }
            winner(score(user), score(computer), game, buttons);
        });
    });
}
function generateDeck(array) {
    const suits = ["C", "D", "H", "S"];
    const cards = [];
    const top = [];

    for (let i = 0; i < array.length; i++) {
        const suit = suits[Math.floor(Math.random() * 4)];
        if (top.indexOf(array[i] + suit + ".png") === -1) {
            top.push(array[i] + suit + ".png");
        }
        else {
            i--;
        }
    }
    for (let i = 1; i <= 52; i++) {
        let card = "";
        let index = Math.floor((i - 1) / 13);
        //Ace (When i is 1 or 14)
        if (i % 13 === 1) {
            card = "A" + suits[index] + ".png";
        }
        //Jack
        else if (i % 13 === 11) {
            card = "J" + suits[index] + ".png";
        }
        //Queen
        else if (i % 13 === 12) {
            card = "Q" + suits[index] + ".png";
        }
        //King
        else if (i % 13 === 0) {
            card = "K" + suits[index] + ".png";
        }
        //Everything else 
        else {
            card = (i % 13) + suits[index] + ".png";
        }

        //If these cards are not on the top of the deck
        if (top.indexOf(card) === -1) {
            cards.push(card);
        }
    }

    let temp;
    for (let i = cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }
    return top.concat(cards);
}
function display(cards, div) {
    if (div.getAttribute('id') === "computer") {
        cards.forEach((card) => {
            const img = document.createElement('img');
            if (cards.indexOf(card) !== 0) {
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
function score(hand) {
    let total = 0;
    let aces = 0;
    hand.forEach((card) => {
        const value = card.charAt(0);
        if (value === "A") {
            aces++;
        }
        else if (value === "J" || value === "Q" || value === "K" || value === '1') {
            total += 10;
        }
        else {
            total += parseInt(value);
        }
    });

    if (aces === 1) {
        if (total + 11 > 21) {
            total++;
        }
        else {
            total += 11;
        }
    }
    else if (aces >= 2) {
        total += (aces - 1);
        if (total + 11 > 21) {
            total++;
        }
        else {
            total += 11;
        }
    }
    return total;
}
function gameOver(userScore, computerScore) {
    if (userScore >= 21 || computerScore >= 21) {
        return true;
    }
    return false;
}
function computerMove(deck, hand, div) {
    if (score(hand) < 18) {
        hand.push(deck.shift());
        const img = document.createElement('img');
        img.setAttribute('src', '../cards/card_back.png');
        div.appendChild(img);
    }
}
function winner(userScore, computerScore, gameElement, buttons) {
    buttons.style.display = "none";
    let result = document.createElement("h3");

    if (userScore === 21) {
        result.appendChild(document.createTextNode("You won!"));
    }
    else if (computerScore === 21) {
        result.appendChild(document.createTextNode("Computer won!"));
    }
    else if (userScore > 21) {
        result.appendChild(document.createTextNode("Computer won!"));
    }
    else if (computerScore > 21) {
        result.appendChild(document.createTextNode("You won!"));
    }
    else if (userScore > computerScore) {
        result.appendChild(document.createTextNode("You won!"));
    }
    else if (userScore < computerScore) {
        result.appendChild(document.createTextNode("Computer won!"));
    }
    else {
        result.appendChild(document.createTextNode("It's a draw!"));
    }

    gameElement.replaceChild(result, buttons);
}
