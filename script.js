let cards = []
let firstCard, secondcard
let score = 0
let lockboard = false
const cardsContainer = document.getElementById('cards-grid')
document.getElementById('score').textContent = score
// (res => respond)
fetch('./data/cards.json')
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data]
    shuffleCard()
    generateCards()
    console.log(cards)
  })

function generateCards() {
  for (let card of cards) {
    const cardElement = document.createElement('div')
    cardElement.classList.add('card')
    cardElement.setAttribute('data-name', card.name)
    cardElement.innerHTML = `
  <div class="front">
  <img class="front-image" src="${card.image}" />
 </div>
 <div class="back"></div>
`
    cardsContainer.appendChild(cardElement)
    cardElement.addEventListener('click', flipCard)
    cardElement.addEventListener('touchstart', flipCard)
  }
}

function shuffleCard() {
  let currentIndex = cards.length
  let randomIndex
  let temporaryValue
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = cards[currentIndex]
    cards[currentIndex] = cards[randomIndex]
    cards[randomIndex] = temporaryValue
  }
}

function flipCard() {
  if (lockboard === true) return
  if (this === firstCard) return
  this.classList.add('flipped')
  if (!firstCard) {
    firstCard = this
    return
  }

  secondcard = this
  lockboard = true
  checkForMatch()
}

function checkForMatch() {
  if (firstCard.dataset.name === secondcard.dataset.name) {
    disableCards()
  } else {
    unflipCards()
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard)
  firstCard.removeEventListener('touchstart', flipCard)
  secondcard.removeEventListener('click', flipCard)
  secondcard.removeEventListener('touchstart', flipCard)
  score++
  document.getElementById('score').textContent = score
  if (score === 9) {
    startConfetti()
  }
  unlockboard()
}

function unlockboard() {
  firstCard = null
  secondcard = null
  lockboard = false
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flipped')
    secondcard.classList.remove('flipped')
    unlockboard()
  }, 1000)
}

function restart() {
  window.location.reload()
}
