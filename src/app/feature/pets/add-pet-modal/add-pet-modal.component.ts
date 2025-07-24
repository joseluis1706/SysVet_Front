import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PersonaService } from '../../../shared/services/persona/persona.service';
import { MascotaService } from '../../../shared/services/mascota/mascota.service';
import { HistoriaClinicaService } from '../../../shared/services/historia-clinica/historia-clinica.service';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-pet-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-pet-modal.component.html',
  styleUrl: './add-pet-modal.component.css',
})
export class AddPetModalComponent implements OnInit {
  petForm!: FormGroup;
  step = 1;
  totalSteps = 3;

  constructor(
    private fb: FormBuilder,
    private personaService: PersonaService,
    private mascotaService: MascotaService,
    private historiaClinicaService: HistoriaClinicaService
  ) {}

  ngOnInit(): void {
    this.petForm = this.fb.group({
      // Paso 1: Mascota
      nombre: ['', Validators.required],
      raza: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(0)]],
      tipo: ['', Validators.required],
      color: ['', Validators.required],
      sexo: ['', Validators.required],

      // Paso 2: Propietario
      nombreCompleto: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],

      // Paso 3: Diagnóstico inicial
      motivoConsulta: ['', Validators.required],
      sintomas: ['', Validators.required],
      tiempoEvolucion: ['', Validators.required],
      alimentacion: ['', Validators.required],
      vacunacion: ['', Validators.required],
      desparasitacion: ['', Validators.required],
      observaciones: [''],
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
      const formData = this.petForm.value;

      // Separar nombre y apellido
      const [nombre, apellido] = formData.nombreCompleto.split(' ', 2);

      const personaDTO: PersonaDTO = {
        idPersona: 0,
        nombre: nombre || '',
        apellido: apellido || '',
        telefono: formData.telefono,
        email: formData.correo,
        direccion: formData.direccion,
        contraseña: '1234',
      };

      const fechaNacimiento = new Date();
      fechaNacimiento.setFullYear(
        fechaNacimiento.getFullYear() - parseInt(formData.edad)
      );

      const mascotaDTO: MascotaDTO = {
        nombreMascota: formData.nombre,
        especieMascota: formData.tipo,
        razaMascota: formData.raza,
        colorMascota: formData.color,
        fechaNacimiento: fechaNacimiento.toISOString(),
        sexoMascota: formData.sexo,
        pesoMascota: 0,
        estadoMascota: 'Activo',
        fotoMascota: '',
        idPersona: personaDTO,
      };

      const historiaDTO: HistoriaClinicaDTO = {
        fechaCreacion: new Date().toISOString(),
        sintomas: formData.sintomas,
        diagnostico: formData.motivoConsulta,
        tratamiento: '',
        fechaUltimaActualizacion: new Date().toISOString(),
        observaciones: formData.observaciones,
        idMascota: 0,
        idPersona: 0,
      };

      this.personaService
        .crearPersona(personaDTO)
        .pipe(
          switchMap((personaCreada) => {
            mascotaDTO.idPersona = personaCreada;
            return this.mascotaService.guardarMascota(mascotaDTO);
          }),
          switchMap((mascotaCreada) => {
            historiaDTO.idMascota = mascotaCreada.idMascota;
            historiaDTO.idPersona = mascotaCreada.idPersona.idPersona;
            return this.historiaClinicaService.guardarHistoria(historiaDTO);
          })
        )
        .subscribe({
          next: (historiaResponse) => {
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Historia clínica guardada correctamente',
              confirmButtonColor: '#3085d6',
            });

            // Opcional: limpiar formulario o cerrar modal
            this.petForm.reset();
          },
          error: (error) => {
            console.error('Error en proceso de guardado:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ocurrió un error al guardar la historia clínica. Por favor, inténtalo de nuevo.',
              confirmButtonColor: '#d33',
            });
          },
        });
    }
  }
}

// Interfaces DTO
interface PersonaDTO {
  idPersona: number;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  direccion: string;
  contraseña: string;
}

interface MascotaDTO {
  nombreMascota: string;
  especieMascota: string;
  razaMascota: string;
  colorMascota: string;
  fechaNacimiento: string;
  sexoMascota: string;
  pesoMascota: number;
  estadoMascota: string;
  fotoMascota: string;
  idPersona: PersonaDTO;
}

interface HistoriaClinicaDTO {
  fechaCreacion: string;
  sintomas: string;
  diagnostico: string;
  tratamiento: string;
  fechaUltimaActualizacion: string;
  observaciones: string;
  idMascota: number;
  idPersona: number;
}
