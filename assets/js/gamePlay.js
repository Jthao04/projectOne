function showModal(winnerString) {
    ui.revealCard()
    const modal = document.querySelector("#modal");
    const modalTextDisplay = document.querySelector("#modalLabel");
    const modalText = `${winnerString}`
    const playAgain = document.querySelector("#playAgain")
    setTimeout(() => {
        playAgain.focus();
    }, 10);

    modal.style.display = "flex";
    modalTextDisplay.textContent = modalText;
    hitEl.removeEventListener("click", hit)
}
function hideModal() {
    const modal = document.querySelector("#modal");
    ui.hideCard()
    modal.style.display = "none";
}
function addCardToScore(theHand) {
    const lastCardDealt = theHand.cards.length - 1;
    let theCardValue = parseInt(theHand.cards[lastCardDealt].value);
    theCardValue++;
    switch (true) {
        case (theCardValue == 1):
            //The card is an ace which can be equal to 1 or 11
            if (theHand.score + 11 > 21) {
                theHand.score += 1;
            } else {
                theHand.score += 11;
                theHand.ace = true;
            }
            break;
        //Cards 2 thru 9
        case (theCardValue < 10):
            theHand.score += theCardValue;
            break;
        //Cards 10, Jack, Queen, King
        default:
            theHand.score += 10;
    }
    if(theHand.score>21 && theHand.ace){
        theHand.score -= 10;
        theHand.ace = false;
    }
}
function clearHands() {
    player.cards = [];
    player.score = 0;
    player.ace = false;
    dealer.cards = [];
    dealer.score = 0;
    dealer.ace = false;
    ui.init(player.cards, dealer.cards, deck.cards)
}
function dealBeginningHands() {
    let card = {};
    card = drawCard();
    player.cards.push(card);
    addCardToScore(player);
    card = drawCard();
    dealer.cards.push(card);
    addCardToScore(dealer);
    card = drawCard();
    player.cards.push(card);
    addCardToScore(player);
    card = drawCard();
    dealer.cards.push(card);
    addCardToScore(dealer);
}
function dealersTurn() {
    while (dealer.score < 17) {
        card = drawCard();
        dealer.cards.push(card);
        addCardToScore(dealer);
    }
}
const hitEl = document.querySelector('#hit');
const stayEl = document.querySelector('#stay');
hitEl.addEventListener('click', function () {
    hit()
});
stayEl.addEventListener('click', function () {
    stay()
});



function hit() {
    card = drawCard();
    player.cards.push(card);
    addCardToScore(player);
    if (player.score >= 21) {
        if (player.score == 21) {
            dealersTurn();
        }
        else {
            showModal("You Busted! You Lose!");
            score.dealerWin()
        }
    }
}
function stay() {
    dealersTurn()
    if (dealer.score >= 22) {
        showModal("The Dealer Busted! You Win!");
        score.playerWin()
    } else {
        if (player.score > dealer.score) {
            showModal("You Win!!");
            score.playerWin()

        } else if (player.score < dealer.score) {
            showModal("You Lose");
            score.dealerWin()
        } else {
            showModal("You Pushed With The Dealer")
        }
    }
}
function scoreBeginningDeal(gameOver) {
    if (dealer.score == 21 && dealer.cards[1].value == 0) {
        gameOver = true;
        if (player.score == 21) {
            showModal("What are the odds?  You pushed with the dealer's blackjack!")
        }
        else {
            showModal("The dealer wins with a BLACKJACK");
            score.dealerWin()
        }
    } else if (player.score == 21) {
        gameover = true;
        showModal("You win with a BLACKJACK!!!");
        score.playerWin()
    }
    return gameOver
}
function playGame() {
    let gameOver = false;
    dealBeginningHands();
    gameOver = scoreBeginningDeal(gameOver);
}
function intitGame() {
    deck.create();
    ui.init(player.cards, dealer.cards, deck.cards);
    ui.start();
    playGame();
}

intitGame();
function playAgain() {
    clearHands();
    if (deck.marker) deck.create();
    playGame()
    hideModal()
}
const playAgainBttn = document.querySelector("#modal > div > div > div.modal-footer > button.btn.btn-primary");
playAgainBttn.addEventListener("click", playAgain);

const endGame = document.querySelector("#modal > div > div > div.modal-footer > button.btn.btn-secondary");
endGame.addEventListener("click", () => {
    window.location.href = "./contact.html"
})