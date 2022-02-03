import { Component, OnInit } from '@angular/core';
import { TaskDetailService } from 'src/app/shared/task-detail.service';
import { NgForm } from '@angular/forms';
import { TaskDetail } from 'src/app/shared/task-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-detail-form',
  templateUrl: './task-detail-form.component.html',
  styles: [
  ]
})
export class TaskDetailFormComponent implements OnInit {

  // dependency injection
  constructor(
    public service:TaskDetailService,
    private toastr:ToastrService) { }

    ngOnInit(): void {      
    }

  onSubmit(form: NgForm)
  {
    console.log(`service id: ${this.service.formData.id} and completed: ${this.service.formData.completed}`);
    if(this.service.formData.id == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);    
  }

  insertRecord(form: NgForm)
  {
    this.service.postTaskDetail().subscribe( 
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Created successfully', 'Task');
      },
      err => {console.log(err);}
    );
  }  

  updateRecord(form: NgForm)
  {
    this.service.putTaskDetail().subscribe( 
      res => {        
        this.service.refreshList();
        this.resetForm(form);
        this.toastr.info('Updated successfully', 'Task');
      },
      err => {console.log(err);}
    );
  }

  resetForm(form: NgForm)
  {
    form.form.reset();
    // preparo una nuova entry per il DB
    this.service.formData = this.service.getBlankTask();
  }

}
