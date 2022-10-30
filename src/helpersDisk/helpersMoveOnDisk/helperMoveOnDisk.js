//
// Libraries - downloaded
//
import fs from "fs"
import * as path from "path";
import os from "os";
//
// Public
//
export default class helperMoveOnDisk {
    //
    // Public - move
    //
    /**
     * @param {string} argStringPathOrig
     * @param {string} argStringPathDirDest
     * */
    static movePathIntoPathDir = ( argStringPathOrig, argStringPathDirDest ) => {

        helperMoveOnDisk.raiseErrorIfPathIsNotInHome( argStringPathOrig )
        helperMoveOnDisk.raiseErrorIfPathIsNotInHome( argStringPathDirDest )

        const stringPathDest = path.join( argStringPathDirDest, path.basename( argStringPathOrig ), )
        fs.renameSync( argStringPathOrig, stringPathDest, )
    }
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
}



















































