//
// Libraries - downloaded
//
import fs from "fs"
//
// Public
//
export default class helperCreateOnDisk {
    //
    // Public - create
    //
    /**
     * @param {string} argStringPathDir
     * */
    static createDirIfItDoesNotExist = ( argStringPathDir ) => {
        if ( !fs.existsSync( argStringPathDir ) ) { fs.mkdirSync( argStringPathDir, { recursive: true }, ) }
    }
}






















































