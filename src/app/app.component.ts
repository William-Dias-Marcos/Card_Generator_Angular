import { Component, ElementRef, ViewChild } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('card', { static: false }) card!: ElementRef;

  selectedFile: File | null = null;
  image: any;

  constructor(private formBuilder : FormBuilder) { }

  profileForm = this.formBuilder.group({
    name: ['', Validators.required],
    profession: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.minLength(8)]],
    color: [''],
    backgroundColor: [''],
    address: this.formBuilder.group({
      city: ['', Validators.required], 
      state: ['', Validators.required]
    })
  });

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      this.selectedFile = inputElement.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.image = (e.target as FileReader).result;
      }
      reader.readAsDataURL(this.selectedFile);
    }
  }

  captureScreen() {
    console.log(this.profileForm.value)
    
    const elemento = this.card.nativeElement;

    if (elemento) {
      html2canvas(elemento).then((canvas) => {
        const imagem = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imagem;
        link.download = 'captura.png';
        link.click();
      });
    } else {
      console.error('Elemento não encontrado');
    }
  }

}
