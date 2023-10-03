import { Component } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private formBuilder : FormBuilder) { }

  profileForm = this.formBuilder.group({
    name: ['', Validators.required],
    profession: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.minLength(8)]],
    address: this.formBuilder.group({
      city: ['', Validators.required], 
      state: ['', Validators.required]
    })
  });

  submitForm(){
    console.log(this.profileForm.value)
  }

      // html2canvas().then(canvas => {
      //   const downloadLink = document.createElement('a') as HTMLAnchorElement;
      //   downloadLink.href = canvas.toDataURL('image/png');
      //   downloadLink.download = 'minha-imagem.png';
      //   downloadLink.click();
      // });

}
