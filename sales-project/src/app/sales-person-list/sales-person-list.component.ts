import { Component, OnInit } from '@angular/core';
import { SalesPerson } from './sales-person';

@Component({
  selector: 'app-sales-person-list',
  templateUrl: './sales-person-list-bootstrap.component.html',
  styleUrls: ['./sales-person-list.component.css']
})
export class SalesPersonListComponent implements OnInit {

  salesPersonList: SalesPerson[] = [
    new SalesPerson("Seho", "Chung", "seho.chung@Hcl.com", 50000),
    new SalesPerson("Suzi", "Chung", "suzi.chung@Hcl.com", 30000),
    new SalesPerson("Angular", "Java", "angular.java@Hcl.com", 44000),
    new SalesPerson("Python", "TypeScript", "Python.TS@Hcl.com", 67000),

  ];
  constructor() { }

  ngOnInit(): void {
  }

}
