import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { DataService } from '../services/data.service';
import Record from '../models/record';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  records = [];
  constructor(
    private dataservice: DataService,
    private alertCtrl: AlertController,
    private modelCtrl: ModalController
  ) {
    this.dataservice.getRecords().subscribe((res) => {
      console.log(res);
      this.records = res;
    });
  }

  async openRecord(record: Record) {
    const modal = await this.modelCtrl.create({
      component: ModalPage,
      componentProps: { id: record.id },
      cssClass: 'setting-modal',
      // breakpoints: [0, 0.5, 0.8],
      // initialBreakpoints: 0.5,
    });
    modal.present();
  }

  async addRecord() {
    const alert = await this.alertCtrl.create({
      header: 'Add Record',
      inputs: [
        {
          name: 'title',
          placeholder: 'Example record',
          type: 'text',
        },
        {
          name: 'text',
          placeholder: 'Example text',
          type: 'textarea',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Add',
          handler: (res) => {
            this.dataservice.addRecord({ title: res.title, text: res.text });
          },
        },
      ],
    });
    await alert.present();
  }
}
