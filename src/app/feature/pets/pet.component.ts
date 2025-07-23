import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddPetModalComponent } from "./add-pet-modal/add-pet-modal.component";

@Component({
  selector: 'app-pet',
  standalone: true,
  templateUrl: './pet.component.html',
  styleUrl: './pet.component.css',
  imports: [CommonModule, AddPetModalComponent]
})
export class PetComponent {
  pets = [
    {
      nombre: 'Max',
      raza: 'Labrador',
      edad: 5,
      tipo: 'Perro',
      color: 'Negro',
      sexo: 'Macho',
      estado: 'Castrado'
    },
    {
      nombre: 'Luna',
      raza: 'Persa',
      edad: 3,
      tipo: 'Gato',
      color: 'Blanco',
      sexo: 'Hembra',
      estado: 'Esterilizado'
    }
    // Puedes agregar más datos o integrarlo con un servicio.
  ];
}
