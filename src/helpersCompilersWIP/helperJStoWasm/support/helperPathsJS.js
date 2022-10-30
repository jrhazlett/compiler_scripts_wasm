/*
Compiling javascript is really experimental. Until there's a clearly apparent way to reduce reliance on
extensive pathing logic, this module makes most the most sense.
*/
//
// Libraries - downloaded
//
import * as path from "path";
//
// Libraries - custom
//
import helperPaths from "../../../helpersDisk/helpersPaths/helperPaths.js";
import helperPathsProject from "../../../helpersDisk/helpersPaths/helperPathsProject.js";
//
// Class
//
class HelperPathsJS {
    //
    // Public - get
    //
    /**
     * @param {string} argStringPath
     * @returns string
     * */
    getStringPathDirProjectForTarget = ( argStringPath ) => { return helperPathsProject.getStringPathDirProjectRoot( argStringPath ) }

    /**
     * @param {string} argStringPathDir
     * @returns string
     * */
    getStringPathDirPkg = ( argStringPathDir ) => { return path.join( argStringPathDir, "pkg", ) }

    /**
     * @param {string} argStringPathInput
     * @param {string} argStringPathDirPkg
     * @returns string
     * */
    getStringPathDirPkgOutput = ( argStringPathInput, argStringPathDirPkg ) => {
        return path.join( argStringPathDirPkg, helperPaths.getStringNameWithExtReplaced( argStringPathInput, "wasm", ), )
    }

    //
    // Setup
    //
    constructor() { this.fieldStringPathFileBinaryJavy = this._getStringPathFileBinaryJavy() }

    /**
     * @returns string
     * */
    _getStringPathFileBinaryJavy = () => {
        return helperPathsProject.getStringPathAbsolute( "src/helpersCompilers/helperJStoWasm/binaryForCompiler/javy" )
    }
}
//
// Public
//
let helperPathsJS
export default helperPathsJS = new HelperPathsJS()













































