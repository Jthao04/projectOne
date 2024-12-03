const deckObject = {
    cards: [],
    numberOfDecks: 1,
    /*
       Create 
       fills the cards array with 52 cards times the number of decks.  
       It then shuffles the cards by traversing thru the array starting at the end of the array and randomly swapping the values of the index
      */
    create: function () {
        for (let i = 0; i < this.numberOfDecks; i++)
            for (let j = 0; j < 52; j++) {
                this.cards.push(j);
            }

        let array = this.cards;
        let tmp,
            current,
            top = array.length;

        if (top)
            while (--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = array[current];
                array[current] = array[top];
                array[top] = tmp;
            }
        cards = array;
    }, 
    emptyDeck : function(){
        if(this.cards.length==0){
            return true; 
        }
        else{
            return false;
        }
    }
};

const deck = deckObject;

let player = {
    cards : [],
    score : 0, 
    ace : false
}

let dealer = {
    cards : [],
    score : 0, 
    ace : false
}

/*  Function: drawcard
    The purpose for this function is to draw a card from the deck, before doing so it checks to see if there are any cards in the deck, refills and shuffles deck if empty.
    The method to pull out the value and suit of the card is done by running two math operations on the value of the card that was popped from the deck. 
*/
drawCard = function () {
    if (deck.emptyDeck()) deck.create();

    let temp = deck.cards.pop();

    const cardInfo = { value: temp % 13, suit: Math.floor(temp / 13) };
    return cardInfo;
};


// This is the board object that we can copy from
const board = {
    dealerHand: [],
    playerHand: [],
    dealToDealer: function (cardObject) {
        this.dealerHand.push(cardObject)
    },
    dealToPlayer: function (cardObject) {
        this.playerHand.push(cardObject)
    }
}




/*
pseudo code/game rules for game logic:
    rules: all cards to player are dealt face up
        value of aces are 1 or 11, rule to 1 or 11 if hand + 11 <= 21 then the ace is worth 11 otherwise its worth 1
 
    
    deal a card to player
    deal a card to the dealer face down
    deal a card to player
    deal a card to the dealer face up
 
    rules for blackjack after the deal
        if player has blackjack flip dealers down card face up, check for dealer blackjack if dealer has blackjack its a push otherwise player wins
        if the dealer has an ace for his up card (get the sum of the dealers hand) if the dealer has blackjack flip the down card to show the  blackjack, player loses
 
    continuing game play past the initial deal
        Player is asked to take a hit or stay
            hit the player gets a card the value of the card is added to the hand if it exceeds 21 the player loses the hand
            the player can hit as many times as they like until they stay or until they bust.
        player stays play is turned over to dealer
            if the dealer has a score of less than 17 they will take hits until their score >= 17 or they bust
        after the dealer is done hitting or has stood the two hands are compared for scoring 
        player > dealer player wins
        player < dealer player loses
        player = dealer its a push
 
*/
const game = {};

