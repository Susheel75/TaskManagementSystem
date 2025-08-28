package com.wipro.taskmanagementsystem.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.wipro.taskmanagementsystem.entity.Task;
import com.wipro.taskmanagementsystem.repository.TaskRepository;


@Service
public class TaskService {
	private final TaskRepository repo;
	
	public TaskService(TaskRepository repo) {
		this.repo=repo;
	}
	
	public List<Task> getAllTasks() {
		// TODO Auto-generated method stub
		return repo.findAll();
	}

	public Task getAllTaskById(Long id) {
		// TODO Auto-generated method stub
		return repo.findById(id).orElseThrow(()-> new RuntimeException("Task Not Found"));
	}
	
	public Task createTask(Task task) {
		// TODO Auto-generated method stub
		return repo.save(task);
	}

	public Task updateTask(Long id, Task task) {
		// TODO Auto-generated method stub
		Task existing = getAllTaskById(id);
		existing.setTitle(task.getTitle());
		existing.setDescription(task.getDescription());
		existing.setCompleted(task.isCompleted());
		existing.setDueDate(task.getDueDate());
		return repo.save(existing);
	}

	public void deleteTask(Long id) {
		// TODO Auto-generated method stub
		repo.deleteById(id);
	}

	

}
