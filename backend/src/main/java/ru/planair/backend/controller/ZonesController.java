package ru.planair.backend.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.planair.backend.kafka.entity.Zones;
import ru.planair.backend.service.ZonesService;

import java.util.List;

@RestController
@RequestMapping("/zones")
@RequiredArgsConstructor
public class ZonesController {

    private final ZonesService zonesService;


    @GetMapping("/list")
    public List<Zones> getZones() {
        return zonesService.getZones();
    }
}
