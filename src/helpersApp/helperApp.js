export default class helperApp {
    //
    // Public - append
    //
    /**
     * @param {Function} argCallback
     * */
    static appendCallbackToArrayToRunOnExit = ( argCallback ) => { process.on( "exit", argCallback, ) }
    //
    // Public - exit
    //
    /**
     * Call this at the end of the app to make sure it closes
     * */
    static exitApp = () => {
        console.log( "\nSCRIPT COMPLETE" )
        process.exit( 0 )
    }
    //
    // Public - exit
    //
    /***/
    static printWhiteSpaceForStart = () => { console.log( "\n" ) }
}
















































