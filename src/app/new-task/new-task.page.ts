import { ActivatedRoute, Router } from '@angular/router';
import { CurdService } from './../service/curd.service';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})
export class NewTaskPage implements OnInit {
  imgURL: any;
  imagePath: File;
  title: string;
  description: string;


  constructor(
    private curdService: CurdService,
    private route: ActivatedRoute,
    private toastController: ToastController,
    private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.curdService.getTask(id).snapshotChanges().subscribe(task => {
        this.title = task.payload.get("title");
        this.description = task.payload.get("description");
        this.imgURL = task.payload.get("imagePath");
        console.log(task);
      });
    }

  }

  preview(files) {
    if (files.length === 0)
      return;

    var reader = new FileReader();
    this.imagePath = files[0];
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  add() {
    // this.curdService.addTask(this.title, this.description, this.imagePath);
    this.presentToast("Task Added..", "success");
    this.router.navigateByUrl("/task");
  }

  update() {
    // this.curdService.addTask(this.title, this.description, this.imagePath);
    this.presentToast("Task Updated..", "warning");
    this.router.navigateByUrl("/task");
  }

  delete() {
    // this.curdService.addTask(this.title, this.description, this.imagePath);
    this.presentToast("Task Deleted..", "danger");
    this.router.navigateByUrl("/task");
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      color: color,
      message: message,
      duration: 900
    });
    toast.present();
  }

}
