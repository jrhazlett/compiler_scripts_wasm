//
// Libraries - downloaded
//
import isDocker from "is-docker"
import path from "path"
//
// Libraries - custom
//
import helperPathsProject from "../../../helpersDisk/helpersPaths/helperPathsProject.js";
import helperPaths from "../../../helpersDisk/helpersPaths/helperPaths.js";
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
        return path.join( helperPathsGo.fieldStringPathDirGoRoot, "misc/wasm", "wasm_exec.js", )
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

        let stringPathDirRootGo = this._getStringPathDirGo()

        //this.fieldStringPathDirGoRoot = path.join( stringPathDirRootGo, "libexec" )
        //this.fieldStringPathDirGoRoot = this._getStringPathDirGoRoot( stringPathDirRootGo )
        this.fieldStringPathDirGoRoot = this._getStringPathDirGo()

        //this.fieldStringPathFileBinaryGo = path.join( stringPathDirRootGo, "libexec/bin/go", )
        this.fieldStringPathFileBinaryGo = path.join( this.fieldStringPathDirGoRoot, "bin/go", )

        // Don't delete this yet
        this.fieldStringPathDirGopath = process.env.GOPATH
    }

    /**
     * @returns {string}
     * */
    _getStringPathDirGo = () => {
        //
        // Get base path based on whether or not we're running inside a container
        //
        let stringToReturn = isDocker() ? "/usr/local" : "/usr/local/Cellar"
        stringToReturn = path.join( stringToReturn, "go", ).toString()
        //
        // If the return string contains 'Cellar' then we need to get the latest go version
        //
        if ( stringToReturn.includes( "Cellar" ) ) {
            const arrayOfStringPathsInDir = helperPaths.getArrayOfStringPathsInDir( stringToReturn )
            if ( arrayOfStringPathsInDir.length === 0 ) {
                throw new Error([
                    `Dir: '${stringToReturn}' has no sub dirs.`,
                    `arrayOfStringPathsInDir.length = ${arrayOfStringPathsInDir.length}`,
                ].reduce((itemStringPrev, itemString) => `${itemStringPrev}\n${itemString}`))
            }
            stringToReturn = path.join( arrayOfStringPathsInDir[ arrayOfStringPathsInDir.length - 1 ], "libexec", )
        }
        return stringToReturn
    }
}
//
// Public
//
let helperPathsGo
export default helperPathsGo = new HelperPathsGo()
















































