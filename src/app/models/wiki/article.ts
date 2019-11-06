import {BaseModel} from '../base-model';

/**
 * Used as a data wrapper for our article model
 */
export class Article extends BaseModel {

    /**
     * The title of the article
     */
    title: string;

    /**
     * All content of the article in markdown
     */
    content: string;
}