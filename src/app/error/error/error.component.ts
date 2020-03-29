import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:{message:string}) { }
  message ='An Unknon error Occurred';
  ngOnInit() {
  }

}
