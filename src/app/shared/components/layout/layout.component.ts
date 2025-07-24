import { Component, HostListener, OnInit } from '@angular/core';
import { OptionMenu } from '../../model/option_menu';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { Application } from '../../model/application.model';

import { DESCRIPTION_APP, NAME_APP_SHORT } from '../../../config/config';
import { ApplicationsService } from '../../services/applications/applications.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export default class LayoutComponent implements OnInit {
  optionsMenu: OptionMenu[] = [];
  isSidebarVisible = true;
  isLargeScreen = false;
  application: Application | undefined;

  constructor(private applicationsService: ApplicationsService) {
    if (typeof window !== 'undefined') {
      this.isLargeScreen = window.innerWidth >= 992;
    }
  }

  ngOnInit(): void {
    this.loadSidebarPreference();
    this.fetchApplication(NAME_APP_SHORT);
    // consumo de materiales
  }

  // Función para obtener la aplicación
  fetchApplication(name: string): void {
    const userRol = 'Administrador';
    // const userRol = sessionStorage.getItem('user_rol');
    if (!userRol) {
      console.error('No se encontró el rol del usuario en la sesión');
      return;
    }

    this.application = {
      id: '11124',
      strName: NAME_APP_SHORT,
      strDescription: DESCRIPTION_APP,
      strUrlImage: './assets/img/logo_sysvet_1.png',
      strSlug: 'Veterinaria SysVet',
      strTags: ['Veterinaria', 'SysVet', 'Veterinary'],
      strImages: ['./assets/img/logo_sysvet_1.png'],
      strRoles: [],
    };

    this.optionsMenu = [
      {
        id: '1',
        name: 'homeSysvet',
        description: 'Home',
        url: '/home',
        icon: 'fa-solid fa-house',
        type: 'main_menu',
        idMPather: null,
        order: "1",
        idApplication: "11124"
      },      
      {
        id: '2',
        name: 'petSysvet',
        description: 'Pets',
        url: '/pet',
        icon: 'fa-solid fa-paw',
        type: 'main_menu',
        idMPather: null,
        order: "1",
        idApplication: "11124"
      }
    ];
    
  }

  loadSidebarPreference(): void {
    if (typeof window !== 'undefined' && localStorage) {
      const storedValue = localStorage.getItem('sidebarVisible');
      if (storedValue !== null) {
        this.isSidebarVisible = JSON.parse(storedValue);
      } else {
        this.isSidebarVisible = this.isLargeScreen;
      }
    }
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem(
        'sidebarVisible',
        JSON.stringify(this.isSidebarVisible)
      );
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (typeof window !== 'undefined') {
      this.isLargeScreen = window.innerWidth >= 992;
    }
  }
}
