//
// Libraries - native
//
import os from "os";
//
// Libraries - downloaded
//
import fs from "fs";
import path from "path";
//
// Class
//
class HelperPathsProject {
    //
    // Public - get
    //
    /**
     * @param {string} argStringPathRel
     * @returns string
     * */
    getStringPathAbsolute = ( argStringPathRel ) => {
        if ( argStringPathRel.startsWith( this.fieldStringPathDirProject ) ) { return argStringPathRel }
        return path.join( this.fieldStringPathDirProject, argStringPathRel, )
    }

    /**
     * This returns the path to the first dir that contains a "package.json" file
     *
     * @param {string | undefined} argStringPath
     * @returns {string | undefined}
     * */
    getStringPathDirProjectRoot = ( argStringPath = undefined ) => {
        let stringToReturn = argStringPath === undefined ? path.resolve( "" ) : argStringPath
        while (true) {
            console.log( `stringToReturn = ${stringToReturn}\n` )

            if ( fs.lstatSync( stringToReturn ).isDirectory() ) {
                //
                // Return the first dir that contains 'package.json'
                //
                if ( this.logicDirIsProjectRoot( stringToReturn ) ) { return stringToReturn }
                //
                // If we get to the home dir, then obviously this is a major error; return undefined
                //
                HelperPathsProject.raiseErrorIfPathIsNotInHome( stringToReturn )
            }
            stringToReturn = path.dirname(stringToReturn)
        }
    }
    //
    // Public - logic
    //
    /**
     * @param {string} argStringPath
     * */
    logicDirIsProjectRoot = ( argStringPath ) => { return fs.readdirSync( argStringPath ).includes( "package.json" ) }
    //
    // Public - raise
    //
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
    // Setup
    //
    /***/
    constructor() {
        this.fieldStringPathDirProject = this.getStringPathDirProjectRoot()

        this.fieldStringPathDirData = path.join( this.fieldStringPathDirProject, "data", )

        this.fieldStringPathDirDataOutput = path.join( this.fieldStringPathDirData, "dataOutput", )
    }
}
//
// Public
//
let helperPathsProject = new HelperPathsProject()
export default helperPathsProject















































