import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {
  constructor() {}
  @Input() dataList: any[];
  @Input() title: any;
  @Output() closePrint: EventEmitter<any> = new EventEmitter();

  displayedColumns = [];
  ngOnInit() {
    this.displayedColumns = Object.keys(this.dataList[0]);
    setTimeout(() => {
      (<HTMLInputElement>document.getElementById('mySidenav')).style.display =
        'none';
      (<HTMLInputElement>document.getElementById('myNavHeader')).style.display =
        'none';
      window.print();
      this.callEmit();
      // return window.location.reload(true);
    }, 100);
  }

  callEmit() {
    (<HTMLInputElement>document.getElementById('mySidenav')).style.display =
      'block';
    (<HTMLInputElement>document.getElementById('myNavHeader')).style.display =
      'flex';
    this.closePrint.emit(true);
  }

  rmUnderScrore(str) {
    const string = str.split('_');
    for (let i = 0; i < string.length; i++) {
      string[i] = string[i].charAt(0).toUpperCase() + string[i].slice(1);
    }
    return string.join(' ');
  }
}
