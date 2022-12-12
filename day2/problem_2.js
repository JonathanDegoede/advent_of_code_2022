import { input as inputDay2 } from './input.js';

const day2Problem2 = () => {
    
    /* cas :
    Roche - lose (A - X) = Roche - ciseaux = 3 + 0 = 3
    Roche - draw (A - Y ) = Roche - Roche 1 + 3 = 4
    Roche - win (A - Z) = Roche - papier = 2 + 6 = 8
    Papier - lose (B - X) = Papier - roche = 1 + 0 = 1
    Papier - draw (B - Y) = Papier - papier = 2 + 3 = 5
    Papier - win (B - Z ) = Papier - ciseaux = 3 + 6 = 9
    Ciseaux - lose (C - X) = Ciseaux - papier = 2 + 0 = 2
    Ciseaux - draw (C - Y) = Ciseaux - ciseaux = 3 + 3 = 6
    Ciseaux - win (C - Z) = Ciseaux - roche = 1 + 6 = 7
    */
    
    
    const cheatsheet = {
        'B X' : 1,
        'C X' : 2,
        'A X' : 3,
        'A Y' : 4,
        'B Y' : 5,
        'C Y' : 6,
        'C Z' : 7,
        'A Z' : 8,
        'B Z' : 9,
    }
    
    const rounds = inputDay2.split('\n')
    const scores = rounds.map(hands => cheatsheet[hands])
    const finalScore = scores.reduce((a,b) => a + b, 0)
    console.log(finalScore)
}
day2Problem2()