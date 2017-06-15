function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var possiblePictures = [
    'fa-coffee',
    'fa-cog',
    'fa-cogs',
    'fa-comment',
    'fa-comment-o',
    'fa-commenting',
    'fa-commenting-o',
    'fa-comments',
    'fa-comments-o',
    'fa-copyright',
    'fa-creative-commons',
    'fa-credit-card',
    'fa-credit-card-alt',
    'fa-crop',
    'fa-crosshairs',
    'fa-cube',
    'fa-cubes',
    'fa-cutlery',
    'fa-dashboard',
    'fa-database',
    'fa-deaf',
    'fa-deafness',
    'fa-desktop',
    'fa-diamond',
    'fa-dot-circle-o',
    'fa-download'
]


var wrapperDiv = document.getElementById('cards-wrapper');
var rowNumber = wrapperDiv.dataset['rowNumber'];
var columnNumer = wrapperDiv.dataset['columnNumber'];


var numberOfDifferentPicturesToUse = (rowNumber * columnNumer) / 2;
var picturesToUse = possiblePictures.slice(0, numberOfDifferentPicturesToUse);
var picturesTwice = picturesToUse.concat(picturesToUse);
pictureShuffled = shuffle(picturesTwice);

// wrapperDiv.innerHTML = '<i class="fa fa-file-image-o fa-5x"></i>';
// wrapperDiv.innerHTML += '<i class="fa fa-file-image-o fa-5x"></i>';


var backCardClasss = 'fa-file-image-o';
var imagesToPutOut = '';
var counter = 0;
for (let i = 0; i < rowNumber; i++) {
    for (let j = 0; j < columnNumer; j++) {
        imagesToPutOut += '<i id="' + counter + '" class="fa ' + backCardClasss + ' fa-5x"></i>';
        counter++;
    }
    imagesToPutOut += '<br>';
}
wrapperDiv.innerHTML = imagesToPutOut;

var selectedCardId = null;
var cards = document.getElementsByClassName('fa');
var turnedUpCards = 0;
for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    card.addEventListener('click', function(event) {
        if (selectedCardId === null) {
            // 1st, 3rd, 5th, ... clicks
            selectedCardId = i;
            var cardClicked = document.getElementById(selectedCardId);
            var pictureClass = pictureShuffled[selectedCardId];
            cardClicked.classList.remove(backCardClasss);
            cardClicked.classList.add(pictureClass);
        } else {
            // handle 2nd, 4th, ... clicks
            var currentlySelectedId = i;
            var cardClicked = document.getElementById(currentlySelectedId);
            var pictureClass = pictureShuffled[currentlySelectedId];
            cardClicked.classList.remove(backCardClasss);
            cardClicked.classList.add(pictureClass);

            if (pictureClass === pictureShuffled[selectedCardId]) {
                // we keep the second card turned up
                console.log('pair :)');
                turnedUpCards += 2;
                selectedCardId = null;
                if (turnedUpCards === columnNumer * rowNumber) {
                    alert('You won :D Please refresh the page to play again!');
                }
            } else {
                // if they are different
                // turn back both cards after a second
                setTimeout(function() {
                    // debugger;
                    var firstCard = document.getElementById(selectedCardId);
                    cardClicked.classList.remove(pictureClass);
                    cardClicked.classList.add(backCardClasss);
                    firstCard.classList.remove(pictureShuffled[firstCard.id]);
                    firstCard.classList.add(backCardClasss);
                    selectedCardId = null;
                }, 1000);
            }
        }
        
    });
}