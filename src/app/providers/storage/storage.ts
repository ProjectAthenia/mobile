import {Injectable} from '@angular/core';
import {NativeStorage} from '@ionic-native/native-storage/ngx';

@Injectable()
export class StorageProvider
{
    /**
     * Provider for dealing with application level storage
     *
     * @param {NativeStorage} storage
     */
    constructor(private storage: NativeStorage)
    {}

    /**
     * Loads the authentication token from storage
     */
    loadAuthToken(): Promise<string>
    {
        return this.storage.getItem('auth_token');
    }

    /**
     * Loads the date time for when this was last received at
     */
    loadReceivedAt(): Promise<number>
    {
        return this.storage.getItem('received_at');
    }

    /**
     * Loads the user id that is logged into the app
     */
    loadLoggedInUserId(): Promise<number>
    {
        return this.storage.getItem('user_id');
    }

    /**
     * Loads the default home page url so we can navigate to it if it is set
     */
    loadDefaultHomePage(): Promise<string>
    {
        return this.storage.getItem('default_home_page');
    }

    /**
     * Handler for saving the auth token back into storage
     * @param token
     */
    saveAuthToken(token)
    {
        return Promise.all([
            this.storage.setItem('auth_token', token),
            this.storage.setItem('received_at', Date.now()),
        ]);
    }

    /**
     * saves the logged in user id for the terminal
     *
     * @param userId
     */
    saveLoggedInUserId(userId: number): Promise<any>
    {
        return this.storage.setItem('user_id', userId);
    }

    /**
     * Saves the default home page for us to go to the next time the app opens
     * @param defaultHomePage
     */
    saveDefaultHomePage(defaultHomePage: string): Promise<any>
    {
        return this.storage.setItem('default_home_page', defaultHomePage);
    }

    /**
     * Removes all keys from storage
     */
    logOut()
    {
        return this.storage.clear();
    }

    // Put all custom storage variables below
}
