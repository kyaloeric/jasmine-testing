import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
resetPasswordForm!: FormGroup

constructor(private formBuilder:FormBuilder, private userService: UserService){
  this.resetPasswordForm=this.formBuilder.group({
    userEmail:['',[Validators.required]],
    resetToken:['',[Validators.required]],
    newPassword:['',[Validators.required]]
  })
}

resetPassword(){
  if(this.resetPasswordForm.valid){
    const resetPassword=this.resetPasswordForm.value
    console.log(resetPassword);
    
    this.userService.resetPassword(resetPassword)

  }else{
    this.resetPasswordForm.markAllAsTouched()
  }
}
}