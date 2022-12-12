import { input as inputDay4 } from './input.js'

const day4Problems = () => {

    Array.prototype.toSections = function() {
        return this.map(input => Section(input))
    }

    const Section = (input) => {
        const [lower, upper] = input.split('-').map(Number)
        return {
            lower,
            upper
        }
    }

    const isFullOverlap = (section1, section2) => {
        const { lower: lower1, upper: upper1 } = section1
        const { lower: lower2, upper: upper2 } = section2

        return lower1 >= lower2 && upper1 <= upper2 || lower2 >= lower1 && upper2 <= upper1
    }

    const isPartialOverlap = (section1, section2) => {
        const { lower: lower1, upper: upper1 } = section1
        const { lower: lower2, upper: upper2 } = section2

        return lower1 <= lower2 && upper1 >= lower2 || lower2 <= lower1 && upper2 >= lower1
    }

    let amountOfFullOverlaps = 0;
    let amountofPartialOverlaps = 0;

    const pairings = inputDay4.split('\n').map(inputLine => {
        const pairings = inputLine.split(',')
        return pairings.toSections()
    })

    pairings.forEach(pairing => { 
        if(isFullOverlap(pairing[0], pairing[1])) {
            amountOfFullOverlaps++
        }

        if(isPartialOverlap(pairing[0], pairing[1])) {
            amountofPartialOverlaps++
        }
    });
    console.log(amountOfFullOverlaps)
    console.log(amountofPartialOverlaps)
}
day4Problems()