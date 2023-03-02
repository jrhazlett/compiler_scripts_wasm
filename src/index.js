//
// Libraries - downloaded
//
import fs from "fs"
import prettyPrinterForHumans from "pretty_printer_for_humans";
//
// Libraries - custom
//
import helperApp from "./helpersApp/helperApp.js";
import helperCompileGoToWasm from "./helpersCompilers/helperGoToWasm/helperCompileGoToWasm.js";
import helperCompileJStoWasm from "./helpersCompilersWIP/helperJStoWasm/helperCompileJStoWasm.js";
import helperCompileRustToWasm from "./helpersCompilers/helperRustToWasm/helperCompileRustToWasm.js";
import helperShellHost from "./helpersShell/helperShellHost.js";
import helperPaths from "./helpersDisk/helpersPaths/helperPaths.js";
//
// Class
//
class HelperTasks {
    //
    // Public - get
    //
    getStringNameLanguageOfProject = ( argStringPathDir ) => {

        const arrayOfStringPathsInDir = helperPaths.getArrayOfStringPathsInDir( argStringPathDir )

        const stringForIdentifyingProjectRust = "Cargo.toml"
        const stringForIdentifyingProjectGo = "main.go"

        let itemIndex = -1
        const intLength = arrayOfStringPathsInDir.length
        while ( ++itemIndex < intLength ) {
            const itemStringPath = arrayOfStringPathsInDir[ itemIndex ]
            if ( itemStringPath.endsWith( stringForIdentifyingProjectRust ) ) { return "rust" }
            if ( itemStringPath.endsWith( stringForIdentifyingProjectGo ) ) { return "go" }
        }
        console.log( new Error( [
            "Project in target directory could not be identified.",
            `argStringPathDir = ${argStringPathDir}`,
        ].reduce( ( itemStringPrev, itemString ) => `${itemStringPrev}\n${itemString}` ) ) )
        process.exit( 1 )
    }
    //
    // Public - tasks
    //
    /**
     * @param {string} argStringPath
     * */
    taskCompileToWasmGo = ( argStringPath ) => {
        helperCompileGoToWasm.compile( argStringPath )
        helperCompileGoToWasm.setupServer( argStringPath )
    }

    /**
     * @param {string} argStringPath
     * */
    taskCompileToWasmRust = ( argStringPath ) => {
        helperCompileRustToWasm.compile( argStringPath )
        helperCompileRustToWasm.setupNodejsServer( argStringPath )
    }

    /**
     * @param {string} argStringPath
     * */
    taskCompileToWasmJavaScriptWIP = ( argStringPath ) => {
        helperCompileJStoWasm.compile( argStringPath )
    }
    //
    // Setup
    //
    constructor() {

        const stringPrefix = "taskCompileToWasm"
        const stringSuffixToFilterOut = "WIP"
        //
        // Build object for easily referenced keys coming in from shell
        //
        // Example: 'taskCompileToWasmRust' -> 'rust'
        this.fieldObjectOfNamesOfFunctions = Object.keys( this )
            .filter( ( itemStringKey ) => itemStringKey.startsWith( stringPrefix ) && !itemStringKey.endsWith( stringSuffixToFilterOut ) )
            .reduce( ( objectToUpdate, itemStringKey ) => {
                return Object.assign(
                    objectToUpdate,
                    { [ itemStringKey.substring( stringPrefix.length ).toLowerCase() ]: this[ itemStringKey ] }
                )
            }, {}, )
    }
}
const helperTasks = new HelperTasks()

/**
 * @returns {string[]}
 *
 * Get the two arguments passed to the shell
 * Example command:
 * node src/index.js rust <path to target dir>
 * */
const getPairOfStringsPathToProjectAndNameOfLanguageFromShellArgs = () => {
    const arrayOfArgumentsOnlyCustom = helperShellHost.getArrayOfArgumentsOnlyCustom()

    const stringPathDirTarget = arrayOfArgumentsOnlyCustom[ 0 ]

    let boolRaiseErrorInvalidPath = false
    if ( stringPathDirTarget === undefined ) { boolRaiseErrorInvalidPath = true
    } else if ( !fs.existsSync( stringPathDirTarget ) ) { boolRaiseErrorInvalidPath = true }

    if ( boolRaiseErrorInvalidPath ) {
        console.log( new Error([
            "No path to project directory provided.",
            `stringPathDirTarget = ${stringPathDirTarget}`,
            "To run the app from the shell, use the following command:",
            "node src/index.js (path to target proj dir) (optional language name)",
        ].join( "\n\n" )) )
        process.exit( 1 )
    }
    //
    // Setup stringNameLanguage
    //
    let stringNameLanguage = arrayOfArgumentsOnlyCustom[ 1 ]
    if ( stringNameLanguage === undefined || stringNameLanguage.trim().length === 0 ) { stringNameLanguage = helperTasks.getStringNameLanguageOfProject( stringPathDirTarget )
    } else {
        stringNameLanguage = stringNameLanguage.toLowerCase()
        const arrayOfKeys = [...Object.keys( helperTasks.fieldObjectOfNamesOfFunctions )]
        if ( !arrayOfKeys.includes( stringNameLanguage ) ) {
            console.log( new Error([
                "Invalid language name provided.",
                `stringNameLanguage = ${stringNameLanguage}`,
                "To run the app from the shell, use the following command:",
                "node src/index.js (path to target proj dir) (optional language name)",
                `List of valid language names: [ ${arrayOfKeys.reduce( ( itemStringPrev, itemString ) => `${itemStringPrev}, ${itemString}` )} ]\n`,
            ].join( "\n\n" )) )
            process.exit( 1 )
        }
    }
    return [ stringPathDirTarget, stringNameLanguage, ]
}
//
// Main
//
const main = async () => {
    helperApp.printWhiteSpaceForStart()

    const [ stringPathTarget, stringNameLanguage, ] = getPairOfStringsPathToProjectAndNameOfLanguageFromShellArgs()
    helperTasks.fieldObjectOfNamesOfFunctions[ stringNameLanguage ]( stringPathTarget )
}
main().then( () => helperApp.exitApp() )




















































