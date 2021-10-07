package ru.planair.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.planair.backend.kafka.entity.UserEntries;
import ru.planair.backend.kafka.producer.ProducerService;

import java.util.List;

@RestController
@RequestMapping("/generate")
@RequiredArgsConstructor
public class UserEntriesController {

    private final ProducerService producerService;

//    @GetMapping("/generate")
//    public String generate(@RequestParam String message, @RequestParam String age) {
//        producerService.produce(new Users(message, age));
//        return "OK";
//    }

    @GetMapping("/list")
    private List<UserEntries> userEntriesList() {
        return null;
    }


    @PostMapping()
    public String generate(@RequestBody UserEntries userEntries) {
        producerService.produce(userEntries);
        return "OK";
    }


}
