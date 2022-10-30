//
// Libraries - custom
//
import helperCopyOnDiskGo from "./helperCopyOnDiskGo.js";
import helperPaths from "../../../helpersDisk/helpersPaths/helperPaths.js";
import helperPathsGo from "./helperPathsGo.js";
import helperPrintingGo from "./helperPrintingGo.js";
import helperShell from "../../../helpersShell/helperShell.js";
import helperStrings from "../../../helpersStrings/helperStrings.js";
//
// Public
//
export default class helperCompilerGo {
    //
    // Public
    //
    /**
     * @param {string} argStringPathDirProject
     * */
    static compile = ( argStringPathDirProject ) => {
        //
        // Reminder: Don't auto-clear the output directory because there might be files you don't want to remove
        //
        helperPrintingGo.temporarilyPrintMessage(
            "Compiling go project",
            () => {
                helperPaths.temporarilySetCwd(
                    argStringPathDirProject,
                    () => {
                        //
                        // Compile app
                        //
                        helperShell.runShellCmd( helperCompilerGo._getStringCmd() )
                        //
                        // Copy wasm_exec.js to output dir
                        // Reminder: Research didn't really turn up a way to set the output dir directly in the shell cmd
                        //
                        helperCopyOnDiskGo.copyFileWasmExecJsToDirOutput( argStringPathDirProject )
                        //
                        // Move main.wasm to output dir
                        //
                        helperCopyOnDiskGo.copyFileMainWasmToOutputDir( argStringPathDirProject )
                    }
                )
            },
        )
    }

    /**
     * @returns string
     * */
    static _getStringCmd = () => {

        return helperStrings.getStringByCombiningArray( [
            helperStrings.getStringByCombiningArray( [ "GOOS=", "js", ] ),
            helperStrings.getStringByCombiningArray( [ "GOARCH=", "wasm", ] ),
            helperPathsGo.fieldStringPathFileBinaryGo,
            "build",
            helperStrings.getStringByCombiningArray( [ "-o ", helperPathsGo.fieldStringNameFileMainWasm, ] ),
        ], " ", )
    }
}


















/*
    _copyDirWebServer( argStringPathDirDest ) {

        const stringPathDirOrig = "src/helpers_compilers/helpers_compile_go_to_wasm/www"
        //
        // Make dir if non-existent
        //
        const stringPathDirDest = helperConfigGo.getStringPathDirPkg( argStringPathDirDest )

        helperCreateOnDisk.createDirIfItDoesNotExist( stringPathDirDest )

        helperPrintingGo.temporarilyPrintMessage(
            `Copying dir: ${stringPathDirOrig}`,
            () => {
                helperCopyOnDisk.copyPathIntoDir(
                    stringPathDirOrig,
                    stringPathDirDest,
                )
            }
        )
    }
*/



























