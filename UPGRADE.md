# Athenia Mobile App Upgrade Guide

To upgrade from previous version of Athenia please check each version number listed below step by step.

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
