package ru.planair.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.planair.backend.kafka.entity.UserEntries;
import ru.planair.backend.kafka.producer.ProducerService;
import ru.planair.backend.service.UserEntriesService;

import java.util.List;

@RestController
@RequestMapping("/generate")
@RequiredArgsConstructor
public class UserEntriesController {

    private final ProducerService producerService;
    private final UserEntriesService service;

//    @GetMapping("/generate")
//    public String generate(@RequestParam String message, @RequestParam String age) {
//        producerService.produce(new Users(message, age));
//        return "OK";
//    }

    @GetMapping("/list")
    public List<UserEntries> userEntriesList() {
        return service.userEntriesList();
    }


    @PostMapping()
    public String generate(@RequestBody UserEntries userEntries) {
        producerService.produce(userEntries);
        return "OK";
    }

    @GetMapping("/report-one/{id}")
    public String getReportOne(@PathVariable Integer id){
       return service.getReportOne(id);
    }

    @GetMapping("/report-two/{id}")
    public String getReportTwo(@PathVariable Integer id){
        return service.getReportTwo(id);
    }

    @GetMapping("/report-three/{id}")
    public String getReportThree(@PathVariable Integer id){
        return service.getReportThree(id);
    }


}
