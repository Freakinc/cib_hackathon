package ru.planair.backend.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.planair.backend.kafka.entity.Zones;
import ru.planair.backend.repository.ZonesRepository;
import ru.planair.backend.service.ZonesService;

import java.util.List;


@Service
@RequiredArgsConstructor
public class ZonesServiceImpl implements ZonesService {

    private final ZonesRepository zonesRepository;

    public List<Zones> getZones(){
        return zonesRepository.findAll();
    }
}
