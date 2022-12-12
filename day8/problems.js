import { input as inputDay8 } from './input.js'

const day8Problems = () => {
    const parseInput = (input) => {
        return input.split('\n').map(row => row.split(''))
    }

    const gridToList = (grid) => {
        const listOfTrees = []

        for(let i = 0; i < grid.length; i++ ){
            for(let j = 0; j < grid[0].length; j++ ){
                listOfTrees.push({row: i, col: j, pos: `${i};${j}`, val: grid[i][j]})
            }
        }

        return listOfTrees
    }

    const separateInnerAndEdges = ({trees}) => {
        const isEdgeIndex = ({tree, size}) => {
            const edgeIndexes = { first: 0, last: size-1 }
            const row = tree.row
            const col = tree.col
            const isFirstRow = row === edgeIndexes.first
            const isLastRow = row === edgeIndexes.last
            const isFirstColumn = col === edgeIndexes.first
            const isLastColumn = col === edgeIndexes.last
            return  isFirstRow ||  isFirstColumn ||  isLastColumn || isLastRow
        }
        const edgeTrees = trees.filter(tree => isEdgeIndex({tree, size: Math.sqrt(trees.length)}))
        const innerTrees = trees.filter(tree => !edgeTrees.map(tree => {
            return tree.pos
        }).includes(tree.pos))

        return { edgeTrees, innerTrees }
    }

    const addRelativeSizeInformation = ({analyzedTreePos, trees, orientation}) => {
        const sides = orientation === 'row' ? ['left', 'right'] : ['top', 'bottom']
        return trees.map(tree => {
            const treePos = orientation === 'row' ? tree.col : tree.row
            const relativeSide = analyzedTreePos > treePos ? sides[0] : sides[1]
            return {...tree, side: relativeSide}
        })
    }   

    const calculateScenicScore = ({tree, forest}) => {

        const {firstHigherToLeft, firstHigherToRight, firstHigherToTop, firstHigherToBottom} = getFirstHigherTreeInAllDirections({tree, forest})

        const endIndex = Math.sqrt(forest.length) - 1
        const leftScore = firstHigherToLeft === undefined ? tree.col : tree.col - firstHigherToLeft.col
        const rightScore = firstHigherToRight === undefined ? endIndex - tree.col : firstHigherToRight.col - tree.col
        const topScore = firstHigherToTop === undefined ? tree.row : tree.row - firstHigherToTop.row
        const bottomScore = firstHigherToBottom === undefined ? endIndex - tree.row : firstHigherToBottom.row - tree.row
        const totalScore = leftScore * rightScore * topScore * bottomScore

        return totalScore
    }
    
    Array.prototype.filterBySide = function (side) {
        return this.filter(el => el.side === side)
    }

    Array.prototype.maxByVal = function () {
        return this.sort((a,b) => b.val - a.val)[0]
    }

    Array.prototype.firstHigherOrEqualThan = function (tree, orientation) {
        const higherTrees = this.filter(el => el.val >= tree.val)
        const index = orientation === 'left' || orientation === 'top' ? higherTrees.length-1 : 0
        const closestHigher = higherTrees[index]
        return closestHigher
    }

    const getTreesInRowAndCol = ({analyzedTree, forest}) => {
        const row = analyzedTree.row
        const col = analyzedTree.col
        const treesInRow = addRelativeSizeInformation({analyzedTreePos: col, trees: forest.filter(t => t.row == row && t.pos != analyzedTree.pos), orientation: 'row'})
        const treesInCol = addRelativeSizeInformation({analyzedTreePos: row, trees: forest.filter(t => t.col == col && t.pos != analyzedTree.pos), orientation: 'col'})

        return { treesInRow, treesInCol }
    }

    const getHighestTreesInAllDirections = ({analyzedTree, forest}) => {
        const { treesInRow, treesInCol } = getTreesInRowAndCol({analyzedTree, forest})
        const MaxTreeToLeft = treesInRow.filterBySide('left').maxByVal()
        const MaxTreeToRight = treesInRow.filterBySide('right').maxByVal()
        const MaxTreeToTop = treesInCol.filterBySide('top').maxByVal()
        const MaxTreeToBottom = treesInCol.filterBySide('bottom').maxByVal()

        return { MaxTreeToLeft , MaxTreeToRight, MaxTreeToTop, MaxTreeToBottom }
    }

    const getFirstHigherTreeInAllDirections = ({tree, forest}) => {
        const { treesInRow, treesInCol } = getTreesInRowAndCol({analyzedTree: tree, forest})
        const firstHigherToLeft = treesInRow.filterBySide('left').firstHigherOrEqualThan(tree, 'left')
        const firstHigherToRight = treesInRow.filterBySide('right').firstHigherOrEqualThan(tree, 'right')
        const firstHigherToTop = treesInCol.filterBySide('top').firstHigherOrEqualThan(tree, 'top')
        const firstHigherToBottom = treesInCol.filterBySide('bottom').firstHigherOrEqualThan(tree, 'bottom')

        return { firstHigherToLeft, firstHigherToRight, firstHigherToTop, firstHigherToBottom }
    }

    const findVisibleTrees = ({forest, innerTrees, edgeTrees}) => {
        const isTreeVisible = ({tree, forest}) => {
            const analyzedTree = tree
            const { MaxTreeToLeft , MaxTreeToRight, MaxTreeToTop, MaxTreeToBottom } = getHighestTreesInAllDirections({analyzedTree, forest})
            const visibleFrom = [MaxTreeToLeft, MaxTreeToRight, MaxTreeToTop, MaxTreeToBottom].filter(tree => analyzedTree.val > tree.val)
            const visible = visibleFrom.length > 0
            return visible
        }
        const innerTreesVisible = innerTrees.filter(tree => isTreeVisible({tree, forest}))
        return [...edgeTrees, ...innerTreesVisible]
    }

    const findHighestScenicScore = ({innerTrees, forest}) => {
        const scores = innerTrees.map(tree => calculateScenicScore({tree, forest})).sort((a,b) => b - a)
        return scores[0]
    }
    
    const treesGrid = parseInput(inputDay8)
    const treesList = gridToList(treesGrid)
    const { edgeTrees, innerTrees } = separateInnerAndEdges({trees: treesList})
    console.log(findVisibleTrees({forest: treesList, innerTrees, edgeTrees}).length)
    console.log(findHighestScenicScore({innerTrees, forest: treesList}))
}
day8Problems()