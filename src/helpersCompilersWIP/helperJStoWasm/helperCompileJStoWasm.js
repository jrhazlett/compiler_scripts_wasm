/*
Source:
https://github.com/Shopify/javy
*/
//
// Libraries - custom
//
import helperCompilerJS from "./support/helperCompilerJS.js";
import helperPrintingJS from "./support/helperPrintingJS.js";
//
// Public
//
export default class helperCompileJStoWasm {
    //
    // Public - wrappers
    //
    /**
     * (theoretically) works
     *
     * @param {string} argStringPath
     * */
    static compile = ( argStringPath ) => {
        helperPrintingJS.temporarilyPrintMessage(
            "Compiling javascript project",
            () => { helperCompilerJS.compile( argStringPath ) },
        )
    }
}























































