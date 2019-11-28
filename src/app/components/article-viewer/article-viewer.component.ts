import {Component, Input} from '@angular/core';
import {Article} from '../../models/wiki/article';

@Component({
    selector: 'article-viewer',
    templateUrl: 'article-viewer.component.html'
})
export class ArticleViewerComponent {

    /**
     * The current article
     */
    @Input() article: Article;
}