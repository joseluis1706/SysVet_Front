import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-pet-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-pet-modal.component.html',
  styleUrl: './add-pet-modal.component.css'
})
export class AddPetModalComponent implements OnInit {
  petForm!: FormGroup;
  step = 1;
  totalSteps = 3;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.petForm = this.fb.group({
      nombre: ['', Validators.required],
      raza: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(0)]],
      tipo: ['', Validators.required],
      color: ['', Validators.required],
      sexo: ['', Validators.required],
    });
  }

  next(): void {
    if (this.step < this.totalSteps) this.step++;
  }

  previous(): void {
    if (this.step > 1) this.step--;
  }

  onSubmit(): void {
    if (this.petForm.valid) {
      console.log('Nueva mascota:', this.petForm.value);
      // Aquí puedes emitir el resultado o llamar a un servicio
    }
  }
}
