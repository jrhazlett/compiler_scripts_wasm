//
// Public
//
export default class helperPrintingGo {
    //
    // Public
    //
    /**
     * @param {string} argStringMessage
     * */
    static printMessage = ( argStringMessage ) => { console.log( `( ${helperPrintingGo._FIELD_NAME_LANGUAGE} -> wasm ) ${argStringMessage}\n` ) }

    /**
     * @param {string} argStringMessage
     * @param {Function} argCallback
     * */
    static temporarilyPrintMessage = ( argStringMessage, argCallback ) => {
        const stringMessage = `( ${helperPrintingGo._FIELD_NAME_LANGUAGE} -> wasm ) ${argStringMessage}...`
        console.log( `${stringMessage}\n` )
        const result = argCallback()
        console.log( `${stringMessage}DONE\n` )
        return result
    }
    static _FIELD_NAME_LANGUAGE = "go"
}




















































