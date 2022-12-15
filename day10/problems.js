import { input as inputDay10 } from './input.js'

const day10Problems = () => {

  function Noop(){
    this.cycleTime = 1
    this.getCycleTime = () => this.cycleTime
    this.getValue = () => 0
  }

  function AddX({value}){
    this.cycleTime = 2
    this.value = value
    this.getCycleTime = () => this.cycleTime
    this.getValue = () => this.value
  }

  function CPU({instructions}){
    this.instructions = instructions
    this.cycleHistory = {}
    this.xRegister = 1
    this.currentCycle = 0
    this.execute = () => {
      instructions.forEach(instruction => {
        const cycleTime = instruction.getCycleTime()
        const value = instruction.getValue()
        for(let i=1; i<=cycleTime; i++){
          this.currentCycle+=1;
          this.cycleHistory[this.currentCycle] = this.xRegister
        }
        this.xRegister += value
      });
    }
    this.getCycleHistory = () => this.cycleHistory
  }

  const sumOfSignalStrengths = ({lookUpCycles, cycleHistory}) => {
    let sum = 0
    lookUpCycles.forEach(cycle => {
      sum+= cycleHistory[cycle] * cycle
    })
    return sum
  }

  const cyclesToAnalyze = ({base, every, cycleHistory}) => {
    const cycles = [base]
    const cycleEntries = Object.entries(cycleHistory)
    const length = cycleEntries.length

    while(cycles[cycles.length - 1] + every < length){
      cycles.push(cycles[cycles.length - 1] + every)
    }

    return cycles
  }

  const parseInput = (input) => {
    return input.split("\n").map(line => {
      if(line == 'noop'){
        return new Noop()
      }
      return new AddX({value: Number(line.split(" ")[1])})
    })
  }

  const instructions = parseInput(inputDay10)
  const cpu = new CPU({instructions})
  cpu.execute()
  const cycles = cyclesToAnalyze({base: 20, every: 40, cycleHistory: cpu.getCycleHistory()})
  const result = sumOfSignalStrengths({lookUpCycles: cycles, cycleHistory: cpu.getCycleHistory()})
  console.log(result)
}
day10Problems()