import { input as inputDay2 } from './input.js';

const day2Problem1 = () => {

    /* cas :
    Roche - roche (A - X) = 1 + 3 = 4
    Roche - papier (A - Y ) = 2 + 6 = 8
    Roche - ciseaux (A - Z) = 3 + 0 = 3
    Papier - roche (B - X) = 1 + 0 = 1
    Papier - papier (B - Y) = 2 + 3 = 5
    Papier - ciseaux (B - Z ) = 3 + 6 = 9
    Ciseaux - roche (C - X) = 1 + 6 = 7
    Ciseaux - papier (C - Y) = 2 + 0 = 2
    Ciseaux - ciseaux (C - Z) = 3 + 3 = 6
    */


    const cheatsheet = {
        'B X' : 1,
        'C Y' : 2,
        'A Z' : 3,
        'A X' : 4,
        'B Y' : 5,
        'C Z' : 6,
        'C X' : 7,
        'A Y' : 8,
        'B Z' : 9,
    }

    const rounds = inputDay2.split('\n')
    const scores = rounds.map(hands => cheatsheet[hands])
    const finalScore = scores.reduce((a,b) => a + b, 0)
    console.log(finalScore)
}
day2Problem1()
