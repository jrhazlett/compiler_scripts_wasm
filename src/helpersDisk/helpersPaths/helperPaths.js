//
// Libraries - downloaded
//
import fs from "fs";
import os from "os"
import * as path from "path";
//
// Public
//
export default class helperPaths {
    //
    // Public - get
    //
    /**
     * @param {string} argStringPathDir
     * @returns []
     * */
    static getArrayOfStringPathsInDir = ( argStringPathDir ) => {
        if ( !fs.lstatSync( argStringPathDir ).isDirectory() ) { return argStringPathDir }
        const arrayOfStringNames = fs.readdirSync( argStringPathDir )
        const arrayToReturn = new Array( arrayOfStringNames.length )
        for ( let itemIndex = 0, intLength = arrayToReturn.length; itemIndex < intLength; itemIndex++ ) {
            arrayToReturn[ itemIndex ] = path.join( argStringPathDir, arrayOfStringNames[ itemIndex ] )
        }
        return arrayToReturn
    }

    /**
     * @param {string} argStringPathDir
     * @returns []
     * */
    static getArrayOfStringPathsInDirAndSubDirs = ( argStringPathDir ) => {
        //
        // Just return the argument if its not a directory
        //
        if ( !fs.lstatSync( argStringPathDir ).isDirectory() ) { return argStringPathDir }
        //
        // Setup initial stack
        //
        const arrayOfStringNames = fs.readdirSync( argStringPathDir )
        const arrayStackToProcess = new Array( arrayOfStringNames.length )
        for ( let itemIndex = 0, intLength = arrayOfStringNames.length; itemIndex < intLength; itemIndex++ ) {
            arrayStackToProcess[ itemIndex ] = path.join( argStringPathDir, arrayOfStringNames[ itemIndex ], )
        }
        //
        // Travel through the tree
        //
        const arrayToReturn = []
        while ( arrayStackToProcess.length > 0 ) {
            const itemStringPath = arrayStackToProcess.pop()
            //
            // Add path to the return array
            //
            arrayToReturn.push( itemStringPath )
            //
            // If itemStringPath is a dir, then investigate its children
            //
            if ( fs.lstatSync( itemStringPath ).isDirectory() ) {
                //
                // Get list of names in dir
                //
                const itemArrayOfStringNames = fs.readdirSync( itemStringPath )
                //
                // Add compounded paths to the stack
                //
                for ( let itemIndex = 0, intLength = itemArrayOfStringNames.length; itemIndex < intLength; itemIndex++ ) {
                    arrayStackToProcess.push( path.join( itemStringPath, itemArrayOfStringNames[ itemIndex ], ) )
                }
            }
        }
        return arrayToReturn
    }

    /**
     * @param {string} argStringPath
     * @returns string
     * */
    static getStringNameWithExt = ( argStringPath ) => { return path.basename( argStringPath ) }

    /**
     * @param {string} argStringPath
     * @param {string} argStringExtNew
     * @returns string
     * */
    static getStringNameWithExtReplaced = ( argStringPath, argStringExtNew ) => {
        //
        // Get the file name
        //
        const stringNameWithExt = path.basename( argStringPath )
        if ( !stringNameWithExt.includes( "." ) ) { return stringNameWithExt }
        //
        // Get the file name without the extension
        //
        const stringNameWithoutExt = stringNameWithExt.substring( 0, stringNameWithExt.indexOf( "." ), )
        //
        // Make sure the extension argument doesn't already have a leading period
        //
        let stringExtToAdd = argStringExtNew
        if ( stringExtToAdd.startsWith( "." ) ) { stringExtToAdd = stringExtToAdd.substring( 1 ) }
        //
        // Return the name plus the new extension
        //
        return stringNameWithoutExt + "." + stringExtToAdd
    }

    /**
     * @param {string} argStringPath
     * @returns string
     * */
    static getStringNameWithoutExt = ( argStringPath ) => {
        const stringNameWithExt = path.basename( argStringPath )
        if ( !stringNameWithExt.includes( "." ) ) { return stringNameWithExt }
        return stringNameWithExt.substring( 0, stringNameWithExt.indexOf( "." ), )
    }

    /**
     * @returns string
     * */
    static getStringPathCwd = () => { return path.resolve( "" ) }
    //
    // Public - raise
    //
    /**
     * @param {string} argStringPath
     * */
    static raiseErrorIfPathDoesNotExist = ( argStringPath ) => {
        if ( !fs.existsSync( argStringPath ) ) {
            console.log( "Error: argStringPath does not exist.\n" )
            console.log( `argStringPath = ${argStringPath}\n` )
            console.log( `fs.existsSync( argStringPath ) = ${fs.existsSync( argStringPath )}\n` )
            process.exit( 1 )
        }
    }

    /**
     * @param {string} argStringPath
     * */
    static raiseErrorIfPathIsNotInHome = ( argStringPath ) => {
        if ( !argStringPath.startsWith( os.homedir() ) ) {
            console.log( "Error: argStringPath is not in home directory.\n" )
            console.log( `argStringPath = ${argStringPath}\n` )
            console.log( `os.homedir() = ${os.homedir()}\n` )
            console.log( `argStringPath.startsWith( os.homedir() ) = ${argStringPath.startsWith( os.homedir() )}\n` )
            process.exit( 1 )
        }
    }
    //
    // Public - temporarily
    //
    /**
     * @param {string} argStringPath
     * @param {Function} argCallback
     *
     * This moves cwd over to the target path, runs the callback, and then returns to the
     * original cwd
     * */
    static temporarilySetCwd = ( argStringPath, argCallback ) => {

        console.log( `(temporarilySetCwd) Temporarily setting cwd: ${argStringPath}\n` )
        //
        // Get cwd to return to
        //
        const stringPathCwdOrig = path.resolve( "" )
        //
        // Move to new dir
        //
        process.chdir( argStringPath )
        //
        // Run callback within dir
        //
        argCallback()
        //
        // Reset cwd back to the original
        //
        process.chdir( stringPathCwdOrig )
        console.log( `(temporarilySetCwd) Returning to original cwd: ${stringPathCwdOrig}\n` )
    }
}



















































