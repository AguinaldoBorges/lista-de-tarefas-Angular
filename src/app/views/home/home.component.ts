import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  todoList: any | null | undefined = [];
  @Output() name: string = "";
  @Output() load: boolean = false;

  constructor() { }

  ngOnInit(): void {
    /* localStorage.setItem('lista', JSON.stringify(this.todoList)); */
    console.log(localStorage.getItem('lista'));
    this.todoList = JSON.parse(localStorage.getItem('lista') || '');
    console.log(this.todoList[this.todoList.length - 1]);
  }

  saveList() {
    localStorage.setItem('lista', JSON.stringify(this.todoList));
  }

  setStatus(id: any, status: boolean){
    if(status === false){
      this.updateItem(id, true)
      
    }else{
      this.updateItem(id, false)
      
    }
  }

  // Get
  getList() {
    this.todoList = JSON.parse(localStorage.getItem('lista') || '');
  }

  // Post
  postItem(todoName: string) {
    let newId
    newId = this.todoList.length-1
    if(this.todoList.length < 1){
      newId = 1
    }else if(this.todoList.length === 1){
      newId = 2
    }else{
      newId = this.todoList.length+1
    }
    this.todoList.push(
      {
        id: newId,
        name: todoName,
        status: false,
      }
    );
    this.name = '';
    this.load = true;
    setTimeout(() => { this.saveList() }, 200);
    setTimeout(() => { this.getList(), this.load = false }, 500);
  }

  // Update
  updateItem(id: any, statusItem: boolean) {
    for (let item = 0; item < this.todoList.length; item++) {
      if (parseInt(id) === parseInt(this.todoList[item].id)) {
        this.todoList[item] = {
          id: this.todoList[item].id,
          name: this.todoList[item].name,
          status: statusItem
        }
        this.load = true;
        setTimeout(() => { this.saveList() }, 200);
        setTimeout(() => { this.getList(), this.load = false; }, 500);
      }
    }
  }

  // Delete
  deleteItem(id: any) {
    for (let item = 0; item < this.todoList.length; item++) {
      if (parseInt(id) === parseInt(this.todoList[item].id)) {
        let index = this.todoList.indexOf(id)
        this.todoList.splice(index,1)
        this.load = true;
        setTimeout(() => { this.saveList() }, 200);
        setTimeout(() => { this.getList(), this.load = false; }, 500);
      }
    }
  }


}
