//
// Libraries - custom
//
import helperMoveOnDisk from "../../../helpersDisk/helpersMoveOnDisk/helperMoveOnDisk.js";
import helperPathsGo from "./helperPathsGo.js";
import helperPrintingGo from "./helperPrintingGo.js";
import helperCreateOnDisk from "../../../helpersDisk/helpersCreateOnDisk/helperCreateOnDisk.js";
import helperCopyOnDisk from "../../../helpersDisk/helpersCopyOnDisk/helperCopyOnDisk.js";
//
// Public
//
export default class helperCopyOnDiskGo {
    //
    // Public - copy
    //
    /**
     * @param {string} argStringPathDirProject
     * */
    static copyFileIndexToPkg = ( argStringPathDirProject ) => {

        const stringPathFileOrig = helperPathsGo.getStringPathFileIndexHtmlOrig()

        helperPrintingGo.temporarilyPrintMessage(
            `Copying file: ${stringPathFileOrig}`,
            () => {
                helperCopyOnDisk.copyPathIntoDir(
                    stringPathFileOrig,
                    //
                    // stringPathFileDest
                    //
                    helperPathsGo.getStringPathDirPkg( argStringPathDirProject ),
                )
            },
        )
    }

    /**
     * @param {string} argStringPathDirProject
     * */
    static copyFileMainWasmToOutputDir = ( argStringPathDirProject ) => {
        helperPrintingGo.temporarilyPrintMessage(
            `Copying ${helperPathsGo.fieldStringNameFileMainWasm}`,
            () => {
                helperMoveOnDisk.movePathIntoPathDir(
                    // origin
                    helperPathsGo.getStringPathFileMainWasm( argStringPathDirProject ),
                    // dest
                    helperPathsGo.getStringPathDirPkg( argStringPathDirProject ),
                )
            }
        )
    }

    /**
     * @param {string} argStringPathFileDirOutput
     * */
    static copyFileWasmExecJsToDirOutput = ( argStringPathFileDirOutput ) => {
        //
        // The original path is...
        // "/usr/local/Cellar/go/1.19.1/libexec/misc/wasm/wasm_exec.js"
        //
        // COPY that file, and move it to the target output dir
        //
        const stringPathDirOutput = helperPathsGo.getStringPathDirPkg( argStringPathFileDirOutput )
        helperCreateOnDisk.createDirIfItDoesNotExist( stringPathDirOutput )

        const stringPathFileWasmExecJs = helperPathsGo.getStringPathFileWasmExecJs()
        //
        // Make the dest if it doesn't already exist
        //
        helperPrintingGo.temporarilyPrintMessage(
            `Copying ${stringPathFileWasmExecJs}`,
            () => {
                helperCopyOnDisk.copyPathIntoDir(
                    //
                    // stringPathDirInput
                    //
                    stringPathFileWasmExecJs,
                    stringPathDirOutput,
                )
            }
        )
    }
}
















































