//
// Libraries - downloaded
//
import os from "os"
import { rimraf } from "rimraf";
//
// Public
//
export default class helperRemovePaths {
    //
    // Public
    //
    /**
     * @param {string} argStringPath
     * */
    static removePath = ( argStringPath ) => {
        helperRemovePaths.raiseErrorIfPathIsNotInHome( argStringPath )
        rimraf.sync( argStringPath )
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
