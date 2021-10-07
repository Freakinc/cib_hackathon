package ru.planair.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.planair.backend.kafka.entity.Zones;

public interface ZonesRepository extends JpaRepository<Zones, Long> {
}
