// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    api_url: 'http://dev-api.projectathenia.com/v1/',
    websocket_url: 'ws://dev-socket.projectathenia.com/',
    app_name: 'Project Athenia',
    stripe_publishable_key: 'pk_test_xHnP657roth55lBchLpLg6Af00vfCLYpDk',
    branding_image_url: null,
    forgot_password_url: null,
    sign_up_enabled: true,
    subscriptions_enabled: true,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
