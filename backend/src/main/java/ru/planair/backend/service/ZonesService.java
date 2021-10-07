package ru.planair.backend.service;

import ru.planair.backend.kafka.entity.Zones;

import java.util.List;

public interface ZonesService {

    List<Zones> getZones();
}
