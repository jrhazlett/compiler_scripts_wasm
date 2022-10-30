/*
GOOS=js GOARCH=wasm go build -o main.wasm

cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" .


    Command which works in this context...
GOOS=js GOARCH=wasm /usr/local/Cellar/go/1.19.1/libexec/bin/go build -o main.wasm



How the compilation process works...

- This runs the cmd stored in self._get_str_cmd()
- At this stage, the script has to chase down the resulting files
- Move "/usr/local/Cellar/go/1.19.1/libexec/misc/wasm/wasm_exec.js" to the output directory
- Move the resulting "main.wasm" from the project director to the destination

This has two benefits:
    - It keeps the actual source area clean
- It consolidates the results into a single directory
Why Go doesn't do this by default, or have a clear way to set the compilation output dir directly, is a mystery
*/
//
// Libraries - custom
//
import helperCompilerGo from "./support/helperCompilerGo.js";
import helperSetupServerGo from "./support/helperSetupServerGo.js";
//
// Public
//
export default class helperCompileGoToWasm {
    //
    // Public - wrappers
    //
    /**
     * @param {string} argStringPathDirProject
     * */
    static compile = ( argStringPathDirProject ) => { helperCompilerGo.compile( argStringPathDirProject ) }

    /**
     * @param {string} argStringPathDirProject
     * */
    static setupServer = ( argStringPathDirProject ) => { helperSetupServerGo.setupServer( argStringPathDirProject ) }
}














































