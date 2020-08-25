# Athenia Mobile App Upgrade Guide

To upgrade from previous version of Athenia please check each version number listed below step by step.

## 0.13.0

This update adds a new component that can insert a notification bubble based on a boolean parameter. This also adds a feature that will inform the user if they have new messages based on a notification bubble on both the hamburger button and the threads button with the menu. Finally, there is also a new environment variable that will toggle all of the social features similar to the organization toggle.

* src/app/components/menu-button-with-notifications/ - New component.
* src/app/components/components.module.ts - New Menu button with notifications component has been registered.
* src/app/components/logged-in-header/logged-in-header.component.html - The ion-menu-button now has the new component within it. The format has also been updated for the current code styles.
* src/app/components/logged-in-header/logged-in-header.component.scss - General code cleanup, as well as the removal of the ion-input special styles, which do not exist in the current version of the template.
* src/app/components/logged-in-header/logged-in-header.component.spec.ts - Updated the test for the new required providers and the additional component in the template
* src/app/components/logged-in-header/logged-in-header.component.ts - Updated for new format, and added functionality to check for unread messages.
* src/app/components/menu/menu.component.html - Added if checks to make sure that social media is enabled on certain navigation items, and updated the messages icon to be the menu button component. 
* src/app/components/menu/menu.component.scss - Added some styling for the new component
* src/app/components/menu/menu.component.spec.ts - Add menu button component to declarations.
* src/app/components/menu/menu.component.ts - Added some logic to determine if the user has unread messages.
* src/app/models/user/thread.ts - Updated for new format, and added function for determining if a user has seen the thread.
* src/app/models/user/thread.spec.ts - Added some tests for the new function
* src/app/pages/profile-editor/profile-editor.page.spec.ts - Added storage provider
* src/app/pages/thread/thread.page.spec.ts - Fixed route snapshot
* src/app/pages/thread/thread.page.ts - Updated page for some new functionality added to the message service, the new thread model function, and removed log point.
* src/app/pages/threads/threads.page.ts - Updated to make sure it deals with the unseen messages observer properly.
* src/app/providers/requests/messaging/messaging.ts - Changed get return type from array to page
* src/app/providers/requests/messaging/messaging.spec.ts - Updated test for return type change
* src/app/services/messaging.service.ts - Added a new observer that can notify the total amount of unseen messages, improved the loadedThreads handling
* src/app/services/messaging.service.spec.ts - Updated nearly all tests for new observables.
* src/environments/environment.prod.ts - Added `social_media_enabled` variable.
* src/environments/environment.ts - Added `social_media_enabled` variable.

## 0.12.0

New menu component! This update is a bit more hands on with a pretty large architectural change to make things easier going forward. To start, copy the following path `src/app/components/menu/`, and then register the new MenuComponent in `src/app/components/components.module.ts`.

Once you have that part done, you now have to integrate the new menu component into the app. To do this complete the following steps.

1. Copy over any customizations you have made to the menu in `src/app/app.component.html` to `src/app/components/menu/menu.component.html`.
    This should then reveal any functions from `src/app/app.component.ts` that also need to be migrated to `src/app/components/menu/menu.component.ts`.
2. Register the `ComponentsModule` in `src/app/app.module.ts`
3. Replace the `ion-list` and it's children in `src/app/app.component.html` with `app-menu`.
4. Update `src/app/app.component.ts` to current version. In most cases all of the customization here was done for the menu, so it should be able to be copied over directly. It is probably still wise to run a git diff when updating it though.
5. Remove `should have menu labels` test from `src/app/app.component.spec.ts`

Once that is done then the following tests have been updated to pass properly.

* src/app/pages/home/home.page.spec.ts
* src/app/pages/organization-dashboard/organization-dashboard.page.spec.ts

## 0.11.0

Nice little one! This updates adds a new base page class that makes it easy to have multiple potential home pages within an application.

* src/app/app.component.ts - The loading of the app has been updated to take the user to the default home page via the storage provider
* src/app/pages/can-be-home.page.ts - New class!
* src/app/pages/home/home.page.ts  - This class now extends the new CanBeHomePage class
* src/app/pages/organization-dashboard/organization-dashboard.page.ts - This class now extends the CanBeHomePage class
* src/app/providers/storage/storage.ts - This class has been updated quite a bit. A new storage variable has been added, and the formatting of the code has been updated to begin an eventual global format change.

## 0.10.0

Some entity stuff! This update adds some initial functions that make managing entity pieces of data simple. To finish the update complete the following steps.

