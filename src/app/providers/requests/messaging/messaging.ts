import {RequestHandlerProvider} from '../../request-handler/request-handler';
import {User} from '../../../models/user/user';
import {Thread} from '../../../models/user/thread';
import {Message} from '../../../models/user/message';

/**
 * All requests needed for dealing with messaging
 */
export default class Messaging {

    /**
     * Default constructor
     * @param requestHandler
     */
    constructor(private requestHandler: RequestHandlerProvider) {
    }

    /**
     * Loads the users threads
     * @param me
     * @param showLoading
     */
    async getThreads(me: User, showLoading: boolean): Promise<Thread[]> {
        return this.requestHandler.get('users/' + me.id + '/threads', true, showLoading, [
            'users',
        ], {}, {}, {}, 100).then(response => {
            if (response && response.data && response.data.length > 0) {
                return Promise.resolve(response.data.map(data => new Thread(data)));
            }

            return Promise.reject();
        });
    }

    /**
     * Creates a thread
     * @param me
     * @param user
     */
    async createThread(me: User, user: User): Promise<Thread> {
        return this.requestHandler.post('users/' + me.id + '/threads', true, true, {
            users: [user.id],
        }).then(response => {
            return Promise.resolve(new Thread(response));
        });
    }

    /**
     * Loads a list of messages
     * @param me
     * @param thread
     * @param showLoading
     */
    async getMessages(me: User, thread: Thread, showLoading = false): Promise<Message[]> {
        return this.requestHandler.get('users/' + me.id + '/threads/' + thread.id + '/messages', true, showLoading, [],
            {}, {}, {}, 100).then(response => {

            if (response && response.data && response.data.length > 0) {
                return Promise.resolve(response.data.map(data => new Message(data)));
            }

            return Promise.resolve([]);
        });
    }

    /**
     * Marks a message as being seen
     * @param me
     * @param thread
     * @param message
     */
    async markMessageAsSeen(me: User, thread: Thread, message: Message): Promise<Message> {
        return this.requestHandler.put('users/' + me.id + '/threads/' + thread.id + '/messages/' + message.id, true, false, {
                seen: true,
            }).then(response => {

            if (response) {
                return Promise.resolve(new Message(response));
            }

            return Promise.reject();
        });
    }

    /**
     * Creates a message properly
     * @param me
     * @param thread
     * @param message
     */
    async createMessage(me: User, thread: Thread, message: string): Promise<Message> {
        return this.requestHandler.post('users/' + me.id + '/threads/' + thread.id + '/messages', true, true, {
            message: message,
        }).then(response => {
            return Promise.resolve(new Message(response));
        });
    }
}
