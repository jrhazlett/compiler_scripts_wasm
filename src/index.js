//
// Libraries - downloaded
//
import prettyPrinterForHumans from "pretty_printer_for_humans";
//
// Libraries - custom
//
import helperApp from "./helpersApp/helperApp.js";
import helperCompileGoToWasm from "./helpersCompilers/helperGoToWasm/helperCompileGoToWasm.js";
import helperCompileJStoWasm from "./helpersCompilersWIP/helperJStoWasm/helperCompileJStoWasm.js";
import helperCompileRustToWasm from "./helpersCompilers/helperRustToWasm/helperCompileRustToWasm.js";
//
// Class
//
class _helperTasks {

    /**
     * @param {string} argStringPath
     * */
    static taskCompileGoToWasm = ( argStringPath ) => {
        helperCompileGoToWasm.compile( argStringPath )
        helperCompileGoToWasm.setupServer( argStringPath )
    }

    /**
     * @param {string} argStringPath
     * */
    static taskCompileRustToWasm = ( argStringPath ) => {
        helperCompileRustToWasm.compile( argStringPath )
        helperCompileRustToWasm.setupNodejsServer( argStringPath )
    }

    /**
     * @param {string} argStringPath
     * */
    static taskCompileJStoWasmWIP = ( argStringPath ) => {
        helperCompileJStoWasm.compile( argStringPath )
    }
}
//
// Main
//
const main = async () => {
    helperApp.printWhiteSpaceForStart()
    //
    // Works
    //
    const stringPathGo = ""
    //_helperTasks.taskCompileGoToWasm( stringPathGo )

    const stringPathRust = ""
    //_helperTasks.taskCompileRustToWasm( stringPathRust )
    //
    // WIP
    //
    const stringPathJS = ""
    //_helperTasks.taskCompileJStoWasmWIP( stringPathJS )

}
main().then( () => helperApp.exitApp() )




















































