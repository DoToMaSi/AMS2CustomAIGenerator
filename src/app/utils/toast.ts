import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})

export class ToastUtils {

  constructor(private toastCtrl: ToastController) {}

  private async displayToast(msg: string, color: "danger" | "dark" | "light" | "medium" | "primary" | "secondary" | "success" | "tertiary" | "warning" | string & Record<never, never> | undefined = '') {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: (msg.length * 60),
      position: 'bottom',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            toast.dismiss();
          }
        }
      ],
      keyboardClose: true,
      color
    })

    toast.present();
  }

  public show(msg: string) {
    this.displayToast(msg);
  }

  public success(msg: string) {
    this.displayToast(msg, 'success');
  }

  public error(msg: string) {
    this.displayToast(msg, 'danger');
  }
}
