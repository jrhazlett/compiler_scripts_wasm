//
// Libraries - downloaded
//
import path from "path";
import helperPathsProject from "../../../helpersDisk/helpersPaths/helperPathsProject.js";
//
// Class
//
class HelperPathsGo {
    //
    // Public - get
    //
    /**
     * @param {string} argStringPathDirProject
     * @returns string
     * */
    getStringPathDirPkg = ( argStringPathDirProject ) => { return path.join( argStringPathDirProject, "pkg", ) }

    /**
     * @returns string
     * */
    getStringPathDirWwwOrig = () => { return path.join( helperPathsProject.fieldStringPathDirProject, "src/helpersCompilers/helperGoToWasm/copy/www", ) }

    getStringPathFileIndexHtmlOrig = () => {
        return path.join(
            helperPathsProject.fieldStringPathDirProject, "src/helpersCompilers/helperGoToWasm/copy/www/pkg_orig", "index.html",
        )
    }

    /**
     * @returns string
     * */
    getStringPathFileWasmExecJs = () => {
        //
        // The path is...
        // "/usr/local/Cellar/go/1.19.1/libexec/misc/wasm/wasm_exec.js"
        //
        return path.join( helperPathsGo.fieldStringPathDirGoroot, "misc/wasm", "wasm_exec.js", )
    }

    /**
     * @param {string} argStringPathDirProject
     * @returns string
     * */
    getStringPathFileMainWasm = ( argStringPathDirProject ) => { return path.join( argStringPathDirProject, "main.wasm", ) }
    //
    // Setup
    //
    constructor() {

        this.fieldStringNameFileMainWasm = "main.wasm"

        this.fieldStringVersionForGo = "1.19.1"

        this.fieldStringPathDirGoroot = path.join( "/usr/local/Cellar/go", this.fieldStringVersionForGo, "libexec" )

        this.fieldStringPathFileBinaryGo = path.join( "/usr/local/Cellar/go", this.fieldStringVersionForGo, "libexec/bin/go", )

        // Don't delete this yet
        this.fieldStringPathDirGopath = process.env.GOPATH
    }
}
//
// Public
//
let helperPathsGo
export default helperPathsGo = new HelperPathsGo()
















































