//
// Public
//
export default class helperPrintingRust {
    //
    // Public
    //
    /**
     * @param {string} argStringMessage
     * */
    static printMessage = ( argStringMessage ) => { console.log( `( ${helperPrintingRust._FIELD_NAME_LANGUAGE} -> wasm ) ${argStringMessage}\n` ) }

    /**
     * @param {string} argStringMessage
     * @param {Function} argCallback
     * */
    static temporarilyPrintMessage = ( argStringMessage, argCallback ) => {
        const stringMessage = `( ${helperPrintingRust._FIELD_NAME_LANGUAGE} -> wasm ) ${argStringMessage}...`
        console.log( `${stringMessage}\n` )
        const resultToReturn = argCallback()
        console.log( `${stringMessage}DONE\n` )
        return resultToReturn
    }
    static _FIELD_NAME_LANGUAGE = "rust"
}















































