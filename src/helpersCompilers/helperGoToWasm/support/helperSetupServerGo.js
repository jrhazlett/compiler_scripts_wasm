//
// Libraries - custom
//
import helperCopyOnDisk from "../../../helpersDisk/helpersCopyOnDisk/helperCopyOnDisk.js";
import helperCopyOnDiskGo from "./helperCopyOnDiskGo.js";
import helperPathsGo from "./helperPathsGo.js";
//
// Public
//
export default class helperSetupServerGo {
    //
    // Public
    //
    /**
     * @param {string} argStringPathDirProject
     * */
    static setupServer = ( argStringPathDirProject ) => {
        const stringPathDirServerOrig = helperPathsGo.getStringPathDirWwwOrig()
        helperCopyOnDisk.copyPathIntoDir( stringPathDirServerOrig, argStringPathDirProject, )
        helperCopyOnDiskGo.copyFileIndexToPkg( argStringPathDirProject )
    }
}











































