import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { DESCRIPTION_APP } from '../../../config/config';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NotificationsComponent } from '../notifications/notifications.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    ChangePasswordComponent,
    ReactiveFormsModule,
    NotificationsComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [AuthService],
})
export class HeaderComponent implements OnInit {
  userName: string | null = null;
  userEmail: string | null = null;
  userRol: string | null = null;
  userRolDescription: string | null = null;
  userImage: string | null = null;
  private _isSidebarVisible: boolean = false;

  @Input()
  set isSidebarVisible(value: boolean) {
    this._isSidebarVisible = value;
  }
  get isSidebarVisible(): boolean {
    return this._isSidebarVisible;
  }

  @Output() sidebarToggle = new EventEmitter<void>();

  nombreApp = DESCRIPTION_APP;

  form!: FormGroup;

  // configuración notificaciones tipo toast
  toastTitle: string = '';
  toastType: 'success' | 'warning' | 'danger' | 'primary' = 'success';
  notifications: Array<{
    title: string;
    type: 'success' | 'warning' | 'danger' | 'primary';
    alertType: 'A' | 'B';
    container: 0 | 1;
    visible: boolean;
  }> = [];
  SWNTF: number = 0;
  // ----------------------------------------------

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const firstName = sessionStorage.getItem('user_firstName');
      const secondName = sessionStorage.getItem('user_secondName');
      const businessName = sessionStorage.getItem('user_businessName');
      this.userName = businessName ? businessName : `${firstName ?? ''} ${secondName ?? ''}`.trim();
      this.userEmail = sessionStorage.getItem('user_email');
      this.userRol = sessionStorage.getItem('user_rol');
      this.userRolDescription = sessionStorage.getItem('user_rolDescription');
      this.userImage = sessionStorage.getItem('user_image');
    }
    this.form = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', Validators.required],
    });
  }

  onToggleSidebar(): void {
    this._isSidebarVisible = !this._isSidebarVisible;
    this.sidebarToggle.emit();
  }

  onSubmit(): void {
    if (
      this.form.valid &&
      this.form.get('newPassword')?.value ===
        this.form.get('repeatPassword')?.value
    ) {
      const userId =
        sessionStorage.getItem('user_id') || localStorage.getItem('userId');
      const { oldPassword, newPassword } = this.form.value;

      this.http
        .post(`/api/users/${userId}/change-password`, {
          oldPassword,
          newPassword,
        })
        .subscribe({
          next: (res: any) => {
            // Mostrar el mensaje devuelto
            this.showToast(res.message, 'success', 'A', 1);

            // Resetear formulario
            this.form.reset();
          },
          error: (err: any) => {
            this.showToast('Error: ' + err.error.message, 'danger', 'A', 1);
          },
        });
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.clear();
    }

    this.router.navigate(['/login']).then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 100);
    });
  }

  // Funciones para NOTIFICACIONES
  addNotification(
    title: string,
    type: 'success' | 'warning' | 'danger' | 'primary',
    alertType: 'A' | 'B',
    container: 0 | 1
  ) {
    this.notifications.push({
      title,
      type,
      alertType,
      container,
      visible: true,
    });
  }

  removeNotification(index: number) {
    this.notifications.splice(index, 1);
  }

  getIconColor() {
    return 'var(--header-background-color)';
  }

  showToast(
    message: string,
    type: 'success' | 'warning' | 'danger' | 'primary',
    alertType: 'A' | 'B',
    container: 0 | 1
  ) {
    const notification = {
      title: message,
      type,
      alertType,
      container,
      visible: true,
    };
    this.notifications.push(notification);
    this.cdr.detectChanges();

    if (alertType === 'A') {
      setTimeout(() => {
        notification.visible = false;
        this.cdr.detectChanges();
      }, 5000);
    }
  }
  // ----------------------------------------------
}
