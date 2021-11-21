const order = '23456789TJQKA'

const faceStat = (c, a) => {
  c[a] = (c[a] || 0) + 1
  return c
}

const compareEqualHands = (a, b) => {
  // bigger number is a better one.
  const countDiff = faceStat[b] - faceStat[a]
  if (countDiff) return countDiff
  return b > a ? -1 : b === a ? 0 : 1
}

const getPlayerHand = (hand) => {
  const cards = hand.split(' ')
  const faces = cards
    .map((arrElement) =>
      String.fromCharCode([77 - order.indexOf(arrElement[0])])
    )
    .sort()
  const suits = cards.map((arrElement) => arrElement[1]).sort()
  const flush = suits[0] === suits[4]
  const firstCard = faces[0].charCodeAt(0)
  const lowStraight = faces.join('') === 'AJKLM'
  faces[0] = lowStraight ? 'N' : faces[0]
  const straight =
    lowStraight ||
    faces.every((f, index) => f.charCodeAt(0) - firstCard === index)
  const faceCounts = faces.reduce(faceStat, {})
  const duplicates = Object.values(faceCounts).reduce(faceStat, {})
  let rank =
    (flush && straight && 1) ||
    (duplicates[4] && 2) ||
    (duplicates[3] && duplicates[2] && 3) ||
    (flush && 4) ||
    (straight && 5) ||
    (duplicates[3] && 6) ||
    (duplicates[2] > 1 && 7) ||
    (duplicates[2] && 8) ||
    9

  return { rank, value: faces.sort(compareEqualHands).join('') }
}

//This method receives players hands and compare them to determine the results.
exports.comparePlayerHands = (player1, player2) => {
  let hand1 = getPlayerHand(player1)
  let hand2 = getPlayerHand(player2)
  if (hand1.rank === hand2.rank) {
    if (hand1.value < hand2.value) {
      return 'Player1 WINS'
    } else if (hand1.value > hand2.value) {
      return 'Player1 LOST'
    } else {
      return 'DRAW'
    }
  }
  return hand1.rank < hand2.rank ? 'Player1 WINS' : 'Player1 LOST'
}
