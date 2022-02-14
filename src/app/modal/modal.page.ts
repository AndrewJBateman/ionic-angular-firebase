import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import Record from '../models/record';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() id: string;
  record: Record = null;

  constructor(
    private dataService: DataService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {}

  // during init fetch record details using Input id.
  ngOnInit() {
    this.dataService.getRecordById(this.id).subscribe((res) => {
      this.record = res;
    });
  }

  async updateRecord() {
    await this.dataService.updateRecord(this.record, this.id);
    this.raiseToast('Record updated');
  }

  async deleteRecord() {
    await this.dataService.deleteRecord(this.id);
    this.raiseToast('Record deleted');
  }

  async cancelAndReturn() {
    this.raiseToast('Return to List');
  }

  raiseToast(message: string) {
    this.modalCtrl.dismiss();
    this.toastCtrl.create({
      message,
      position: 'middle',
      cssClass: 'toast-custom-class',
      duration: 500,
    }).then((toast) => {
      toast.present();
    });

  }
}
