package com.qspider.springboot_backend_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.qspider.springboot_backend_project.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
