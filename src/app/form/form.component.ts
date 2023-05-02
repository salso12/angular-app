import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Task } from '../modul/task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor( private taskService : TaskService, private router: Router,private route: ActivatedRoute, private formBuilder: FormBuilder)  {
  }
  ListTask : Task[]=[];
  Tasks : Task[]=[]

  newTask : Task = {
    name: '',
    priority: '',
    completed: false,
    date: ""
  }

  initTask(){
    this.newTask = {
      name: '',
    priority: '',
    completed: false,
    date:""
    }
  }
  categories: any[] = [];


    addTask(){
      let {name,completed,priority,date} = this.taskForm.value;

      // Convert the date to the expected format
      const formattedDate = new Date(date).toISOString().slice(0, 10);

      this.taskService.percictTasks( {name,completed,priority,date: formattedDate} ).subscribe((responce)=>{
        this.ListTask = [ ...this.ListTask,responce]
        // this.initTask()
        this.router.navigate(['/task-list']);
      })
    }

  taskForm = new FormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    completed: new UntypedFormControl('', [Validators.required]),
    priority: new UntypedFormControl('', [Validators.required]),
    date: new UntypedFormControl('', [Validators.required]),
  });

  taskId!: number | undefined;

  ngOnInit(): void {
    this.getTasks();
    const id = this.route.snapshot.paramMap.get('id');
    this.taskId = id ? +id.valueOf() : undefined;

    // this.taskService.getOneTask(this.taskId || 0).subscribe(task => {
    //   this.newTask = task;
    //   this.taskForm.setValue({
    //     name: this.newTask.name,
    //     completed: this.newTask.completed,
    //     priority: this.newTask.priority,
    //     date: undefined
    //   });
    // });

    this.taskService.getOneTask(this.taskId || 0).subscribe(task => {
      // Set the form fields to the values of the fetched task
      this.taskForm.setValue({
        name: task.name,
        completed: task.completed,
        priority: task.priority,
        date: task.date
      });
    });

  }
  // getFilms(){
  //   this.filmService.getFilms().subscribe((responce : any) =>{
  //     console.log(responce)
  //     this.Listfilms =this.Films = responce;
  //   })
  // }
  getTasks() {
    this.taskService.getTasks().subscribe((response) => {
    this.ListTask = response;
    });
  }
  editTaskId: any;
  isEditMode = false;
  onEditTask(task: Task) {
    this.isEditMode = true;
    this.taskForm.setValue({
      name: task.name,
      completed: task.completed,
      priority: task.priority,
      date: task.date.toString().slice(0, 10)
    });
    this.editTaskId = task.id;
  }
  // updateTask() {
  //   const updatedTask: Task = {
  //     id: this.taskId,
  //     name: this.taskForm.get('name')?.value ?? '',
  //     completed: this.taskForm.get('completed')?.value ?? false,
  //     priority: this.taskForm.get('priority')?.value ?? '',
  //     date: this.taskForm.get('date')?.value ?? ''
  //   };

  //   // Find the index of the updated task in the ListTask array
  //   const index = this.Tasks.findIndex(task => task.id === this.taskId);

  //   this.taskService.putTask(this.taskId, updatedTask).subscribe((response) => {
  //     // Replace the existing task with the updated one
  //     this.Tasks[index] = updatedTask;
  //     this.router.navigate(['/task-list']);
  //   });
  // }
  updateTask() {
    const { name, completed, priority, date } = this.taskForm.value;
    const isoDate = new Date(date).toISOString(); // convert the date to the required format

    this.taskService.putTask(this.taskId, { name, completed, priority, date: isoDate }).subscribe((response: any) => {
      const index = this.ListTask.findIndex(task => task.id === this.taskId);
      this.ListTask[index] = response;
      this.router.navigate(['/task-list']);
    });
  }




  onSubmit() {
    if (this.isEditMode) {
      this.updateTask();
    } else {
      this.addTask();
    }
    this.taskForm.reset();
    this.isEditMode = false;
  }



}
