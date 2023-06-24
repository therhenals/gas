import { Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { StatusBar } from '@capacitor/status-bar';
import { PushNotifications } from '@capacitor/push-notifications';
import { FCM } from '@capacitor-community/fcm';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() { }

  async ngOnInit() {
    if (Capacitor.isNativePlatform()) {
      StatusBar.setBackgroundColor({
        color: '#5260ff'
      });

      await PushNotifications.requestPermissions();
      await PushNotifications.register();
      await FCM.subscribeTo({ topic: 'all' });
    }
  }
}
