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
  formData: TaskDetail = this.getBlankTask();
  public myList : Array<TaskDetail>

  getBlankTask(): TaskDetail{
    return {id: 0, title: '', description: '', completed: false};
  }
  // create a POST request
  // to post a new json (table value) in the DB
    // returns an Observer
  postTaskDetail()
  {    
    return this.http.post(this.baseURL, this.formData);
  }

  refreshList() {    
    this.http.get<Array<Object>>(this.baseURL).subscribe((resp: Array<Object>)=>{
    this.myList = <TaskDetail[]>resp;
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
