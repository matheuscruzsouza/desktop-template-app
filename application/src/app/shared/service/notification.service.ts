import { Injectable } from '@angular/core';

declare const Neutralino: any;
declare const NL_PATH: string;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  async showNotification(text: string, content: string) {
    await Neutralino.os.execCommand(`gdbus call --session \
    --dest=org.freedesktop.Notifications \
    --object-path=/org/freedesktop/Notifications \
    --method=org.freedesktop.Notifications.Notify \
    "" 0 '${NL_PATH}/wallpaper-changer.png' '${text}' '${content}' \
    '[]' '{"urgency": <1>}' 5000`, { background: true });
  }
}
