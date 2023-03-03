//
// Libraries - custom
//
import helperApp from "./helpersApp/helperApp.js";
import helperCompileGoToWasm from "./helpersCompilers/helperGoToWasm/helperCompileGoToWasm.js";
import helperCompileJStoWasm from "./helpersCompilersWIP/helperJStoWasm/helperCompileJStoWasm.js";
import helperCompileRustToWasm from "./helpersCompilers/helperRustToWasm/helperCompileRustToWasm.js";
import helperPaths from "./helpersDisk/helpersPaths/helperPaths.js";
import helperShellArgs from "./helpersShellArgs/helperShellArgs.js";
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
            if ( itemStringPath.endsWith( stringForIdentifyingProjectGo ) ) { return "go" }
            if ( itemStringPath.endsWith( stringForIdentifyingProjectRust ) ) { return "rust" }
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
            .reduce( ( objectToUpdate, itemStringKey ) => Object.assign(
                objectToUpdate,
                { [ itemStringKey.substring( stringPrefix.length ).toLowerCase() ]: this[ itemStringKey ] }
            ), {}, )
    }
}
const helperTasks = new HelperTasks()
//
// Main
//
const main = async () => {
    helperApp.printWhiteSpaceForStart()

    const [ stringPathTarget, stringNameLanguage, ] = helperShellArgs.getPairOfStringsPathToProjectAndNameOfLanguageFromShellArgs( helperTasks )
    helperTasks.fieldObjectOfNamesOfFunctions[ stringNameLanguage ]( stringPathTarget )
}
main().then( () => helperApp.exitApp() )




















































