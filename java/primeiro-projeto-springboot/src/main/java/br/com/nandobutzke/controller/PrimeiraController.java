package br.com.nandobutzke.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/primeiraController")
public class PrimeiraController {

  @GetMapping("/primeiroMetodo/{id}")
  public String primeiroMetodo(@PathVariable String id) {
    return "Hello world! Id: " + id;
  }

  @GetMapping("/metodoComQueryParams")
  public String metodoComQueryParams(@RequestParam String param) {
    return "request param is " + param;
  }

  @GetMapping("/metodoComQueryParams2")
  public String metodoComQueryParams2(@RequestParam Map<String, String> params) {
    return "request params are " + params.entrySet();
  }

  @PostMapping("/metodoComBodyParams")
  public String metodoComBodyParams(@RequestBody User user) {
    return "metodoComBodyParams " + user.username();
  }

  @PostMapping("/metodoComHeaders")
  public String metodoComHeaders(@RequestHeader Map<String, String> headers) {
    return "metodoComHeaders " + headers.entrySet();
  }

  @PostMapping("/metodoComListHeaders")
  public String metodoComListHeaders(@RequestHeader Map<String, String> headers) {
    return "metodoComListHeaders " + headers.entrySet();
  }

  @GetMapping("/metodoComResponseEntity/{id}")
  public ResponseEntity<Object> metodoComResponseEntity(@PathVariable Long id) {
    var user = new User("nandobutzke");

    if (id > 5) {
      return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    return ResponseEntity.badRequest().body("Número menor que 5");
  }


  record User(String username) {}
}
