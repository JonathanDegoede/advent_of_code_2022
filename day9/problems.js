import { input as inputDay9 } from './input.js'

const day9Problems = () => {

    function RopeNode(){
        this.pos = { row: 0, col: 0 }
        this.visits = {}
        this.moves = []
        this.move = ({movement, preventLog}) => {
            switch(movement){
                case 'U':
                    this.pos.row--
                    break
                case 'D':
                    this.pos.row++
                    break
                case 'R':
                    this.pos.col++
                    break
                case 'L':
                    this.pos.col--
                    break
                default:
                    break
            }
            if(preventLog){
                return
            }
            this.moves.push(movement)
        }
        this.markVisit = () => {
            const row = this.pos.row
            const col = this.pos.col
            this.visits[`${row};${col}`] = '#'
        }
        this.getVisits = () => this.visits
        this.getAmountOfUniqueVisits = () => Object.entries(this.visits).length
        this.markVisit({position: this.pos}) // mark start position
        this.getMoves = () => this.moves
        this.setMoves = ({moves}) => { this.moves = moves }
    }

    function RopeStateMachine({head, tail}){
        // DOCUMENATION:
        // Before any movement from the rope head, the tail can be in one of 9 positions relative to the head.
        // Each dot represents a possible state position. Note that the H covers a dot.
        // The starting state is middle (4)
        //     ...
        //     .H.
        //     ...
        // top-left : 0 
        // top-middle : 1
        // top-right : 2
        // left: 3
        // middle: 4
        // right: 5
        // bot-left: 6
        // bot-middle: 7
        // bot-right: 8
        //
        // Each time the head moves, the tail follows, its state changes to a new state depending on the move made by the head and the previous state
        // this.states = [
        //     'top-left',
        //     'top-middle',
        //     'top-right',
        //     'left',
        //     'middle',
        //     'right',
        //     'bot-left',
        //     'bot-middle',
        //     'bot-right'
        // ]
        this.currentState = 4
        this.head = head
        this.tail = tail
        this.moves = this.head.getMoves();
        this.executeMoves = () => {
            this.moves.forEach(move => this.updateState({direction: move}))
        }
        this.getTail = () => this.tail
        this.getHead = () => this.head

        this.updateState = ({direction}) => {

            this.head.move({movement: direction, preventLog: true})

            switch(this.currentState){
                case 0:     
                    //     T..
                    //     .H.
                    //     ...
                    if(direction === 'U'){
                        this.currentState = 3
                    }
                    else if(direction == 'D'){
                        this.tail.move({movement: 'D'})
                        this.tail.move({movement: 'R'})
                        this.currentState = 1
                    }
                    else if(direction == 'R'){
                        this.tail.move({movement: 'D'})
                        this.tail.move({movement: 'R'})
                        this.currentState = 3
                    }
                    else if(direction == 'L'){
                        this.currentState = 1
                    }
                    break
                case 1:
                    //     .T.
                    //     .H.
                    //     ...
                    if(direction === 'U'){
                        this.currentState = 4
                    }
                    else if(direction == 'D'){
                        this.tail.move({movement: 'D'})
                        this.currentState = 1
                    }
                    else if(direction == 'R'){
                        this.currentState = 0
                    }
                    else if(direction == 'L'){
                        this.currentState = 2
                    }
                    break
                case 2:
                    //     ..T
                    //     .H.
                    //     ...
                    if(direction === 'U'){
                        this.currentState = 5
                    }
                    else if(direction == 'D'){
                        this.tail.move({movement: 'D'})
                        this.tail.move({movement: 'L'})
                        this.currentState = 1
                    }
                    else if(direction == 'R'){
                        this.currentState = 1
                    }
                    else if(direction == 'L'){
                        this.tail.move({movement: 'D'})
                        this.tail.move({movement: 'L'})
                        this.currentState = 5
                    }
                    break
                case 3:
                    //     ...
                    //     TH.
                    //     ...
                    if(direction === 'U'){
                        this.currentState = 6
                    }
                    else if(direction == 'D'){
                        this.currentState = 0
                    }
                    else if(direction == 'R'){
                        this.tail.move({movement: 'R'})
                        this.currentState = 3
                    }
                    else if(direction == 'L'){
                        this.currentState = 4
                    }
                    break
                case 4:
                    //     ...
                    //     .H.
                    //     ...
                    if(direction === 'U'){
                        this.currentState = 7
                    }
                    else if(direction == 'D'){
                        this.currentState = 1
                    }
                    else if(direction == 'R'){
                        this.currentState = 3
                    }
                    else if(direction == 'L'){
                        this.currentState = 5
                    }
                    break
                case 5:
                    //     ...
                    //     .HT
                    //     ...
                    if(direction === 'U'){
                        this.currentState = 8
                    }
                    else if(direction == 'D'){
                        this.currentState = 2
                    }
                    else if(direction == 'R'){
                        this.currentState = 4
                    }
                    else if(direction == 'L'){
                        this.tail.move({movement: 'L'})
                        this.currentState = 5
                    }
                    break
                case 6:
                    //     ...
                    //     .H.
                    //     T..
                    if(direction === 'U'){
                        this.tail.move({movement: 'U'})
                        this.tail.move({movement: 'R'})
                        this.currentState = 7
                    }
                    else if(direction == 'D'){
                        this.currentState = 3
                    }
                    else if(direction == 'R'){
                        this.tail.move({movement: 'U'})
                        this.tail.move({movement: 'R'})
                        this.currentState = 3
                    }
                    else if(direction == 'L'){
                        this.currentState = 7
                    }
                    break
                case 7:
                    //     ...
                    //     .H.
                    //     .T.
                    if(direction === 'U'){
                        this.tail.move({movement: 'U'})
                        this.currentState = 7
                    }
                    else if(direction == 'D'){
                        this.currentState = 4
                    }
                    else if(direction == 'R'){
                        this.currentState = 6
                    }
                    else if(direction == 'L'){
                        this.currentState = 8
                    }
                    break
                case 8:
                    //     ...
                    //     .H.
                    //     ..T
                    if(direction === 'U'){
                        this.tail.move({movement: 'U'})
                        this.tail.move({movement: 'L'})
                        this.currentState = 7
                    }
                    else if(direction == 'D'){
                        this.currentState = 5
                    }
                    else if(direction == 'R'){
                        this.currentState = 7
                    }
                    else if(direction == 'L'){
                        this.tail.move({movement: 'U'})
                        this.tail.move({movement: 'L'})
                        this.currentState = 5
                    }
                    break
                default:
                    break;
            }
            this.tail.markVisit()
        }
    }

    const moveRope = ({rope, moves}) => {
        let index = 0
        let head;
        let tail;

        rope[0].setMoves({moves})
        console.log(moves)
        while(index < rope.length - 1){
            head = rope[index]
            tail = rope[index+1]
            const fsm = new RopeStateMachine({head, tail})
            fsm.executeMoves()
            index++
        }
        return tail.getAmountOfUniqueVisits()
    }

    const parseInput = (input) => {
        return input.split('\n').map(line => { 
            const [direction, amount] = line.split(' ')
            const moves = Array(Number(amount)).fill(direction);
            return moves
        }).flat()
    }
    const individualMoves = parseInput(inputDay9)
    const rope = [
        new RopeNode(),
        new RopeNode(),
    ]
    const tailVisits = moveRope({rope, moves: individualMoves})
    console.log(tailVisits)
}
day9Problems()