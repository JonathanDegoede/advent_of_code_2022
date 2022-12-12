import { input as inputDay6 } from './input.js';

const day6Problems = () => {

    const containsDuplicates = (arr) => {
        return arr.some((element, index) => arr.indexOf(element) !== index)
    }

    const findFirstMarker = (input, markerLength) => {
        let markerPosition = markerLength;

        const findNonRepeatingChars = (input, range, callback) => {
            const firstNChars = input.slice(0, range)
            if(containsDuplicates(firstNChars)){
                callback()
                findNonRepeatingChars(input.slice(1, input.length), range, callback)
            }
        }

        findNonRepeatingChars(input, markerLength, () => markerPosition++)

        return markerPosition
    }

    const result1 = findFirstMarker([...inputDay6], 4)
    const result2 = findFirstMarker([...inputDay6], 14)
    console.log(result1)
    console.log(result2)
}
day6Problems()
