import { LayoutHeaderComponent } from '@/app/core/layouts/components/layout-header/layout-header.component';
import { ButtonComponent } from '@/app/shared/ui/atoms/button/button.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TodoManagementDialog } from '../../dialogs/todo-management/todo-management.dialog';
import { MatTabRouterLinkActiveDirective } from '../../directives/routerLinkActive.directive';
import { TodoManagementService } from '../../services/todos-management.service';
import { UserDetailsFacade } from '../../store/user-details/user-details.facade';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    LayoutHeaderComponent,
    ButtonComponent,
    TodoManagementDialog,
    MatDialogModule,
    RouterModule,
    MatTabsModule,
    MatTabRouterLinkActiveDirective,
  ],
  selector: 'app-user-details-page',
  templateUrl: './user-details.page.html',
})
export class UserDetailsPage implements OnInit {
  protected userDetailsFacade = inject(UserDetailsFacade);
  protected todosRepositoryService = inject(TodoManagementService);
  protected dialog = inject(MatDialog);
  protected route = inject(ActivatedRoute);
  protected router = inject(Router);

  public userId!: number;

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];

    this.userDetailsFacade.loadUserDetails(this.userId);
  }

  openAddTodoDialog(dialogRef: TemplateRef<MatDialog>) {
    this.todosRepositoryService.openAddTodoDialog({
      dialogRef,
      dialog: this.dialog,
    });
  }
}
