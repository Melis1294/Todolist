import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
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
    // Sweet Alert 2 Modal
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // delete action
        this.service.deleteTaskDetail(id)
        .subscribe(
          response => { 
            this.service.refreshList();
            this.toastr.error("Deleted successfully", "Task");
          }
        );

        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })      
  }
}
