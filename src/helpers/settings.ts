import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { Drivers, Storage } from '@ionic/storage';
import PocketBase from 'pocketbase'



/**
 *  NOTE: import PocketBasee and Storage in SettingContext file for to fix typing errors
 * 
 */
const appName = "Builders"

const DEBUG = false

const pocketbaseUrl = DEBUG ? "http://127.0.0.1:8090" : "https://builders.pockethost.io/"
console.log("🚀 ~ file: settings.ts:16 ~ pocketbaseUrl:", pocketbaseUrl)

const pb = new PocketBase(pocketbaseUrl)


const storage = new Storage({
    name:  `__${appName}`,
    driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
})

storage.create()


export default function Settings () {
    return {
        appName,
        storage,
        pb,
        DEBUG,
        pocketbaseUrl
    }
}

