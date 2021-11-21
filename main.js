const poker = require('./compareHands')

const player1 = '4H 4C JC TC 3H'
const player2 = '2H 2D AH KC 3D'

const result = poker.comparePlayerHands(player1, player2)
console.log('Result:', result)
