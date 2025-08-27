package com.wipro.taskmanagementsystem.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.wipro.taskmanagementsystem.entity.Task;
import com.wipro.taskmanagementsystem.payload.ApiResponse;
import com.wipro.taskmanagementsystem.service.TaskService;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:4200") 
public class TaskController {
    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllTasks() {
        List<Task> tasks = service.getAllTasks();
        return ResponseEntity.ok(new ApiResponse("Tasks fetched successfully", tasks));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getTask(@PathVariable Long id) {
        Task task = service.getAllTaskById(id);
        return ResponseEntity.ok(new ApiResponse("Task fetched successfully", task));
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createTask(@RequestBody Task task) {
        Task createdTask = service.createTask(task);
        return ResponseEntity.status(HttpStatus.CREATED)
                             .body(new ApiResponse("Task created successfully", createdTask));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateTask(@PathVariable Long id, @RequestBody Task task) {
        Task updatedTask = service.updateTask(id, task);
        return ResponseEntity.ok(new ApiResponse("Task updated successfully", updatedTask));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteTask(@PathVariable Long id) {
        service.deleteTask(id);
        return ResponseEntity.ok(new ApiResponse("Task deleted successfully", null));
    }
}
