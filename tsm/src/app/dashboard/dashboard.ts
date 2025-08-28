import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from '../services/task.services';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  tasks: Task[] = [];
  newTask: Task = { title: '', description: '', completed: false };
  editingTask: Task | null = null;
  showModal = false;
  modalMessage = '';

  showDeleteModal = false;
  taskToDeleteId: number | null = null;

  showLogoutModal = false; 

  logoutConfirm(): void {
    this.showLogoutModal = true;
  }

  confirmLogout(): void {
    this.showLogoutModal = false;
    this.router.navigate(['login']);
  }

  cancelLogout(): void {
    this.showLogoutModal = false;
  }


  constructor(private taskService: TaskService, private router: Router) { }
  ngOnInit(): void {
    this.loadTasks();
  }


  loadTasks(): void {
    this.taskService.getAllTasks().subscribe({
      next: (res) => {
        this.tasks = res.data ?? res;
      },
      error: (err) => console.error('Error loading tasks:', err)
    });
  }

  addTask(): void {
    if (!this.newTask.title.trim()) return;
    this.taskService.createTask(this.newTask).subscribe(() => {
      this.newTask = { title: '', description: '', completed: false };
      this.loadTasks();
      this.modalMessage = 'Task Added Successfully';
      this.showModal = true;

    });
  }
  closeModal(): void {
    this.showModal = false;
  }

  editTask(task: Task): void {
    this.editingTask = { ...task };
  }

  updateTask(): void {
    if (this.editingTask?.id) {
      this.taskService.updateTask(this.editingTask.id, this.editingTask).subscribe(() => {
        this.editingTask = null;
        this.loadTasks();
        this.modalMessage = 'Task Updated Successfully';
        this.showModal = true;
      });
    }
  }

  deleteTask(id: number): void {
    this.taskToDeleteId = id;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (this.taskToDeleteId !== null) {
      this.taskService.deleteTask(this.taskToDeleteId).subscribe(() => {
        this.loadTasks();
        this.showDeleteModal = false;
        this.taskToDeleteId = null;
      });
    }
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.taskToDeleteId = null;
  }

  markComplete(task: Task): void {
    if (task.id) {
      const updatedTask = { ...task, completed: true };
      this.taskService.updateTask(task.id, updatedTask).subscribe(() => this.loadTasks());
    }
  }
}
