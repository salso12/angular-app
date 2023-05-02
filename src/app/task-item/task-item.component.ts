import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../modul/task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {

  task : Task = {
    name:"",
    completed:false,
    priority:"",
    date:""
  }

  constructor( private route : ActivatedRoute, private taskService : TaskService){}

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.getTask(params['id'])

    })
  }

  getTask(id : number){
    this.taskService.getOneTask(id).subscribe(responce =>{
      this.task = responce
      console.log(responce)
    })
  }
}
