import { Component } from '@angular/core';
import { TrayMenuService } from './shared/service/tray-menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'application';

  constructor(private trayMenuService: TrayMenuService){}

}
