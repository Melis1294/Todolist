import { Injectable } from '@angular/core';
import { TaskDetail } from './task-detail.model';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskDetailService {

  constructor(private http:HttpClient) { }

  private readonly baseURL : string = 'http://localhost:5000/api/TaskDetail';
  // name : type
  formData: TaskDetail = new TaskDetail();  
  public myList : TaskDetail[];
  public myObj : any;

  // create a POST request
  // to post a new json (table value) in the DB
    // returns an Observer
  postTaskDetail()
  {    
    return this.http.post(this.baseURL, this.formData);
  }

  refreshList() {
    this.http.get(this.baseURL).subscribe((resp)=>{
    this.myObj = resp;
    this.myList = <TaskDetail[]>resp;
    console.log("Home", this.myList); 
    let length : number = this.myList.length;
    this.myList = [];
    for (let i = 0; i < length; i++)
    {
      let task = new TaskDetail();
      task.id = Number(this.myObj[i].id);       
      //console.log(task.id);
      task.title = this.myObj[i].title;
      //console.log(task.title);
      task.description = this.myObj[i].description;   
      //console.log(task.description);   
      task.completed = this.myObj[i].taskCompleted;
      //console.log(task.completed);
      //console.log(this.myObj[i].shortDescription);
      this.myList.push(task);
    } 
    });
  }

  deleteTaskDetail(id:number)
  {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  putTaskDetail()
  {        
    return this.http.put(`${this.baseURL}/${this.formData.id}`, this.formData);
  }

  checkTaskDetail(task : TaskDetail)
  {
    console.log("doing check on http PUT...", task.id);
    console.log(`ID: ${task.id}; Task: ${task.title}; Completed: ${task.completed}`);
    return this.http.put(`${this.baseURL}/${task.id}`, task);
  }
}
