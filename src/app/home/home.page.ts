import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { DataService } from '../services/data.service';
import Record from '../models/record';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  records: Record[];

  constructor(
    private dataservice: DataService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.dataservice.getRecords().subscribe((res) => {
      this.records = res;
    });
  }

  async openRecord(record: Record) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: { id: record.id },
      cssClass: 'setting-modal',
    });
    modal.present();
  }

  async addRecord() {
    const alert = await this.alertCtrl.create({
      cssClass: 'add-record-alert',
      header: 'Add Record',
      inputs: [
        {
          name: 'title',
          placeholder: 'Enter title...',
          type: 'text',
        },
        {
          name: 'text',
          placeholder: 'Enter text...',
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
