//
// Libraries - downloaded
//
import fs from "fs"
//
// Public
//
export default class helperShellArgs {
    //
    // Public
    //
    /**
     * @param {HelperTasks} argHelperTasks
     * @returns {string[]}
     *
     * Get the two arguments passed to the shell
     * Example command:
     * node src/index.js rust <path to target dir>
     * */
    static getPairOfStringsPathToProjectAndNameOfLanguageFromShellArgs = ( argHelperTasks ) => {
        const arrayOfArgumentsOnlyCustom = helperShellArgs._getArrayOfArgumentsOnlyCustom()

        const stringPathDirTarget = arrayOfArgumentsOnlyCustom[ 0 ]
        helperShellArgs._raiseErrorIfStringPathDirTargetIsInvalid( stringPathDirTarget )
        //
        // Setup stringNameLanguage
        //
        let stringNameLanguage = arrayOfArgumentsOnlyCustom[ 1 ]
        if ( stringNameLanguage === undefined || stringNameLanguage.trim().length === 0 ) { stringNameLanguage = argHelperTasks.getStringNameLanguageOfProject( stringPathDirTarget )
        } else {
            stringNameLanguage = stringNameLanguage.toLowerCase()
            helperShellArgs._raiseErrorIfStringNameLanguageIsInvalid( stringNameLanguage, argHelperTasks, )
        }
        return [ stringPathDirTarget, stringNameLanguage, ]
    }
    //
    // Private
    //
    /**
     * @returns {string[]}
     * */
    static _getArrayOfArgumentsOnlyCustom = () => {
        const arrayToReturn = []
        const arrayOfArgs = process.argv
        const intLength = arrayOfArgs.length
        let itemIndex = 1
        while ( ++itemIndex < intLength ) { arrayToReturn.push( arrayOfArgs[ itemIndex ] ) }
        return arrayToReturn
    }

    /**
     * @param {string} argStringNameLanguage
     * @param {HelperTasks} argHelperTasks
     * */
    static _raiseErrorIfStringNameLanguageIsInvalid = ( argStringNameLanguage, argHelperTasks ) => {
        const arrayOfKeys = [...Object.keys( argHelperTasks.fieldObjectOfNamesOfFunctions )]
        if ( !arrayOfKeys.includes( argStringNameLanguage ) ) {
            throw new Error([
                "Invalid language name provided.",
                `argStringNameLanguage = ${argStringNameLanguage}`,
                "To run the app from the shell, use the following command:",
                "node src/index.js (path to target proj dir) (optional language name)",
                `List of valid language names: [ ${arrayOfKeys.reduce( ( itemStringPrev, itemString ) => `${itemStringPrev}, ${itemString}` )} ]\n`,
            ].join( "\n\n" ) )
        }
    }

    /**
     * @param {string} argStringPathDirTarget
     * */
    static _raiseErrorIfStringPathDirTargetIsInvalid = ( argStringPathDirTarget ) => {
        let boolRaiseErrorInvalidPath = false
        if ( argStringPathDirTarget === undefined ) { boolRaiseErrorInvalidPath = true
        } else if ( !fs.existsSync( argStringPathDirTarget ) ) { boolRaiseErrorInvalidPath = true }
        if ( boolRaiseErrorInvalidPath ) {
            throw new Error([
                "No path to project directory provided.",
                `argStringPathDirTarget = ${argStringPathDirTarget}`,
                "To run the app from the shell, use the following command:",
                "node src/index.js (path to target proj dir) (optional language name)",
            ].join( "\n\n" ) )
        }
    }
}

















































