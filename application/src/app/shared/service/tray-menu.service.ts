import { Injectable } from '@angular/core';

declare const Neutralino: any;
declare const NL_OS: string, NL_MODE: string;

@Injectable({
  providedIn: 'root'
})
export class TrayMenuService {

  private trayMenu = {
    icon: "/resources/assets/icons/trayIcon.png",
    menuItems: [
      { id: "TOGGLE", text: "Toggle visibility", action: () => { this.onSystemToggle() } },
      { id: "SEP", text: "-"  },
      { id: "QUIT", text: "Quit", action: () => { this.onSystemQuit() } },
    ],
  };

  constructor() {
    Neutralino.init();

    Neutralino.events.on("trayMenuItemClicked", (event: any) => {
      this.onTrayMenuItemClicked(event, this.trayMenu.menuItems)
    });
    Neutralino.events.on("windowClose", this.onWindowClose);
    Neutralino.events.on("ready", () => {
      if (NL_OS != "Darwin") {
        this.setTray();
      }
    });
  }

  setTray() {
    if (NL_MODE != "window") {
      console.log("INFO: Tray menu is only available in the window mode.");
      return;
    }

    Neutralino.os.setTray(this.trayMenu);
  }

  onTrayMenuItemClicked(event: any, menuItems: any[]) {
    const key = event.detail.id as string;

    const options = menuItems.filter(item => item.id == key);

    if (options.length > 0 && options[0].action) {
      options[0].action();
    }
  }

  onWindowClose() {
    Neutralino.window.hide();
  }

  onSystemQuit() {
    Neutralino.app.exit();
  }

  onSystemToggle() {
    Neutralino.window.isVisible().then((isVisible: boolean) => {
      isVisible ? Neutralino.window.hide() : Neutralino.window.show();
    });
  }
}
