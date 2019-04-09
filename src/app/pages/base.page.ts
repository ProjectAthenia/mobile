import {environment} from '../../environments/environment';

export class BasePage {

    /**
     * Gets the branding name
     */
    getBrandingName(): string {
        return environment.app_name;
    }

    /**
     * Gets the branding image url
     */
    getBrandingImageUrl(): string {
        return environment.branding_image_url;
    }
}