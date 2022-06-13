import { Injectable } from '@angular/core';

declare const Neutralino: any;
declare const NL_PATH: string;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  async showNotification(title: string, content: string, icon: string = "base-app.png", time: string = "5000") {
    await Neutralino.os.execCommand(`gdbus call --session \
    --dest=org.freedesktop.Notifications \
    --object-path=/org/freedesktop/Notifications \
    --method=org.freedesktop.Notifications.Notify \
    "" 0 '${NL_PATH}/${icon}' '${title}' '${content}' \
    '[]' '{"urgency": <1>}' ${time}`, { background: true });
  }
}
