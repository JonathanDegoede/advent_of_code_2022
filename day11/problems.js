import { input as inputDay11 } from './input.js'

const day11Problems = () => {

  function Monkey({ startItems, testNumber, operation, test }) {
    this.items = startItems
    this.operation = operation
    this.test = test
    this.inspections = 0
    this.testNumber = testNumber
    this.productOfDivisors = undefined
    this.inspect = () => {
      const currentWorryLevel = this.items.shift()
      // const newWorryLevel = Math.floor(operation({ old: currentWorryLevel }) / 3)
      const newWorryLevel = operation({ old: currentWorryLevel % this.productOfDivisors })
      this.inspections++
      return { monkeyNumber: test({ worryLevel: newWorryLevel }), item: newWorryLevel }
    }
    this.addItem = ({ item }) => this.items.push(item)
    this.getAmountOfItems = () => this.items.length
    this.setProductOfDivisors = ({ productOfDivisors }) => this.productOfDivisors = productOfDivisors
  }

  const KeepAway = ({ monkeys, maxRounds, productOfDivisors }) => {
    let round = 0;
    while (round++ != maxRounds) {
      monkeys.forEach(monkey => {
        monkey.setProductOfDivisors({ productOfDivisors })
        while (monkey.getAmountOfItems() != 0) {
          const { monkeyNumber, item } = monkey.inspect()
          monkeys[monkeyNumber].addItem({ item })
        }
      });
    }
  }

  const calculateMonkeyBusiness = ({ monkeys }) => {
    return monkeys.sort((a, b) => b.inspections - a.inspections).slice(0, 2).reduce((prev, curr) => prev.inspections * curr.inspections)
  }

  const calculateProductOfDivisors = ({ monkeys }) => {
    return monkeys.map(monkey => monkey.testNumber).reduce((prev, curr) => prev * curr, 1)
  }

  const buildOperation = ({ operator, operand }) => {
    if (operator === '*') {
      return operand !== "old" ? ({ old }) => old * Number(operand) : ({ old }) => old * old
    }
    else return operand !== "old" ? ({ old }) => old + Number(operand) : ({ old }) => old + old
  }

  const input = inputDay11.split('\n\n').map(monkeyInput => monkeyInput.split('\n'))
  const monkeys = input.map(monkey => {
    const startItems = monkey[1].split(' ').slice(2).map(s => Number(s.replace(',', '')))
    const operationParts = monkey[2].split(' ').slice(-2)
    const operation = buildOperation({ operator: operationParts[0], operand: operationParts[1] })
    const testNumber = Number(monkey[3].split('by')[1])
    const resultTrue = Number(monkey[4].split('monkey')[1])
    const resultFalse = Number(monkey[5].split('monkey')[1])
    const test = ({ worryLevel }) => { return worryLevel % testNumber === 0 ? resultTrue : resultFalse }
    return new Monkey({ startItems, testNumber, operation, test })
  })

  KeepAway({ monkeys, maxRounds: 10000, productOfDivisors: calculateProductOfDivisors({ monkeys }) })
  const result = calculateMonkeyBusiness({ monkeys })
  console.log(result)
}
day11Problems()