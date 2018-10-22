import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, fromEvent }    from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-screening',
  templateUrl: './screening.component.html',
  styleUrls: ['./screening.component.css']
})
export class ScreeningComponent implements OnInit {
  showBeginScreeningPrompt = false;

  constructor( private modalService: NgbModal ) { }
  

  ngOnInit() {
  }
  canDeactivate(): boolean | Observable<boolean>{
    console.log('test');
    this.showBeginScreeningPrompt = true;
    let leaveCheck: boolean;
      return leaveCheck = true;

    return of(leaveCheck);
  }
  toggleBeginScreeningPrompt() {
    if (this.showBeginScreeningPrompt) {
      return 'block';
    } else {
      return 'none';
    }
  }

}
