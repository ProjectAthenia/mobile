import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Platform } from '@ionic/angular';
import {Article} from '../../models/wiki/article';

@Component({
    selector: 'app-article-editor',
    templateUrl: './article-editor.component.html',
    styleUrls: ['./article-editor.component.scss']
})
export class ArticleEditorComponent implements OnChanges {

    @Input()
    article: Article = null;

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
        if (this.article) {

        }
    }
}
