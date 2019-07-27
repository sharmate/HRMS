import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'workshop-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  dataList = []
  headers: any = {
    first: '',
    second: '',
    third: ''
  }
  displayedColumns: string[] = ['code', 'name', 'action']

  ngOnInit() {
    this.dataList = this.data.details
    this.headers = this.data.headers
  }

  deleteItem(value) {
    this.dataList = this.dataList.filter(obj => {
      return obj.id != value.id
    })
  }
}
