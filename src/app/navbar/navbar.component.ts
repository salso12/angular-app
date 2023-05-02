import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../modul/task';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Output() search = new EventEmitter<string>();

  // Method to handle the input event and emit the search query
  onSearch(event: Event) {
    const query = (event.target as HTMLInputElement)?.value;
    this.search.emit(query);
  }
}
