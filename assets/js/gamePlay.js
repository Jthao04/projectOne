/*

AceCheck For Dealer
Player Hand
Dealer Hand
Display Outcome
Clear Board
until player quits
Side note: the routine(s) that will deal the hands will call the function that will place the card(s) on the 
table.
For sake of coding the deck variable needs to be global.  The hands also should be global or they 
should be a nested object so it only requires to pass and return the one object through out the game 
play.
Hand = {
cards[],
score
}
players = {player: hand, dealer: hand}
*/
function addCardToScore(theHand){
    const lastCardDealt = theHand.cards.length - 1;
    let theCardValue = parseInt(theHand.cards[lastCardDealt].value);
    theCardValue++;

    switch(true) {  
        case (theCardValue == 1):
         //The card is an ace which can be equal to 1 or 11
         if(theHand.score<12){      
            theHand.score +=11;
            theHand.ace=true;
          }
          else {
            theHand.score +=1;
          }
            break;
        //Cards 2 thru 9
         case (theCardValue < 10) : 
            theHand.score += theCardValue;
            break;
                //Cards 10, Jack, Queen, King
        default: 
            theHand.score +=10;
        }
    //This condition is to check in the event the player busted with their last card drawn to see if they previously had an ace that was worth 11 points in the event there was an ace in the hand it subtracs 10 from the score so the current card no longer caused the player to bust.
    if(theHand.score>21 && theHand.ace){  
        theHand.score -= 10;        
        theHand.ace = false;
    };
    
}

function clearHands(){
    player.cards = [];
    player.score = 0;
    player.ace = false;

    dealer.cards = [];
    dealer.score = 0;
    dealer.ace = false;
}

function dealBeginningHands(){
    
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

function dealersTurn(){
    while(dealer.score<17){
        card = drawCard();
        dealer.cards.push(card);
        addCardToScore(dealer);
    }
}


function playersTurn(){
 
const hitEl = document.querySelector('#hit');
const stayEl = document.querySelector('#stay');

// Attach event listener to hit button element
hitEl.addEventListener('click', function () {
    card = drawCard();
    player.cards.push(card);
    addCardToScore(player);
});

// Attach event listener to decrement button element
stayEl.addEventListener('click', function () {
    if(player.score<22){
        dealersTurn()
        if(dealer.score>=22){
            //TODO: code for dealer busted goes here
        }else{ 
            if(player.score>dealer.score){
                //TODO:code for player wins goes here
            }else if(player.score<dealer.score){
                 //TODO:code for dealer wins goes here
            }
            else{
            //     //TODO: CODE FOR PUSH GOES HERE
            }
        }
    } else{
    //TODO: code for player busted goes here
    }
});
  
}


function scoreBeginningDeal(gameOver){
    if(dealer.score==21 && dealer.cards[1].value ==0){
        gameOver=true;
        if(player.score==21){
            //TODO: code for push goes here
        }
        else{
            //TODO: code for dealer wins goes here
        }
    }else if(player.score==21){
        gameover=true;
        //TODO: code for player wins goes here
    }
}

function playGame(){
    let gameOver = false;

    dealBeginningHands();
    gameOver = scoreBeginningDeal(gameOver);
    
    if(!gameOver){
        playersTurn();
    }    
}


function intitGame(){
    deck.create();
    ui.init(player.cards, dealer.cards, deck.cards);
    ui.start();
    
       playGame();
    
    // TODO:  This is where the code goes for when the player quits the game. 
    }

intitGame();

