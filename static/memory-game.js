function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

var possibleIcons = [
    'fa-book',
    'fa-bookmark',
    'fa-bookmark-o',
    'fa-braille',
    'fa-briefcase',
    'fa-bug',
    'fa-bullhorn',
    'fa-bullseye',
    'fa-bus',
    'fa-cab',
    'fa-calculator',
    'fa-calendar',
    'fa-calendar-check-o',
    'fa-calendar-minus-o',
    'fa-calendar-o',
    'fa-calendar-plus-o',
    'fa-calendar-times-o',
    'fa-camera',
    'fa-camera-retro',
    'fa-car',
    'fa-caret-square-o-down',
    'fa-caret-square-o-left',
    'fa-caret-square-o-right',
    'fa-caret-square-o-up',
    'fa-cart-arrow-down',
    'fa-cart-plus',
    'fa-cc',
    'fa-certificate',
    'fa-check',
    'fa-check-circle',
    'fa-check-circle-o',
    'fa-check-square',
    'fa-check-square-o',
    'fa-child',
    'fa-circle',
    'fa-circle-o',
    'fa-circle-o-notch',
    'fa-circle-thin',
    'fa-clock-o',
    'fa-clone',
    'fa-close',
    'fa-cloud',
    'fa-cloud-download',
    'fa-cloud-upload',
    'fa-code',
    'fa-code-fork',
    'fa-coffee',
    'fa-cog',
    'fa-cogs',
    'fa-comment',
    'fa-comment-o',
    'fa-commenting',
    'fa-commenting-o',
    'fa-comments',
    'fa-comments-o',
    'fa-compass',
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
    'fa-download',
    'fa-drivers-license',
    'fa-drivers-license-o',
    'fa-edit',
    'fa-ellipsis-h',
    'fa-ellipsis-v',
    'fa-envelope',
    'fa-envelope-o',
    'fa-envelope-open',
    'fa-envelope-open-o',
    'fa-envelope-square',
    'fa-eraser',
    'fa-exchange',
    'fa-exclamation'
];

var gameDiv = document.getElementById('cards-wrapper');

var rowNum = parseInt(gameDiv.dataset.rownum);
var colNum = parseInt(gameDiv.dataset.colnum);

var numberOfImageWeNeed = (rowNum * colNum) / 2;
var imagesToUse = possibleIcons.slice(0, numberOfImageWeNeed);
var imagesToUseDoubled = imagesToUse.concat(imagesToUse);
shuffle(imagesToUseDoubled);
var shuffledImages = imagesToUseDoubled;
// debugger;

var iconsString = '';
var indexCounter = 0;
var backgroundImage = 'fa-building';
for (let i = 0; i < rowNum; i++) {
    for (let j = 0; j < colNum; j++) {
        var image = shuffledImages[indexCounter];
        iconsString += `<i data-image="${image}" class="fa ${backgroundImage} fa-5x" aria-hidden="true"></i>`;
        indexCounter++;
    }
    iconsString += '<br>';
}
gameDiv.innerHTML = iconsString;

var cards = document.getElementsByClassName('fa');
var oddClickedCard = null;
var successfullyFlippedCards = 0;
for (let i = 0; i < cards.length; i++) {
    
    var card = cards[i];
    card.addEventListener('click',  function(event){
        var clickedCard = event.target;
        var imageOfClickedCard = clickedCard.dataset['image'];
        
        if (oddClickedCard === null) {
            // odd click
            oddClickedCard = clickedCard;
            // flip odd card
            clickedCard.classList.remove(backgroundImage);
            clickedCard.classList.add(imageOfClickedCard);
        } else {
            // even click
            // flip even card
            clickedCard.classList.remove(backgroundImage);
            clickedCard.classList.add(imageOfClickedCard);
            var oddImage = oddClickedCard.dataset['image'];
            if (oddImage === imageOfClickedCard) {
                // same images
                // keep them flipped
                successfullyFlippedCards += 2;
                if (successfullyFlippedCards === rowNum * colNum) {
                    alert('You have won :)');
                }
                oddClickedCard = null;
            } else {
                // different images
                setTimeout(
                    function() {
                        // turn them back after 1 second
                        // turn them back after 1 second
                        clickedCard.classList.remove(imageOfClickedCard);
                        clickedCard.classList.add(backgroundImage);
                        oddClickedCard.classList.remove(oddImage);
                        oddClickedCard.classList.add(backgroundImage);
                        oddClickedCard = null;
                    },
                    1000
                );
            }
        }
    });
}