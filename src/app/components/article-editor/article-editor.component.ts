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
            this.webSocket.onmessage = (message) => {
                this.editor.innerHtml = this.mergeContent(message.data);
                this.lastContentSnapshot = message.data;
            };

            this.webSocket.onclose = console.error;
            this.webSocket.onerror = console.error;
        }
    }

    /**
     * Merges the content together properly
     * @param remoteContent
     */
    mergeContent(remoteContent): String {
        let localContent = this.editor.innerText;
        if (this.lastContentSnapshot == localContent) {
            return remoteContent;
        } else {
            let remoteAction = this.getContentActionType(this.lastContentSnapshot, remoteContent);
            let localAction = this.getContentActionType(this.lastContentSnapshot, remoteContent);

            if (remoteAction && localAction) {

                if (remoteAction.start_position >= localAction.start_position) {
                    return this.applyAction(localAction, this.applyAction(remoteAction, this.lastContentSnapshot));
                } else {
                    return this.applyAction(remoteAction, this.applyAction(localAction, this.lastContentSnapshot));
                }

            } else if (remoteAction && !localAction) {
                return remoteContent;
            } else if (!remoteAction && localAction) {
                return localContent;
            } else {
                return this.lastContentSnapshot;
            }
        }
    }

    /**
     * Captures the current content
     */
    captureContent(): void {
        let action = this.getContentActionType(this.lastContentSnapshot, this.editor.innerText);

        if (action) {
            this.webSocket.send(JSON.stringify(action));
        }

        this.lastContentSnapshot = this.editor.innerText;
    }

    /**
     * Gets the content action if there is one
     */
    getContentActionType(previousContent, newContent): any {

        let firstDifferentPosition = this.findFirstNonMatchingStringPosition(previousContent, newContent);
        let lastDifferentPosition = this.findFirstNonMatchingStringPosition(previousContent, newContent);

        if (firstDifferentPosition !== null && lastDifferentPosition !== null) {
            let previousContentLastDifferentPosition = previousContent.length - lastDifferentPosition;
            let newContentLastDifferentPosition = newContent.length - lastDifferentPosition;

            if (newContent.length >= previousContent.length) {
                if (firstDifferentPosition == previousContent.length || firstDifferentPosition >= previousContentLastDifferentPosition) {
                    return {
                        action: "add",
                        start_position: firstDifferentPosition,
                        content: newContent.substr(firstDifferentPosition, (firstDifferentPosition + newContent.length - previousContent.length)),
                    };
                } else {
                    return {
                        action: "replace",
                        start_position: firstDifferentPosition,
                        content: newContent.substr(firstDifferentPosition, newContentLastDifferentPosition),
                        length: previousContentLastDifferentPosition - firstDifferentPosition,
                    };
                }
            } else {
                if (firstDifferentPosition >= newContentLastDifferentPosition) {
                    return {
                        action: "remove",
                        start_position: firstDifferentPosition,
                        length: previousContent.length - newContent.length,
                    };
                } else {
                    return {
                        action: "replace",
                        start_position: firstDifferentPosition,
                        content: newContent.substr(firstDifferentPosition, newContentLastDifferentPosition),
                        length: previousContentLastDifferentPosition - firstDifferentPosition,
                    };
                }
            }
        }
    }

    /**
     * Applies the action to the passed in content
     * @param action
     * @param inputString
     */
    applyAction(action, inputString): string {
        switch (action.action) {
            case "add":
                return inputString.substr(0, action.start_position) + action.content + inputString.substr(action.start_position, inputString.length);

            case "remove":
                return inputString.substr(0, action.start_position) + inputString.substr(action.start_position + action.length, inputString.length);

            case "replace":
                return inputString.substr(0, action.start_position) + action.content + inputString.substr(action.start_position + action.length, inputString.length);
        }
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
