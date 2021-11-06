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

  ngOnInit() {
    this.dataService.getRecordById(this.id).subscribe((res) => {
      this.record = res;
    });
  }

  async updateRecord() {
    this.dataService.updateRecord(this.record);
    const toast = await this.toastCtrl.create({
      message: 'Record updated',
      duration: 1000,
    });
    toast.present();
  }

  async deleteRecord() {
    this.dataService.deleteRecord(this.record);
    this.modalCtrl.dismiss();
  }
}
