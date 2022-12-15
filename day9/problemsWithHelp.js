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
        this.follow = ({headPos}) => {
            let row = this.pos.row
            let col = this.pos.col
            //This is from reddit https://github.com/hariharansubramanian/AdventOfCode-Day9-RopeBridge/blob/master/Models/Knot.cs

            //Should not move
            if (Math.abs(headPos.col - col) < 2 && Math.abs(headPos.row - row) < 2) return;

            if (headPos.col == col) //same col
            {
                if (headPos.row > row) row++; //down
                else row--; //up
            }
            else if (headPos.row == row) //same row
            {
                if (headPos.col > col) col++; //right
                else col--; //left
            }
            else //diagonal
            {
                if (headPos.col > col) col++; //right
                else col--; //left
    
                if (headPos.row > row) row++; //down
                else row--; //up
            }
            this.setPos({position: {row, col}})
        }
    }

    const followHead = ({relativeHeadPositions, node}) => {
        const tailPositions = []
        relativeHeadPositions.forEach(headPos => {
            node.follow({headPos})
            tailPositions.push(node.getPos())
        })
        return tailPositions.filter((item, pos) => tailPositions.indexOf(item) == pos)
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
            headPositions = followHead({relativeHeadPositions: headPositions, node})
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