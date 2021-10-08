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


    @GetMapping("/list")
    public List<UserEntries> userEntriesList() {
        return service.userEntriesList();
    }


    @PostMapping("/user-entries")
    public String userEntries(@RequestBody String userEntries) {
        producerService.userEntries(userEntries);
        return "OK";
    }

    @PostMapping("/enter-event")
    public String eventEntry(@RequestBody String eventEntry) {
        producerService.enterEvents(eventEntry);
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

    @GetMapping("/report-four/{id}")
    public String getReportFour(@PathVariable Integer id){
        return service.getReportFour(id);
    }


}
