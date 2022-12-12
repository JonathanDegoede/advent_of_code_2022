import { input as inputDay3 } from './input.js';

const day3Problems = () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const calculatePriority = (letter) => {
        const lowerCaseVersion = letter.toLowerCase();
        const priority = alphabet.indexOf(lowerCaseVersion) + 1;
        return letter != lowerCaseVersion ? priority + 26 : priority;
    }

    function* chunks(arr, n) {
        for (let i = 0; i < arr.length; i += n) {
            yield arr.slice(i, i + n);
        }
    }

    const result1 = inputDay3.split('\n').map(rugsack => {
        const length = rugsack.length
        const firstSack = rugsack.slice(0, length/2)
        const secondSack = rugsack.slice(length/2, length)
        const commonLetter = [...firstSack].filter(letter => secondSack.includes(letter))[0]
        return calculatePriority(commonLetter)
    }).reduce((acc, curr) => acc + curr, 0)

    const result2 = [...chunks(inputDay3.split('\n'), 3)].map(groupOf3 => {
        const firstSack = groupOf3[0]
        const secondSack = groupOf3[1]
        const thirdSack = groupOf3[2]
        const commonLetter = [...firstSack].filter(letter => secondSack.includes(letter) && thirdSack.includes(letter))[0]
        return calculatePriority(commonLetter);
    }).reduce((acc, curr) => acc + curr, 0)
    console.log(result1)
    console.log(result2)
}
day3Problems()