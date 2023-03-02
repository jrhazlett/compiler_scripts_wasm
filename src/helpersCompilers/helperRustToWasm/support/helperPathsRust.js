//
// Libraries - downloaded
//
import fs from "fs";
import * as path from "path"
//
// Libraries - custom
//
import helperPaths from "../../../helpersDisk/helpersPaths/helperPaths.js";
//
// Public
//
export default class helperPathsRust {
    //
    // Public - get
    //
    /**
     * @param {string} argStringPathDirProject
     * */
    static getStringNameForWasmPackage = ( argStringPathDirProject ) => {
        return path
            .basename( helperPaths.getArrayOfStringPathsInDirAndSubDirs( path.join( argStringPathDirProject, "pkg", ) )[ 0 ] )
            .split( "." )[ 0 ]
            .replace( "_", "-", )
    }
    /**
     * @param {string} argStringPathDirProject
     * */
    static getStringPathDirServerWww = ( argStringPathDirProject ) => { return path.join( argStringPathDirProject, "www", ) }

    /**
     * @param {string} argStringPathDirServer
     * @returns string
     * */
    static getStringPathFilePackageJson = ( argStringPathDirServer ) => { return path.join( argStringPathDirServer, "package.json", ) }
    //
    // Public - raise
    //
    /**
     * @param {string} argStringPathDirServerWww
     * */
    static raiseErrorIfPathDirWwwAlreadyExists = ( argStringPathDirServerWww ) => {
        if ( fs.existsSync( argStringPathDirServerWww ) ) {
            console.log( `Error: argStringPathDirServerWww already exists.\n` )
            console.log( `argStringPathDirServerWww = ${argStringPathDirServerWww}\n` )
            console.log( `fs.exists( argStringPathDirServerWww ) = ${fs.existsSync( argStringPathDirServerWww )}\n` )
            process.exit( 1 )
        }
    }
}

















































