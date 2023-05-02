import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './modul/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  baseUrl = 'http://localhost:3000/task'

  constructor(private http:HttpClient) { }

  getTasks(){
    return this.http.get<Task[]>(this.baseUrl);
  }

  percictTasks(data : Task){
    return this.http.post<Task>(this.baseUrl,data);
  }

  getOneTask(id: number){
    return this.http.get<Task>(`${this.baseUrl}/${id}`);
  }

  deleteTask(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  putTask(id: number|undefined,data: Task){
    return this.http.put(`${this.baseUrl}/${id}`,data);
  }
}
