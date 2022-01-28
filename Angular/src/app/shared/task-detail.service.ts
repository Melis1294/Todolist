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
  formData: TaskDetail = new TaskDetail(0, '', '', false);  
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
    this.myList = <TaskDetail[]>this.myObj;
    let length : number = this.myList.length;
    this.myList = [];
    for (let i = 0; i < length; i++)
    {       
      let task = new TaskDetail (        
        Number(this.myObj[i].id),
        this.myObj[i].title,
        this.myObj[i].description, 
        this.myObj[i].completed);
      this.myList.push(task);
    } 
    console.log(this.myList); 
    });
  }

  deleteTaskDetail(id:number)
  {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  putTaskDetail()
  { 
    console.log(`This service id: ${this.formData.id} and This completed: ${this.formData.completed}`);       
    return this.http.put(`${this.baseURL}/${this.formData.id}`, this.formData);
  }

  checkTaskDetail(id : number, task : TaskDetail)
  {
    return this.http.put(`${this.baseURL}/${id}`, task);
  }
}
