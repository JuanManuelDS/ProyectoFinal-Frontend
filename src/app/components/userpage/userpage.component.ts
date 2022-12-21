import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {
  username = localStorage.getItem('nombreUsuario');
  mismatch: boolean = false;
  passSetted: boolean = false;

  constructor(private fb: FormBuilder, private authServ: AuthService) { }

  passwordForm: FormGroup = this.fb.group({
    newPassword: '',
    newPasswordRepeat: ''
  });

  ngOnInit() {
  }

  setNewPassword(){
    let p1 = this.passwordForm.controls['newPassword'].value;
    let p2 = this.passwordForm.controls['newPasswordRepeat'].value;

    if(p1.match(p2) && p1 != '' && p2 != '' && p1.length >= 6 && p2.length >= 6){
      this.mismatch = false;
      this.authServ.setPassword(p1);
      this.passwordForm.reset();
      this.passSetted = true;
    }else{
      this.mismatch = true;
    }
  }
}
