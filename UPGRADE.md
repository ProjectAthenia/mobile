# Athenia Mobile App Upgrade Guide

To upgrade from previous version of Athenia please check each version number listed below step by step.

## 0.7.0

Big update time! This update brings us up to date with ionic 5, and also adds profile image capture functionality to the profile editor. To start off make sure to update the dependencies in package.json, and also add the camera native plugin. Then update the following paths.

* src/app/app.component.html - Lots of little updates needed for ionic 5 changes
* src/app/app.component.spec.ts - Lots of updates for the removal of the events ionic module.
* src/app/app.component.ts - The events provider has been replaced with our auth service.
* src/app/app.module.ts - The camera plugin has been registered, and the auth manager was removed from this class.
* src/app/models/page.spec.ts - Fixed class type.
* src/app/models/user/user.ts - Added profile_image_url variable
* src/app/pages/contacts/contacts.page.html - Fixed some ionic 5 changes
* src/app/pages/home/home.page.html - Fixed ionic 5 padding
* src/app/pages/profile-editor/profile-editor.page.html - Fixed ionic 5 padding, and added a profile image ui component.
* src/app/pages/profile-editor/profile-editor.page.scss - Added style for profile image editor.
* src/app/pages/profile-editor/profile-editor.page.spec.ts - Updated test for profile image.
* src/app/pages/profile-editor/profile-editor.page.ts - Added image upload functions.
* src/app/pages/sign-in/sign-in.page.html - Fixed ionic 5 padding
* src/app/pages/sign-up/sign-up.page.html - Fixed ionic 5 padding
* src/app/pages/subscription/subscription.page.html - Fixed ionic 5 padding
* src/app/pages/thread/thread.page.html - Removed ad, and fixed padding class
* src/app/pages/threads/threads.page.html - Removed ad, and fixed padding class.
* src/app/pages/user/user.page.html - Removed ad, fixed padding class, and updated icon for ionic 5
* src/app/providers/auth-manager/ - Removed in favor of service
* src/app/providers/request-handler/request-handler.mock.ts - Update for new parameters to constructor
* src/app/providers/request-handler/request-handler.spec.ts - Updated for new structure
* src/app/providers/request-handler/request-handler.ts - Replaced the old auth manager with the new one, and 
* src/app/providers/requests/auth/auth.spec.ts - Added a new test for uploading a profile image
* src/app/providers/requests/auth/auth.ts - Added a new request for uploading a profile image
* src/app/services/auth-manager/ - Moved from providers, and improved greatly
* test-config/mocks-ionic.ts - Removed the events mock

## 0.6.0 

This version fixes one bug, and simply adds a few new models to make use of. The bug fix is in the file `src/app/pages/profile-editor/profile-editor.page.ts`. The line `duration: 1000,` was added after line #102. The new models are as follows.

* src/app/models/asset.spec.ts
* src/app/models/asset.ts
* src/app/models/page.spec.ts
* src/app/models/page.ts
* src/app/models/user/role.spec.ts
* src/app/models/user/role.ts

## 0.5.1

This version fixes a very annoying bug in the sign in process. To apply this fix then simply copy over the line of the sign up html, and sign in html page that allows someone to toggle between the two pages. Then add `span.link,` before the `a` selector in the scss for both of those pages.

## 0.5.0

This version fixes a pretty major issue with the article editor component, and adds some functionality to the request handler. To make this changes simply copy over the following files.

* src/app/components/article-editor/article-editor.component.html
* src/app/components/article-editor/article-editor.component.ts
* src/app/providers/request-handler/request-handler.ts

## 0.4.0

This version adds a number of new pages as well as a new component that allows the user to edit content. This also follows a major upgrade to the core dependencies. To start off simply review the packages json, and update all dependencies to the most recent version. There are also a number of new dependencies that need to be added for cordova plugins. Then we can start with the social media features.

### Social Media Pages

Start off by copying over the following files.

* src/app/models/user/contact.spec.ts
* src/app/models/user/contact.ts
* src/app/models/user/message.spec.ts
* src/app/models/user/message.ts
* src/app/models/user/thread.spec.ts
* src/app/models/user/thread.ts
* src/app/pages/contacts/
* src/app/pages/thread/
* src/app/pages/threads/
* src/app/pages/user/
* src/app/providers/requests/messaging/
* src/app/providers/requests/social/
* src/app/services/messaging.service.spec.ts
* src/app/services/messaging.service.ts
* src/assets/profile-image-placeholder.png

Then you need to update the user model to have some new fields related to the social media features. You are also going to want to update the athenia routes for the new pages, the main app component for the new links, and the main app module in order to initiate the new dependencies. Then you will need to update the profile editor html, and typescript file to allow the user to edit the new user fields. The requests provider will also need to be modified to register all of the new requests files. Finally update the user service to allow the caching of contacts.

### Content Editor Component and Viewer Update

This is a much simpler update. To run this update simply copy over the directory `src/app/components/article-editor/`, and `src/app/components/article-viewer/`. Then register the component in the component module.

## 0.3.0

This version adds a new article model, and it also upgrades everything to the most recent version of angular, ionic, and jasmine.

### Article Model

Simply copy over the contents of the `src/app/models/wiki/` directory to complete this change.

### Dependency Upgrades

To run this update, start by copying over all dependencies from the package.json file. Once you are done with that, check your own dependencies to make sure they are up to date. Then copy over these files to complete the update.

* src/app/components/logged-in-header/logged-in-header.component.spec.ts
* src/app/components/logged-in-header/logged-in-header.component.ts
* src/app/models/payment/payment-method.spec.ts 
* src/app/models/relation.spec.ts
* src/app/models/subscription/membership-plan-rate.spec.ts
* src/app/models/subscription/membership-plan.spec.ts 
* src/app/models/subscription/subscription.spec.ts 
* src/app/models/user/user.spec.ts
* src/app/pages/subscription/subscription.page.ts
* src/app/providers/array-helpers/array-helpers.spec.ts 
* src/app/providers/storage/storage.spec.ts
* test-config/mocks-ionic.ts

Make sure to check your project for calls to `@ViewChild`, as that now requires a second paramter like so `{static: false}`. Then check your tests to see if there is a reference comment on the top of any of them, especially models. These reference now break tests, so they will all need to be removed.
