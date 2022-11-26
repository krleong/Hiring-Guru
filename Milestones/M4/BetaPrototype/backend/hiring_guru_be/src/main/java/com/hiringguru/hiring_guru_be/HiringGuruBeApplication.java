package com.hiringguru.hiring_guru_be;
import com.hiringguru.hiring_guru_be.repositories.CompanyRepository;
import com.hiringguru.hiring_guru_be.repositories.JobRepository;
import com.hiringguru.hiring_guru_be.repositories.RoleRepository;
import java.util.Arrays;
import java.util.Collections;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;


@SpringBootApplication
@EnableJpaAuditing
@RestController
public class HiringGuruBeApplication {
  @Autowired
  private JobRepository jobrepo;
  @Autowired
  private CompanyRepository comprepo;
  @Autowired
  private RoleRepository rorepo;

  public HiringGuruBeApplication() {
  }

  @RequestMapping({"/"})
  public String home() {
    return "Welcome to HiringGuru";
  }

  @RequestMapping({"/.well-known/pki-validation/4445F6A0F2E475894038C9255E286218.txt"})
  public ResponseEntity<byte[]> sslVerification() {
    String demoContent = "B3D7A9BC6BB99400115AA22B7FB4675EE364C68A24C83D6702556BDACB61A7EF\n" +
            "comodoca.com\n" +
            "ac3a2f187ffff7a"; // (2) Dynamic content
    HttpHeaders httpHeaders = new HttpHeaders();
    httpHeaders.set(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE); // (3) Content-Type: application/octet-stream
    httpHeaders.set(HttpHeaders.CONTENT_DISPOSITION, ContentDisposition.attachment().filename("4445F6A0F2E475894038C9255E286218.txt").build().toString()); // (4) Content-Disposition: attachment; filename="demo-file.txt"
    return ResponseEntity.ok().headers(httpHeaders).body(demoContent.getBytes()); // (5) Return Response
  }

  public static void main(String[] args) {
    SpringApplication.run(HiringGuruBeApplication.class, args);
  }

  @Bean
  public CorsFilter corsFilter() {
    final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    final CorsConfiguration config = new CorsConfiguration();
    config.setAllowCredentials(true);
    // Don't do this in production, use a proper list  of allowed origins
    config.setAllowedOriginPatterns(Collections.singletonList("*"));
    config.setAllowedHeaders(Arrays.asList("Origin", "Content-Type", "Accept"));
    config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "OPTIONS", "DELETE", "PATCH"));
    source.registerCorsConfiguration("/**", config);
    return new CorsFilter(source);
  }

}
