import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-transfer-fund',
  templateUrl: './transfer-fund.component.html',
  styleUrls: ['./transfer-fund.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferFundComponent implements OnInit {
  transferFundForm: FormGroup;
  @Output() onCreateTransfer= new EventEmitter;
  
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm();
  }

 createForm() {
    this.transferFundForm = new FormGroup({
      amount: new FormControl('', Validators.required),
    });
  }

  onTransfer(){
    this.onCreateTransfer.emit(this.transferFundForm.value.amount)
    this.transferFundForm.reset(); 
    this.router.navigateByUrl('');
  }

}
