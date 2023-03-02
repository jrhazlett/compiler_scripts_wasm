//
// Public
//
export default class helperShellHost {
    //
    // Public - get
    //
    /**
     * @returns {string[]}
     * */
    static getArrayOfArgumentsOnlyCustom = () => {
        const arrayToReturn = []
        const arrayOfArgs = process.argv
        const intLength = arrayOfArgs.length
        let itemIndex = 1
        while ( ++itemIndex < intLength ) { arrayToReturn.push( arrayOfArgs[ itemIndex ] ) }
        return arrayToReturn
    }
}


















































