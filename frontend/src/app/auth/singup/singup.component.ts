import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent {
  registrationForm!: FormGroup

  constructor(private authService:AuthService,private formbuilder:FormBuilder,private router:Router){
    
    this.registrationForm=this.formbuilder.group({
      userName:['',[Validators.required]],
      userEmail:['',[Validators.required]],
      userPhone:['',[Validators.required]],

      userPassword:['',[Validators.required]]
    }
    )
  }

  getErrorMessage(controlName: string) {
    const control = this.registrationForm.get(controlName);
    return control?.hasError('required') ? 'This field is required' :
      control?.hasError('email') ? 'Not a valid email' :
        '';
  }
  
  registerUser(){
    if (this.registrationForm.valid) {
      let registeredUser = this.registrationForm.value;
      this.authService.registerUser(registeredUser);
      this.router.navigate(['login']);
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }

}
