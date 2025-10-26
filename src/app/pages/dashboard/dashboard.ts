import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { signOut } from 'aws-amplify/auth';
import { TaskService } from '../../services/task.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { Loader } from '../loader/loader';

interface Activity {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  completed: boolean;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, Loader],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit {
  userName = '';
  userEmail = '';

  activities: Activity[] = [];

  updateMode = false;
  id_for_edit?: number;
  newTask = { title: '', description: '' };

  totalCount: number = 0;
  pendingCOunt: number = 0;
  completedCount: number = 0;

  LoadUI = false;

  constructor(
    private router: Router,
    private taskService: TaskService,
    private cd: ChangeDetectorRef,
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.LoadUI = false;

    this.taskService.getDashboardData().subscribe({
      next: (data) => {
        this.LoadUI = true;
        this.totalCount = data.total;
        this.pendingCOunt = data.pending;
        this.completedCount = data.completed;
        this.userName = data.name;
        this.userEmail = data.email;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error loading data:', err);
        this.LoadUI = true;
        this.cd.detectChanges();
      },
    });

    this.taskService.getFiveTasks().subscribe({
      next: (data) => {
        this.activities = data;
        this.cd.detectChanges();
        this.LoadUI = true;
      },
      error: (err) => {
        console.error('Error loading tasks:', err);
        this.cd.detectChanges();
      },
    });
  }

  addTask() {
    if (!this.newTask.title || !this.newTask.description) return;

    const task = {
      title: this.newTask.title,
      description: this.newTask.description,
    };

    this.taskService.createTask(task).subscribe({
      next: (data) => {
        this.getData();
        this.toastr.success('', '', {
          toastClass: 'small-toast',
          positionClass: 'toast-top-right',
          timeOut: 3000,
          tapToDismiss: true,
          progressBar: false,
          closeButton: false,
        });
        this.newTask = { title: '', description: '' };
      },
      error: (err) => {
        this.toastr.error('', '', {
          toastClass: 'small-toast-err',
          positionClass: 'toast-top-right',
          timeOut: 3000,
          tapToDismiss: true,
          progressBar: false,
          closeButton: false,
        });
        console.error(err);
      },
    });
  }

  async logout() {
    try {
      await signOut();
      localStorage.clear();
      this.router.navigate(['/signin']);
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  }

  updateStatus(activity: Activity, status: string) {
    this.taskService
      .updateTaskStatus({ id: activity.id, status: status })
      .subscribe((data) => {
        this.getData();
        this.toastr.success('', '', {
          toastClass: 'small-toast',
          positionClass: 'toast-top-right',
          timeOut: 3000,
          tapToDismiss: true,
          progressBar: false,
          closeButton: false,
        });
      });
  }

  onClickEdit(activity: Activity) {
    this.updateMode = true;
    this.id_for_edit = activity.id;
    this.newTask = {
      title: activity.title,
      description: activity.description,
    };
  }

  updateTask() {
    if (!this.newTask.title || !this.newTask.description) return;

    const task = {
      id: this.id_for_edit,
      title: this.newTask.title,
      description: this.newTask.description,
    };

    this.taskService.updateTask(task).subscribe((data) => {
      if (data) {
        this.getData();
        this.toastr.success('', '', {
          toastClass: 'small-toast',
          positionClass: 'toast-top-right',
          timeOut: 3000,
          tapToDismiss: true,
          progressBar: false,
          closeButton: false,
        });
        this.newTask = { title: '', description: '' };
      }
    });
  }

  getTimeAgo(date: Date): string {
    const diffMs = Date.now() - new Date(date).getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 1) return 'just now';
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  }
}