* src/app/models/contracts/ - New Path
* src/app/models/organization/organization.ts - This model now implements the new entity contract created in the last step.
* src/app/models/user/user.ts - This model now implements the new entity contract created in the last step.
* src/app/providers/requests/entity/ - New request group
* src/app/providers/requests/requests.ts - The entity requests have now been registered
* src/app/providers/requests/auth/auth.ts - A couple requests were moved to the new entity group.
* src/app/providers/requests/auth/auth.spec.ts - Some tests have been removed.
* src/app/pages/profile-editor/profile-editor.page.ts - This now uses the new entity requests for a couple calls.
* src/app/pages/subscription/subscription.page.ts - This now uses the new entity requests for a couple calls.

## 0.9.0

Another sizable update! This adds a new ability to allow someone to manage people within the organization. It also adds a number of improvements.

* src/app/app.component.ts - Cached the organization service
* src/app/components/organization-users-management/ - New Component!
* src/app/components/components.module.ts - Registered new organization users management component
* src/app/models/organization/organization-manager.ts - Added new fields, and helper functions
* src/app/models/organization/organization.ts - Added relations
* src/app/models/user/user.ts - Removed log point
* src/app/pages/organization-creation/organization-creation.page.ts - Cached organization properly
* src/app/pages/organization-dashboard/user-management/ - New Page
* src/app/pages/organization-dashboard/organization-dashboard.module.ts - Registered route for tabs
* src/app/pages/organization-dashboard/organization-dashboard.page.html - Added tabs and removed old ion content
* src/app/pages/organization-dashboard/organization-dashboard.page.scss - Added style for ion-tabs
* src/app/pages/organization-dashboard/organization-dashboard.page.spec.ts - Fixed test
* src/app/pages/organization-dashboard/organization-dashboard.page.ts - Completely rebuild for tabs
* src/app/providers/requests/organization/organization.ts - Added functions for dealing with organization managers
* src/app/providers/requests/social/social.ts - Fixed potential bug

## 0.8.0

Another big one! This version adds the organization creation process, and it also fixes a big design flaw with loading the logged in user that has existed in the code base since the beginning. To apply this update complete the following steps.

### User Load Change

The user service is now automatically loading the user off the server in situations where the service does not already have the user cached. This means that the getMe function now returns a promise instead of user|null, which will have a rippling affect through every application. To complete the core update make sure to update the following paths.

* src/app/pages/contacts/contacts.page.ts - The ngOnInit function has been updated for the new me loading.
* src/app/pages/subscription/subscription.page.spec.ts - The storage provider needs to be added to the providers array
* src/app/pages/thread/thread.page.spec.ts - The storage provider needs to be added to the providers array
* src/app/pages/thread/thread.page.ts - The ngOnInit function has been updated for the new me loading.
* src/app/pages/threads/threads.page.ts - The ngOnInit function has been updated for the new me loading.
* src/app/pages/user/user.page.ts - The ngOnInit function has been updated for the new me loading.
* src/app/services/user.service.ts - Added a new meObserver, and rewrote getMe request.
* src/app/services/user.service.spec.ts - Added default provides for now injected services.
* src/environments/environment.ts - Added new organization setting
* src/environments/environment.prod.ts - Updated for proper environment settings

### Organization Management Feature

Two pages have been added that allow for someone to create organization, as well as a new blank page that can behave as an organization dashboard.

* src/app/app-routing.module.ts - Registered new routes for the newly created pages
* src/app/models/organization/ - New path
* src/app/models/user/role.ts - New roles declared
* src/app/models/user/user.ts - Organization manager relation added
* src/app/pages/organization-creation/ - New Path
* src/app/pages/organization-dashboard/ - New Path
* src/app/providers/requests/auth/auth.ts - The organization me data is now being expanded in the initial information request.
* src/app/providers/requests/organization/ - New Path
* src/app/providers/requests/requests.ts - Organization requests registered
* src/app/providers/requests/requests.spec.ts - Organization requests now tested
* src/app/services/organization.service.spec.ts - New Path
* src/app/services/organization.service.ts - New Path

### Mixed Updates

These files contain changes that require that both of the previous updates to have been completed

* src/app/app.component.html - Links have been added to the organization management areas
* src/app/app.component.spec.ts - The RequestsProvider needs to be added to the provides array
* src/app/app.component.ts - The logged in user is now loaded before we go to the home page, the new me subscriber is now connected, and a number of new organization related functions have been added.

## 0.7.1

Bug fixes! A number of bugs were found that have been fixed now. To apply these fixes, copy over the following files.

* src/app/pages/subscription/subscription.page.html
* src/app/pages/subscription/subscription.page.ts
* src/app/providers/requests/messaging/messaging.ts

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
