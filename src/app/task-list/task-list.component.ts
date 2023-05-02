import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Task } from '../modul/task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit{

  constructor( private taskService : TaskService){}

  taskss : Task[]=[]
  searchTearm : any = ""
  task : Task ={
    name:"",
    completed:false,
    priority:"",
    date:""
  }
  noTasks: boolean = true;
  ngOnInit() {
    this.getAllTasks();

    console.log(this.filteredTasks)
  }

  getAllTasks(){
    this.taskService.getTasks().subscribe((res =>{
      this.taskss = res;
      this.filteredTasks = this.taskss;
      console.log(res)
    }))
  }
  deleteTask(id : any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.deleteTask(id).subscribe(()=>{
          this.filteredTasks = this.taskss.filter((item)=>{
            return item.id!== id
          })
        })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })

  }


  // Define a variable to store the filtered tasks
  filteredTasks: Task[] = [];

  // Method to filter the tasks based on the search query
  onSearch(query: string) {
    if (query) {
      // Filter the tasks based on the search query
      this.filteredTasks = this.taskss.filter(task => task.name.toLowerCase().includes(query.toLowerCase()));
    } else {
      // If the search query is empty, show all tasks
      this.filteredTasks = this.taskss;
    }
  }
}
