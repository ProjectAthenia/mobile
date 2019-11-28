import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
     * The article the user is editing
     */
    @Input()
    article: Article = null;

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

            if (this.webSocket) {
                this.webSocket.close();
            }

            this.webSocket = new WebSocket(environment.websocket_url + 'articles/' + this.article.id + '/iterations?token=' + this.token);
            this.webSocket.onmessage = function(message) {
                // Handle message
            };

            this.webSocket.onclose = console.error;
            this.webSocket.onerror = console.error;
        }
    }
}
