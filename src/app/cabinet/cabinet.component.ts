import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { User } from '../services/service.user';

@Component({
  selector: 'cabinet-component',
  templateUrl: './cabinet.component.html',
  styleUrls: [
     'app/component/cabinet/cabinet.style.css',
     'app/component/cabinet/main.min.css'
  ]
})

export class CabinetComponent implements OnInit {

  constructor(private User: User) {
  }

  ngOnInit() {
  }


}
