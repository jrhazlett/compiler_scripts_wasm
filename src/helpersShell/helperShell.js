//
// Libraries - native
//
import { execSync } from "child_process"
//
// Public
//
export default class helperShell {
    //
    // Public - run
    //
    /**
     * @param {string} argStringCommand
     * */
    static runShellCmd = ( argStringCommand ) => {
        helperShell.temporarilyPrintMessageRunningCommand(
            argStringCommand,
            () => {
                const { err, stdout, stderr } = execSync( argStringCommand )
                if ( err ) { console.log( `err = ${err}\n` ) }
                if ( err ) { console.log( `stdout = ${stdout}\n` ) }
                if ( err ) { console.log( `stderr = ${stderr}\n` ) }
            }
        )
    }

    /**
     * @param {string} argStringCommand
     * @param {Function} argCallback
     * */
    static temporarilyPrintMessageRunningCommand = ( argStringCommand, argCallback ) => {
        const stringMessage = `RUNNING CMD: ${argStringCommand}...`
        console.log( `${stringMessage}\n` )
        argCallback()
        console.log( `${stringMessage}DONE\n` )
    }
}



















































