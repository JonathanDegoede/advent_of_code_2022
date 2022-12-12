import { input as inputDay5 } from './input.js'

const day5Problems = () => {
    function* chunks(arr, n) {
        for (let i = 0; i < arr.length; i += n) {
            yield arr.slice(i, i + n);
        }
    }

    const buildStacks = (boxesInput) => {
        const floorBoxesList = 
            boxesInput
            .split('\n')
            .map(floor => [...chunks(floor, 4)]
            .map(el => el[1])).slice(0, -1)
            .reverse()

        const stacks = Array.from({length: floorBoxesList[0].length}, () => [])
        floorBoxesList.forEach(floor => {
            floor.forEach((box, idx) => {
                if(box != ' '){
                    stacks[idx].push(box)
                }
            })
        })

        return stacks
    }

    const buildDirectives = (directivesInput) => {
        return directivesInput
                .split('\n')
                .map(directive => directive.split(/move | from | to /)
                .filter(el => el != ''))
                .map(directive => { return { amount: Number(directive[0]), from: Number(directive[1])-1, to: Number(directive[2])-1 }})
    }

    const moveFromTo = (stacks, directive, muddy) => {
        const { amount, from, to } = directive
        const boxes = stacks[from].splice(-amount)
        const boxesOrdered = muddy ? boxes : boxes.reverse()
        stacks[to].push(...boxesOrdered)
    }

    const getTopBoxes = (stacks) => { 
        return stacks.map(stack => stack[stack.length-1])
    }

    const arrayToString = (array) => {
        return array.join('')
    }

    const applyDirectives = (stacks, directives, muddy) => {
        directives.forEach(directive => {
            moveFromTo(stacks, directive, muddy)
        })

        return stacks
    }

    const input = inputDay5.split('\n\n');
    const boxesInput = input[0]
    const directivesInput = input[1]

    const stacks = buildStacks(boxesInput)
    const stacksCopy = stacks.map(stack => [...stack])
    const directives = buildDirectives(directivesInput)
    const topBoxes = getTopBoxes(applyDirectives(stacks, directives))
    const topBoxesMuddy = getTopBoxes(applyDirectives(stacksCopy, directives, true))
    const answer = arrayToString(topBoxes)
    const answerMuddy = arrayToString(topBoxesMuddy)
    console.log(answer)
    console.log(answerMuddy)
}
day5Problems()