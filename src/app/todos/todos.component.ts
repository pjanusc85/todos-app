import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {TodosElement, TodosService} from "./todos.service";
import {MatSort} from "@angular/material/sort";

const ELEMENT_DATA: TodosElement[] = [];

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  displayedColumns: string[] = ['completed', 'id', 'title', 'userId'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  userIds: any;

  totalTasks: number = 0;
  tasksCompleted: number = 0;

  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(private todosService: TodosService) { }

  ngOnInit(): void {
    this.todosService.getAll().subscribe((response) => {
      this.dataSource  = new MatTableDataSource(response);
      this.userIds = response.map(item => item.userId)
        .filter((value, index, self) => self.indexOf(value) === index);
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = ((data, string) => {
        if (string) {
          return data.userId === Number.parseFloat(string);
        } else return true;
      });

      this.totalTasks = response.length;
      this.tasksCompleted = response.filter(item => item.completed).length;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateTask() {
    this.tasksCompleted = this.dataSource.data.filter(item => item.completed).length;
  }

}
