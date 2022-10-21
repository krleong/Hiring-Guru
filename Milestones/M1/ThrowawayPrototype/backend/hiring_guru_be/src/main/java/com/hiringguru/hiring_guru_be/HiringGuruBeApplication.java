package com.hiringguru.hiring_guru_be;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class HiringGuruBeApplication {

  @RequestMapping("/")
  public String home() {
    return "Welcome to HiringGuru";
  }

  public static void main(String[] args) {
    SpringApplication.run(HiringGuruBeApplication.class, args);
  }

}