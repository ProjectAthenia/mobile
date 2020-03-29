import {BaseModel} from './base-model';

/**
 * Used as a data wrapper for our conference model
 */
export class Asset extends BaseModel {

    /**
     * The name of the asset
     */
    name: string;

    /**
     * The caption of the asset
     */
    caption: string;

    /**
     * The url of the asset
     */
    url: string;

    /**
     * Determines whether or not this asset is an image
     */
    isImage(): boolean {
        return (this.url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }

    /**
     * Gets the background style for this asset
     */
    getBackgroundStyle(): any {
        return this.isImage() ? {
            backgroundImage: 'url(' + encodeURI(this.url) + ')',
            backgroundSize: 'cover',
        } : {};
    }
}
