import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-menu-button-with-notifications',
  templateUrl: './menu-button-with-notifications.component.html',
  styleUrls: ['./menu-button-with-notifications.component.scss']
})
export class MenuButtonWithNotificationsComponent {

    /**
     * Whether or not the menu button has notifications currently pending
     */
    @Input()
    hasUnseenNotifications: boolean;

    /**
     * The ion icon name
     */
    @Input()
    name: string;
}
