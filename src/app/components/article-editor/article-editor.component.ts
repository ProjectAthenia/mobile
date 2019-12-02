import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import { Platform } from '@ionic/angular';
import {Article} from '../../models/wiki/article';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-article-editor',
    templateUrl: './article-editor.component.html',
    styleUrls: ['./article-editor.component.scss']
})
export class ArticleEditorComponent implements OnChanges {

    /**
     * The editor for this page
     */
    @ViewChild('editor', {static: false})
    editor: any;

    /**
     * The article the user is editing
     */
    @Input()
    article: Article = null;

    /**
     * The content that we last set to the editor
     */
    lastContentSnapshot: string = null;

    /**
     * The snapshot interval
     */
    snapshotInterval: any = null;

    /**
     * The current auth token
     */
    @Input()
    token: string = null;

    /**
     * The currently connected websocket
     */
    webSocket: WebSocket = null;

    /**
     * Default Constructor
     * @param platform
     */
    constructor(private platform: Platform) {
    }

    /**
     * Picks up changes to our article input
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        if (this.article && this.token) {

            this.lastContentSnapshot = this.article.content;
            this.editor.innerHtml = this.lastContentSnapshot;

            if (this.webSocket) {
                this.webSocket.close();
            }
            if (this.snapshotInterval) {
                clearInterval(this.snapshotInterval);
            }

            this.snapshotInterval = setInterval(() => this.captureContent(), 1000);

            this.webSocket = new WebSocket(environment.websocket_url + 'articles/' + this.article.id + '/iterations?token=' + this.token);
            this.webSocket.onmessage = function(message) {
                // Handle message
            };

            this.webSocket.onclose = console.error;
            this.webSocket.onerror = console.error;
        }
    }

    /**
     * Captures the current
     */
    captureContent(): void {
        let newContent = this.editor.innerText;

        let firstDifferentPosition = this.findFirstNonMatchingStringPosition(this.lastContentSnapshot, newContent);
        let lastDifferentPosition = this.findFirstNonMatchingStringPosition(this.lastContentSnapshot, newContent);

        if (firstDifferentPosition !== null && lastDifferentPosition !== null) {
            let previousContentLastDifferentPosition = this.lastContentSnapshot.length - lastDifferentPosition;
            let newContentLastDifferentPosition = newContent.length - lastDifferentPosition;

            if (newContent.length >= this.lastContentSnapshot.length) {
                if (firstDifferentPosition == this.lastContentSnapshot.length || firstDifferentPosition >= previousContentLastDifferentPosition) {
                    this.sendUpdateMessage("add", {
                        start_position: firstDifferentPosition,
                        content: newContent.substr(firstDifferentPosition, (firstDifferentPosition + newContent.length - this.lastContentSnapshot.length)),
                    });
                } else {
                    this.sendUpdateMessage("replace", {
                        start_position: firstDifferentPosition,
                        content: newContent.substr(firstDifferentPosition, newContentLastDifferentPosition),
                        length: previousContentLastDifferentPosition - firstDifferentPosition,
                    });
                }
            } else {
                if (firstDifferentPosition >= newContentLastDifferentPosition) {
                    this.sendUpdateMessage("remove", {
                        start_position: firstDifferentPosition,
                        length: this.lastContentSnapshot.length - newContent.length,
                    });
                } else {
                    this.sendUpdateMessage("replace", {
                        start_position: firstDifferentPosition,
                        content: newContent.substr(firstDifferentPosition, newContentLastDifferentPosition),
                        length: previousContentLastDifferentPosition - firstDifferentPosition,
                    });
                }
            }
        }
    }

    /**
     * Sends an update message to the server
     * @param action
     * @param data
     */
    sendUpdateMessage(action, data) {
        data.action = action;
        this.webSocket.send(JSON.stringify(data));
    }

    /**
     * Takes in an array of character arrays in order to build a list of every position where they do not match
     * @param characterArrays
     */
    findNonMatchingCharacterArrayPositions(characterArrays) {
        let positions = [];

        for (let i = 0; i < characterArrays[0].length; i++) {
            if (characterArrays[0][i] != characterArrays[1][i]) {
                positions.push(i);
            }
        }

        return positions;
    }

    /**
     * Finds the first non matching position in an array of character arrays
     * @param characterArrays
     */
    findFirstNonMatchingCharacterArrayPositions(characterArrays) {
        let misMatches = this.findNonMatchingCharacterArrayPositions(characterArrays);

        return misMatches.length > 0 ? misMatches[0] : null;
    }

    /**
     * Finds the first non matching string position between two strings
     * @param stringA
     * @param stringB
     */
    findFirstNonMatchingStringPosition(stringA, stringB) {
        return (stringA.length == 0 || stringB.length == 0) ? 0 :
            this.findFirstNonMatchingCharacterArrayPositions(this.convertStringsToCharArray(stringA, stringB));
    }

    /**
     * Finds the first non matching string position between two strings
     * @param stringA
     * @param stringB
     */
    findLastNonMatchingStringPosition(stringA, stringB) {
        return (stringA.length == 0 || stringB.length == 0) ? 0 :
            this.findFirstNonMatchingCharacterArrayPositions(this.convertStringsToCharArray(stringA, stringB));
    }

    /**
     * Converts two strings into adjacent character arrays
     * @param stringA
     * @param stringB
     */
    convertStringsToCharArray(stringA, stringB) {
        return [
            stringA.split(''),
            stringB.split(''),
        ];
    }
}
