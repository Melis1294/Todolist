import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TaskDetail } from '../shared/task-detail.model';
import { TaskDetailService } from '../shared/task-detail.service';

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

  onCheck($event : any)
  {
    const id = $event.target.value;
    const isChecked = $event.target.checked;
    console.log(id, isChecked);



    const checkedTask = this.service.myList.find(task => task.id == id);

    if (checkedTask != null)
    {
      checkedTask.completed = isChecked;
      console.log(checkedTask?.title, checkedTask?.completed); 
      this.service.checkTaskDetail(id, checkedTask)
      .subscribe(
        response =>
        {
          this.service.refreshList();
          this.toastr.info('Checked successfully', 'Task');
        },
        err => {console.log(err);}
      );      
    }
  }

  // enter in the form the data of the task selected
  populateForm(selectedRecord : TaskDetail)
  {  
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id : number)
  {
    console.log("deleting element at id: ", id);
    alert("Are you sure to delete this task?");
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
