import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { signOut } from 'aws-amplify/auth';

interface Activity {
  title: string;
  description: string;
  createdAt: Date;
  completed: boolean;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit {
  userName = '';
  userEmail = '';

  activities: Activity[] = [];

  newTask = { title: '', description: '' };

  constructor(private router: Router) {}

  ngOnInit() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      // this.router.navigate(['/signin']);
      // return;
    }

    this.userName = localStorage.getItem('userName') || 'User';
    this.userEmail = localStorage.getItem('userEmail') || '';

    this.activities = [
      {
        title: 'Project Created',
        description: 'New project "Website Redesign" has been created',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        completed: false,
      },
      {
        title: 'Task Completed',
        description: 'Finished implementing authentication system',
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
        completed: true,
      },
      {
        title: 'Team Meeting',
        description: 'Weekly standup meeting scheduled for tomorrow',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        completed: false,
      },
    ];
  }

  addTask() {
    if (!this.newTask.title || !this.newTask.description) return;

    const task: Activity = {
      title: this.newTask.title,
      description: this.newTask.description,
      createdAt: new Date(),
      completed: false,
    };

    this.activities.unshift(task);
    this.newTask = { title: '', description: '' };
  }

  async logout() {
    try {
      await signOut();
      localStorage.clear();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  }

  markAsCompleted(activity: Activity) {
    activity.completed = true;
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
