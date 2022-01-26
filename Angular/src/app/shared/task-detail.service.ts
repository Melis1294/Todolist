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
      task.id = Number(this.myObj[i].Id);
      task.title = this.myObj[i].Title;
      task.description = this.myObj[i].Description;      
      task.completed = this.myObj[i].Completed;
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
    return this.http.put(`${this.baseURL}/${task.id}`, task);
  }
}
