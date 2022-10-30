//
// Libraries - custom
//
import helperCopyOnDisk from "../../../helpersDisk/helpersCopyOnDisk/helperCopyOnDisk.js";
import helperPathsProject from "../../../helpersDisk/helpersPaths/helperPathsProject.js";
import helperPathsRust from "./helperPathsRust.js";
import helperPrintingRust from "./helperPrintingRust.js";
//
// Public
//
export default class helperCopyOnDiskRust {
    //
    // Public
    //
    /**
     * @param {string} argStringPathDirProject
     * */
    static copyAdditionalFiles = ( argStringPathDirProject ) => {

        const stringPathFileOrig = helperPathsProject.getStringPathAbsolute(
            "src/helpersCompilers/helperRustToWasm/copy/run_server.sh"
        )
        helperPrintingRust.temporarilyPrintMessage(
            `Copying file: ${stringPathFileOrig}`,
            () => {
                helperCopyOnDisk.copyPathIntoDir(
                    stringPathFileOrig,
                    //
                    // stringPathDirWww
                    //
                    helperPathsRust.getStringPathDirServerWww( argStringPathDirProject ),
                )
            }
        )
    }
}






















































