package com.sjPrograming.restapi.contoler;
import com.sjPrograming.restapi.entity.Student;

import com.sjPrograming.restapi.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StudentControler {

    @Autowired
    StudentRepository repo;

    // get all the students
    //localhost:8080/students
    @GetMapping("/students")
    public List<Student>getAllStudents(){

        List<Student> students = repo.findAll();
        return students;
    }

    //localhost:8080/students/1
    @GetMapping("/students/{id}")
    public Student getStudent(@PathVariable int id){
        Student  student = repo.findById(id).get();
        return student;
    }

    @PostMapping("student/add")
    @ResponseStatus(code = HttpStatus.CREATED)
    public void createStudent(@RequestBody Student student){
        repo.save(student);
    }

//    @PutMapping("/student/update/{id}")
//    public Student updateStudents(@PathVariable int id){
//        Student student = repo.findById(id).get();
//        student.setName("Chintu");
//        student.setPercentage(66);
//        repo.save(student);
//
//
//        return student;
//    }


    @PutMapping("/student/update/{id}")
    public Student updateStudent(@PathVariable int id, @RequestBody Student updatedStudent) {
        Student existingStudent = repo.findById(id).orElse(null);

        if (existingStudent != null) {
            existingStudent.setName(updatedStudent.getName());
            existingStudent.setPercentage(updatedStudent.getPercentage());
            existingStudent.setBranch(updatedStudent.getBranch()); // Include if branch is also being updated
            repo.save(existingStudent);
            return existingStudent;
        } else {
            return null; // Or handle not found with proper exception/response
        }
    }

}
