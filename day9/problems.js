import { input as inputDay9 } from './input.js'

const day9Problems = () => {

    function RopeNode(){
        this.pos = { row: 0, col: 0 }
        this.visits = {}
        this.moves = []
        this.setPos = ({position}) => {
            this.pos = position
            this.markVisit({position})
        },
        this.getPos = () => this.pos
        this.markVisit = ({position}) => {
            const row = position.row
            const col = position.col
            this.visits[`${row};${col}`] = '#'
        }
        this.getVisits = () => this.visits
        this.getAmountOfUniqueVisits = () => Object.entries(this.visits).length
        this.markVisit({position: this.pos}) // mark start position
    }

    const calculateNewPos = ({tooFarFrom, headPos}) => {
        switch(tooFarFrom){
            case 'right':
                return { ...headPos, col: headPos.col - 1}
            case 'left':
                return { ...headPos, col: headPos.col + 1}
            case 'up':
                return { ...headPos, row: headPos.row + 1}
            case 'down':
                return { ...headPos, row: headPos.row - 1}
        }
    }

    const tooFarFrom = ({headPos, tailPos}) => {

        //     T...
        //     ..H. 
        //     ....  return too far right

        if(headPos.col - tailPos.col > 1){
            return 'right'
        }

        //     H...
        //     ..T.  return too far left
        //     ....

        if(headPos.col - tailPos.col < -1){
            return 'left'
        }

        //     T...
        //     ....  return too far down
        //     .H..

        if(headPos.row - tailPos.row > 1){
            return 'down'
        }

        //     ..H.
        //     ....  return too far up
        //     .T..

        if(headPos.row - tailPos.row < -1){
            return 'up'
        }

        return null
    }

    const followHead = ({relativeHeadPositions, node}) => {
        const tailPositions = []
        relativeHeadPositions.forEach(headPos => {
            const currentTailPos = node.getPos()
            const farFrom = tooFarFrom({headPos, tailPos: currentTailPos})
            const newTailPosition = calculateNewPos({tooFarFrom: farFrom, headPos}) || currentTailPos
            node.setPos({position: newTailPosition})
            tailPositions.push(newTailPosition)
        })

        return tailPositions
    }

    const movesToPositions = ({moves}) => {
        const pos = { row: 0, col: 0 }
        const positions = [{...pos}]
        moves.forEach(move => {
            if(move === 'R'){pos.col++}
            if(move === 'L'){pos.col--}
            if(move === 'U'){pos.row--}
            if(move === 'D'){pos.row++}
            positions.push({...pos})
        });
        return positions
    }

    const moveRope = ({rope, input}) => {
        let headPositions = input
        rope.forEach(node => {
            const tailPositions = followHead({relativeHeadPositions: headPositions, node})
            headPositions = tailPositions.filter((item, pos) => tailPositions.indexOf(item) == pos)
        })
    }

    const parseInput = (input) => {
        return input.split('\n').map(line => { 
            const [direction, amount] = line.split(' ')
            const moves = Array(Number(amount)).fill(direction);
            return moves
        }).flat()
    }
    const headMoves = parseInput(inputDay9)
    const headPositions = movesToPositions({moves: headMoves})
    const rope = [
        new RopeNode(),
        new RopeNode(),
        new RopeNode(),
        new RopeNode(),
        new RopeNode(),
        new RopeNode(),
        new RopeNode(),
        new RopeNode(),
        new RopeNode(),
    ]
    moveRope({rope, input: headPositions})
    console.log(rope[8].getVisits())
}
day9Problems()