# Athenia Mobile App Upgrade Guide

To upgrade from previous version of Athenia please check each version number listed below step by step.

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
