//
// Libraries - downloaded
//
import fs from "fs"
import { rimraf } from "rimraf";
//
// Libraries - custom
//
import helperCopyOnDiskRust from "./helperCopyOnDiskRust.js";
import helperFiles from "../../../helpersDisk/helpersFiles/helperFiles.js";
import helperPaths from "../../../helpersDisk/helpersPaths/helperPaths.js";
import helperPathsRust from "./helperPathsRust.js";
import helperPrintingRust from "./helperPrintingRust.js";
import helperRemovePaths from "../../../helpersDisk/helpersRemovePaths/helperRemovePaths.js";
import helperShell from "../../../helpersShell/helperShell.js";
//
// Public
//
export default class helperSetupServerRust {
    //
    // Public
    //
    /**
     * @param {string} argStringPathDirProject
     * */
    static setupNodejsServerForTesting = ( argStringPathDirProject ) => {

        const stringPathDirServerWww = helperPathsRust.getStringPathDirServerWww( argStringPathDirProject )
        //
        // Setup the server if it doesn't already exist
        //
        if ( !fs.existsSync( stringPathDirServerWww ) ) {
            helperPrintingRust.temporarilyPrintMessage(
                "Setting up nodejs server for testing",
                () => {
                    helperPaths.temporarilySetCwd(
                        argStringPathDirProject,
                        () => {
                            helperShell.runShellCmd( "npm init wasm-app www" )
                            this._setupNodejsServerWithinDir( argStringPathDirProject, stringPathDirServerWww, )
                        },
                    )
                    helperCopyOnDiskRust.copyAdditionalFiles( argStringPathDirProject )
                },
            )
        //
        // Refresh *only* the wasm module if 'www' already exists
        //
        } else {
            helperPrintingRust.temporarilyPrintMessage(
                "Server already exists. Refreshing wasm package.",
                () => {
                    const stringPathDirWasmPackageInNodeModules = helperPathsRust.getStringPathDirWasmPackageInNodeModules( argStringPathDirProject )
                    if ( fs.existsSync( stringPathDirWasmPackageInNodeModules ) ) {
                        helperPrintingRust.temporarilyPrintMessage(
                            `Removing dir: ${stringPathDirWasmPackageInNodeModules}`,
                            () => { helperRemovePaths.removePath( stringPathDirWasmPackageInNodeModules ) },
                        )
                    }
                    const stringPathDirServerWww = helperPathsRust.getStringPathDirServerWww( argStringPathDirProject )
                    helperPaths.temporarilySetCwd(
                        stringPathDirServerWww,
                        () => { helperShell.runShellCmd( "npm i" ) },
                    )
                }
            )
        }
    }

    /**
     * @param {string} argStringPathDirProject
     * @param {string} argStringPathDirServerWww
     * */
    static _setupNodejsServerWithinDir = ( argStringPathDirProject, argStringPathDirServerWww, ) => {

        helperPaths.temporarilySetCwd(
            argStringPathDirServerWww,
            () => {
                helperShell.runShellCmd( "npm i" )
                helperSetupServerRust._updatePackageJson( argStringPathDirProject, argStringPathDirServerWww, )
                helperShell.runShellCmd( "npm i" )
            },
        )
    }

    /**
     * @param {string} argStringPathDirProject
     * @param {string} argStringPathDirServer
     * */
    static _updatePackageJson = ( argStringPathDirProject, argStringPathDirServer ) => {

        const stringPathFilePackageJson = helperPathsRust.getStringPathFilePackageJson( argStringPathDirServer )
        //
        // Write to file
        //
        helperFiles.writeObjectToFile(
            stringPathFilePackageJson,
            //
            // objectPackageJson
            //
            helperSetupServerRust._getObjectWithDependenciesAdded(
                helperFiles.getObjectFromFile( stringPathFilePackageJson ), argStringPathDirProject,
            ),
        )
    }

    /**
     * @param {Object} argObjectPackageJson
     * @param {string} argStringPathDirProject
     * */
    static _getObjectWithDependenciesAdded = ( argObjectPackageJson, argStringPathDirProject ) => {

        const stringNameForWasmPackage = helperPathsRust.getStringNameForWasmPackage( argStringPathDirProject )

        return helperPrintingRust.temporarilyPrintMessage(
            `Adding dependency: ${stringNameForWasmPackage}`,
            () => {
                const stringKeyDependencies = "dependencies"
                if ( !argObjectPackageJson.hasOwnProperty( stringKeyDependencies ) ) { argObjectPackageJson[ stringKeyDependencies ] = {} }
                const objectDependencies = argObjectPackageJson[ stringKeyDependencies ]
                //
                // Add dependency line
                //
                objectDependencies[ stringNameForWasmPackage ] = "file:../pkg"
                return argObjectPackageJson
            },
        )
    }
}

































