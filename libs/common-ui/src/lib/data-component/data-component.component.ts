import {
  Component,
  OnInit,
  ViewChild,
  Input,
  AfterViewInit
} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
@Component({
  selector: 'lib-data-component',
  templateUrl: './data-component.component.html',
  styleUrls: ['./data-component.component.scss']
})
export class DataComponentComponent implements OnInit, AfterViewInit {
  clearValue = '';
  @Input() dataList;
  dataSource: MatTableDataSource<any>;

  @Input() columnsList;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [];
  selection = new SelectionModel<any>(true, []);
  constructor() {}

  ngOnInit() {
    if (this.dataList) {
      this.displayedColumns = this.columnsList;
      this.dataSource = new MatTableDataSource(this.dataList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
      console.log(this.dataList);
    }
  }

  ngAfterViewInit() {}

  applyFilter = (filterValue: string) => {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  };

  clearSearch = () => {
    this.clearValue = '';
    this.dataSource.filter = '';
  };

  openMultiDelete = () => {};

  add = () => {};

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    let numRows;
    if (numSelected) {
      numRows = this.dataSource.data.length;
    }
    return numSelected === numRows;
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${
      this.selection.isSelected(row) ? 'deselect' : 'select'
    } row ${row.id + 1}`;
  }
}
