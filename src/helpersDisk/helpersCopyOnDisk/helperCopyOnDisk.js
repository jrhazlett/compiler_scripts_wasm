//
// Libraries - downloaded
//
import fs from "fs"
import * as path from "path"
import os from "os";
//
// Public
//
export default class helperCopyOnDisk {
    //
    // Public - copy
    //
    /**
     * @param {string} argStringPathOrig
     * @param {string} argStringPathDest
     *
     * Reminder: This will overwrite the destination
     * */
    static copyFile = ( argStringPathOrig, argStringPathDest ) => {

        helperCopyOnDisk.raiseErrorIfPathDoesNotExist( argStringPathOrig )
        helperCopyOnDisk.raiseErrorIfPathDoesNotExist( path.dirname( argStringPathDest ) )
        helperCopyOnDisk.raiseErrorIfPathIsNotInHome( argStringPathDest )
        //
        // Copy file straight to destination
        //
        try { fs.copyFileSync( argStringPathOrig, argStringPathDest, )
        } catch ( err ) {
            console.log( "An error occurred while copying file.\n" )
            console.log( `argStringPathOrig = ${argStringPathOrig}\n` )
            console.log( `argStringPathDest = ${argStringPathDest}\n` )
            console.log( `err =` )
            console.log( err )
            process.exit( 1 )
        }
    }

    /**
     * @param {string} argStringPathAbsoluteOrig
     * @param {string} argStringPathDirAbsoluteDest
     * */
    static copyPathIntoDir = ( argStringPathAbsoluteOrig, argStringPathDirAbsoluteDest ) => {

        helperCopyOnDisk.raiseErrorIfPathDoesNotExist( argStringPathAbsoluteOrig )
        helperCopyOnDisk.raiseErrorIfPathIsNotInHome( argStringPathDirAbsoluteDest )
        //
        // Just copy the file if the origin path isn't a dir
        //
        if ( fs.lstatSync( argStringPathAbsoluteOrig ).isFile() ) {
            fs.copyFileSync(
                argStringPathAbsoluteOrig,
                //
                // stringPathDest
                //
                path.join( argStringPathDirAbsoluteDest, path.basename( argStringPathAbsoluteOrig ), ),
            )
            return
        }
        //
        // If we get this far, then argStringPathOrig is a dir
        //
        const stringPathDirAbsoluteDest = path.join( argStringPathDirAbsoluteDest, path.basename( argStringPathAbsoluteOrig ), )
        if ( !fs.existsSync( stringPathDirAbsoluteDest ) ) { fs.mkdirSync( stringPathDirAbsoluteDest ) }
        //
        // Setup initial stack
        //
        const arrayOfStringNames = fs.readdirSync( argStringPathAbsoluteOrig )
        const arrayStackToProcess = new Array( arrayOfStringNames.length )
        let itemIndex = -1
        const intLength = arrayOfStringNames.length
        while ( ++itemIndex < intLength ) {
            arrayStackToProcess[ itemIndex ] = path.join( argStringPathAbsoluteOrig, arrayOfStringNames[ itemIndex ], )
        }
        //
        // Travel through the tree
        //
        while ( arrayStackToProcess.length > 0 ) {

            const itemStringPathAbsoluteOrig = arrayStackToProcess.pop()
            const itemStringPathAbsoluteDest = path.join( stringPathDirAbsoluteDest, itemStringPathAbsoluteOrig.substring( argStringPathAbsoluteOrig.length ), )
            //
            // If the target being copied is a file, then copy it
            //
            if ( fs.lstatSync( itemStringPathAbsoluteOrig ).isFile() ) {

                try { fs.copyFileSync( itemStringPathAbsoluteOrig, itemStringPathAbsoluteDest, )
                } catch ( err ) {
                    console.log( "An error occurred while copying file.\n" )
                    console.log( `itemStringPathAbsoluteOrig = ${itemStringPathAbsoluteOrig}\n` )
                    console.log( `itemStringPathAbsoluteDest = ${itemStringPathAbsoluteDest}\n` )
                    console.log( `err =` )
                    console.log( err )
                    process.exit( 1 )
                }
            //
            // If the target being copied is a dir, then create it at the destination
            //
            } else {
                if ( !fs.existsSync( itemStringPathAbsoluteDest ) ) {
                    //
                    // Make the dir at the target
                    //
                    fs.mkdirSync( itemStringPathAbsoluteDest, { recursive: true }, )
                    //
                    // Prep next iteration
                    //
                    const arrayOfStringNamesInDirOrig = fs.readdirSync( itemStringPathAbsoluteOrig )
                    let itemIndex = -1
                    const intLength = arrayOfStringNamesInDirOrig.length
                    while ( ++itemIndex < intLength ) {
                        //
                        // Create the next absolute path and add it to the stack to process
                        //
                        arrayStackToProcess.push( path.join( itemStringPathAbsoluteOrig, arrayOfStringNamesInDirOrig[ itemIndex ], ) )
                    }
                }
            }
        }
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






























































