package com.wipro.taskmanagementsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wipro.taskmanagementsystem.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

}
