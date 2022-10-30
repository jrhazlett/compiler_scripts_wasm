//
// Libraries - downloaded
//
import fs from "fs";
import os from "os";
//
// Class
//
export default class helperFiles {
    //
    // Public - get
    //
    /**
     * @param {string} argStringPathFile
     * @returns Object
     * */
    static getObjectFromFile = ( argStringPathFile ) => { return JSON.parse( fs.readFileSync( argStringPathFile ) ) }
    //
    // Public - write
    //
    /**
     * @param {string} argStringPathFile
     * @param {Object} argObject
     * */
    static writeObjectToFile = ( argStringPathFile, argObject ) => {
        helperFiles.raiseErrorIfPathIsNotInHome( argStringPathFile )
        fs.writeFileSync( argStringPathFile, JSON.stringify( argObject, null, 4, ), )
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


















































