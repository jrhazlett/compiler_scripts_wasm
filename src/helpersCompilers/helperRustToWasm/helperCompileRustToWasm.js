/*
To set this up...

brew install rust
brew install wasm-pack

Info source:
    https://rustwasm.github.io/book/game-of-life/hello-world.html


        How compilation works...
- Process runs 'wasm-pack build' and this leads to a pretty straight forward creation of ./pkg

Shortcut for building a web server...
- Runs 'npm init wasm-app www'
- This creates a new server in ./www
- Adds the wasm package as a dependency in ./www/package.json
*/
//
// Libraries - custom
//
import helperPaths from "../../helpersDisk/helpersPaths/helperPaths.js";
import helperPrintingRust from "./support/helperPrintingRust.js";
import helperSetupServerRust from "./support/helperSetupServerRust.js";
import helperShell from "../../helpersShell/helperShell.js";
//
// Class
//
export default class helperCompileRustToWasm {
    //
    // Public
    //
    /**
     * @param {string} argStringPathDirProject
     * */
    static compile = ( argStringPathDirProject ) => {
        //
        // This runs the shell cmd:
        // wasm-pack build
        //
        // The cmd creates <project dir>/pkg
        //
        helperPrintingRust.temporarilyPrintMessage(
            "Compiling rust package",
            () => {
                helperPaths.temporarilySetCwd(
                    argStringPathDirProject,
                    () => {
                        helperPrintingRust.printMessage( `cwd: ${helperPaths.getStringPathCwd()}...` )
                        helperShell.runShellCmd( "wasm-pack build" )
                    }
                )
            },
        )
    }

    /**
     * @param {string} argStringPathDirProject
     * */
    static setupNodejsServer = ( argStringPathDirProject ) => { helperSetupServerRust.setupNodejsServerForTesting( argStringPathDirProject ) }
}
























































