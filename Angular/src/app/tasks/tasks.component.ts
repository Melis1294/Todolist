import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TaskDetail } from '../shared/task-detail.model';
import { TaskDetailService } from '../shared/task-detail.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styles: [
  ]
})
export class TasksComponent implements OnInit {

  constructor(public service: TaskDetailService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  onCheck(selectedRecord : TaskDetail, status : boolean)
  {
    selectedRecord.completed = status;
    this.service.checkTaskDetail(selectedRecord).subscribe( 
      res => {         
        this.service.refreshList();        
        this.toastr.info('Updated successfully', 'Task');
      },
      err => {console.log(err);}
    );
  }

  resetForm(form: NgForm)
  {
    form.form.reset();
    // preparo una nuova entry per il DB
    this.service.formData = new TaskDetail();
  }

  // enter in the form the data of the task selected
  populateForm(selectedRecord : TaskDetail)
  {  
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id : number)
  {
    console.log("deleting element at id: ", id);
    if ("Are you sure to delete this task?")
    {
      this.service.deleteTaskDetail(id)
      .subscribe(
        response => { 
          this.service.refreshList();
          this.toastr.error("Deleted successfully", "Task");
        }
      );
    }
  }
}
