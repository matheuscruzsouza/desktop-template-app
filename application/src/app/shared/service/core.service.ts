import { EventEmitter, Injectable } from '@angular/core';

declare const Neutralino: any;
declare const NL_PATH: string;

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  public ready = new EventEmitter();
  public window = {
    closed: new EventEmitter(),
  }
  public trayMenu = {
    itemClicked: new EventEmitter(),
  }

  constructor() {
    Neutralino.init();

    Neutralino.events.on("ready", () => {
      this.ready.emit();
    });

    Neutralino.events.on("trayMenuItemClicked", (event: any) => {
      this.trayMenu.itemClicked.emit(event);
    });

    Neutralino.events.on("windowClose", () => {
      this.window.closed.emit();
    });


  }
}
