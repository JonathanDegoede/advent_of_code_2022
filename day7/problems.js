import { input as inputDay7 } from './input.js'

const day7Problems = () => {

    function Instruction({func, args}){
        this.func = func
        this.args = args
        this.getFunc = () => this.func
        this.getArgs = () => this.args
    }

    function File({title, size}) {
        this.parentDirectory = null
        this.title = title
        this.size = Number(size)
        this.getSize = () => { 
            return this.size
        }
        this.getTitle = () => this.title
        this.getParent = () => this.parentDirectory
    }

    function Directory({title}) {
        this.title = title
        this.parentDirectory = null
        this.files = []
        this.size = undefined
        this.addItem = (item) => {
            item.parentDirectory = this
            this.files.push(item)
        }
        this.getFiles = () => this.files
        this.getDirectories = () => this.files.filter(item => item instanceof Directory)
        this.getTitle = () => this.title
        this.getParent = () => this.parentDirectory
        this.getSize = () => {
            const calculateSize = () => {
                const size = this.files.reduce((prev, curr) => prev + curr.getSize(), 0)
                this.size = size
                return size
            }

            if(this.size === undefined){
                calculateSize()
            }

            return this.size
        }
        this.infos = () => {
            return {folder: this.getTitle(), size: this.getSize()}
        }
    }

    function FileSystem({root}) {
        this.root = root
        this.addItem = (item) => {
            item.parentDirectory = this.root
            this.root.addItem(item)
        }
        this.getSize = () => this.root.getSize()
        this.getRoot = () => this.root
        
        this.listAllDirectories = () => {
            const flatList = []
            const flatten = (directory) => {
                flatList.push(directory.infos())
                directory.getDirectories().forEach(dir => {
                    flatten(dir)
                })
                return flatList
            }
            return flatten(this.root)
        }
    }

    function Explorer() {
        this.fileSystem = new FileSystem({root: new Directory({title: 'root'})})
        this.currentDir = this.fileSystem.getRoot()
        this.moveBack = () => {
            this.currentDir = this.currentDir.getParent()
        }
        this.open = (item) => {
            const matchingDirectory = this.currentDir.getFiles().filter(element => element instanceof Directory && element.getTitle() === item)[0]
            this.currentDir = matchingDirectory
        }
        this.addItem = (item) => {
            this.currentDir.addItem(item)
        }
        this.getFileTree = () => this.fileSystem
        this.runInstruction = (instruction) => {
            if(instruction.getFunc() != 'cd'){
                alert('instruction not supported')
                return
            }
            const args = instruction.getArgs()
            args === '..' ? this.moveBack() : this.open(args)
        }
    }

    const parseInput = ({input}) => {
        const uselessLines = ['$ cd /', '$ ls']
        const parsedInput = input.split('\n')
                            .filter(line => !uselessLines.includes(line))
                            .map(line => {
                                const lineParts = line.split(' ')
                                const firstPart = lineParts[0]
                                const secondPart = lineParts[1]
                                const thirdPart = lineParts[2]
                                if( firstPart === '$'){
                                    return new Instruction({func: secondPart, args: thirdPart})
                                }

                                if(firstPart === 'dir'){
                                    return new Directory({title: secondPart})
                                }
                                
                                return new File({size: firstPart, title: secondPart})
                            })
        return parsedInput
    }

    const buildFileTree = ({input, explorer}) => {
        const parsedInput = parseInput({input})
        parsedInput.forEach(element => {
            switch(true){
                case (element instanceof File) || (element instanceof Directory):
                    explorer.addItem(element)
                    break
                case element instanceof Instruction:
                    explorer.runInstruction(element)
                    break
                default:
                    break
            }
        })

        return explorer.getFileTree()
    }

    const calculateTotalSize = ({directories, sizeLimit}) => {
        return directories.reduce((prev, curr) => {
            const size = curr.size
            return size > sizeLimit ? prev : prev + size
        }, 0)
    }
    
    const findCandidatesForDeletion = ({directories, systemSize, neededSpace}) => {
        const currentRemainingSize = systemSize - directories[0].size
        const candidates = directories.filter(dir => {
            const sizeAfterDeletion = currentRemainingSize + dir.size
            return sizeAfterDeletion >= neededSpace
        }).sort((a, b) => a.size - b.size)
        return candidates
    }

    const explorer = new Explorer()
    const fileTree = buildFileTree({input: inputDay7, explorer})
    const flatDirectoriesList = fileTree.listAllDirectories()
    console.log(calculateTotalSize({directories: flatDirectoriesList, sizeLimit: 100000}))
    console.log(findCandidatesForDeletion({directories: flatDirectoriesList, systemSize: 70000000, neededSpace: 30000000})[0])
}
day7Problems()