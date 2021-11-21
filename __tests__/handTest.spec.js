const poker = require('../compareHands.js')

describe('comparing hands', () => {
  test('player1 wins', () => {
    const player1 = '2H 2D AH KC 3D'
    const player2 = '4H 4C JC TC 3H'
    expect(poker.comparePlayerHands(player1, player2)).toBe('Player1 WINS')
  })

  test('player1 loses', () => {
    const player1 = '4H 4C JC TC 3H'
    const player2 = '2H 2D AH KC 3D'
    expect(poker.comparePlayerHands(player1, player2)).toBe('Player1 LOST')
  })

  test('players draw', () => {
    const player1 = '2S 3H 4H 5S 6C'
    const player2 = '3D 4C 5H 6H 2S'
    expect(poker.comparePlayerHands(player1, player2)).toBe('DRAW')
  })

  test('player1 wins royal flush', () => {
    const player1 = 'AH 2H 3H 4H 5H'
    const player2 = 'AS AD AC AH JD'
    expect(poker.comparePlayerHands(player1, player2)).toBe('Player1 WINS')
  })
})
