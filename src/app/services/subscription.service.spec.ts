import { TestBed } from '@angular/core/testing';

import RequestsProviderMock from '../providers/requests/requests.mock';
import {SubscriptionService} from './subscription.service';
import {User} from '../models/user/user';
import {MembershipPlan} from '../models/subscription/membership-plan';

describe('SubscriptionService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: SubscriptionService = new SubscriptionService(
            new RequestsProviderMock(),
        );
        expect(service).toBeTruthy();
    });

    it('hasFeatureAccess should return true when member is currently subscribed with proper subscription', async () => {
        const service: SubscriptionService = new SubscriptionService(
            new RequestsProviderMock(),
        );

        const user = new User({
            subscriptions: [
                {
                    expires_at: null,
                    membership_plan_rate: {
                        membership_plan: {
                            features: [
                                {
                                    id: 2342,
                                }
                            ]
                        }
                    }
                }
            ]
        });

        expect(await service.hasFeatureAccess(user, 2342)).toBeTruthy();
    });

    it('hasFeatureAccess should return false when member is currently subscribed with improper subscription', async () => {
        const service: SubscriptionService = new SubscriptionService(
            new RequestsProviderMock(),
        );

        const user = new User({
            subscriptions: [
                {
                    expires_at: null,
                    membership_plan_rate: {
                        membership_plan: {
                            features: [
                                {
                                    id: 435,
                                }
                            ]
                        }
                    }
                }
            ]
        });

        expect(await service.hasFeatureAccess(user, 2342)).toBeFalsy();
    });

    it('hasFeatureAccess should return false when default membership plan does not exist', async () => {
        let requests = new RequestsProviderMock();
        const service: SubscriptionService = new SubscriptionService(
            requests,
        );

        const user = new User({
            subscriptions: []
        });

        spyOn(requests.subscriptions, 'fetchMembershipPlans').and.returnValue(Promise.resolve([
            new MembershipPlan({
                default: false,
                features: []
            })
        ]))

        expect(await service.hasFeatureAccess(user, 2342)).toBeFalsy();
    });

    it('hasFeatureAccess should return false when default membership plan does not contain feature', async () => {
        let requests = new RequestsProviderMock();
        const service: SubscriptionService = new SubscriptionService(
            requests,
        );

        const user = new User({
            subscriptions: []
        });

        spyOn(requests.subscriptions, 'fetchMembershipPlans').and.returnValue(Promise.resolve([
            new MembershipPlan({
                default: true,
                features: [
                    {
                        id: 3453,
                    }
                ]
            })
        ]))

        expect(await service.hasFeatureAccess(user, 2342)).toBeFalsy();
    });

    it('hasFeatureAccess should return true when default membership plan contains feature', async () => {
        let requests = new RequestsProviderMock();
        const service: SubscriptionService = new SubscriptionService(
            requests,
        );

        const user = new User({
            subscriptions: []
        });

        spyOn(requests.subscriptions, 'fetchMembershipPlans').and.returnValue(Promise.resolve([
            new MembershipPlan({
                default: true,
                features: [
                    {
                        id: 3453,
                    }
                ]
            })
        ]))

        expect(await service.hasFeatureAccess(user, 3453)).toBeTruthy();
    });
});
