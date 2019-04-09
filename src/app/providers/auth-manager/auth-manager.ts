import {Injectable} from "@angular/core";
import {StorageProvider} from "../storage/storage";

/**
 * Used to manage the authentication of the app
 */
@Injectable()
export class AuthManagerProvider {

    /**
     * The refresh rate for when to refresh the token
     */
    static TOKEN_REFRESH_INTERVAL = 55 * 60 * 1000;

    /**
     * Default Constructor
     * @param storageProvider
     */
    constructor(private storageProvider: StorageProvider) {
    }

    /**
     * Checks if the last retrieved token needs to be refreshed
     */
    needsRefresh(): Promise<boolean> {
        return new Promise((resolve, reject) => {

            this.storageProvider.loadReceivedAt().then(receivedAt => {

                resolve(receivedAt + AuthManagerProvider.TOKEN_REFRESH_INTERVAL < Date.now());
            });
        });
    }
}