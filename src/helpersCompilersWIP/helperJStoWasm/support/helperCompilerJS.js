//
// Libraries - custom
//
import helperCreateOnDisk from "../../../helpersDisk/helpersCreateOnDisk/helperCreateOnDisk.js";
import helperPathsJS from "./helperPathsJS.js";
import helperShell from "../../../helpersShell/helperShell.js";
import helperStrings from "../../../helpersStrings/helperStrings.js";
//
// Public
//
export default class helperCompilerJS {
    //
    // Public - compile
    //
    /**
     * @param {string} argStringPathFileInput
     * */
    static compile = ( argStringPathFileInput ) => {
        //
        // Set up the pkg dir
        //
        const stringPathDirProjectTarget = helperPathsJS.getStringPathDirProjectForTarget( argStringPathFileInput )
        const stringPathDirPkg = helperPathsJS.getStringPathDirPkg( stringPathDirProjectTarget )
        helperCreateOnDisk.createDirIfItDoesNotExist( stringPathDirPkg )
        //
        // Run the shell command and output the result to pkg
        //
        helperShell.runShellCmd( helperCompilerJS._getStringCmd( argStringPathFileInput, stringPathDirPkg, ) )
    }

    /**
     * @param {string} argStringPathFileInput
     * @param {string} argStringPathDirPkg
     * */
    static _getStringCmd = ( argStringPathFileInput, argStringPathDirPkg ) => {
        //
        // Example command:
        // javy index.js -o destination/index.wasm
        //
        // Get path to binary compiler
        //
        // Return the command
        //
        return helperStrings.getStringByCombiningArray( [
            //
            // Path to javy binary
            //
            helperPathsJS.fieldStringPathFileBinaryJavy,
            //
            // Input main file
            //
            argStringPathFileInput,
            //
            // Output path
            //
            "-o", helperPathsJS.getStringPathDirPkgOutput( argStringPathFileInput, argStringPathDirPkg, ),

        ], " ", )
    }
}





















































