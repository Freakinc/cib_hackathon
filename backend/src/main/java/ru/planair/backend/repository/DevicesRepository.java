package ru.planair.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.planair.backend.kafka.entity.Devices;

public interface DevicesRepository extends JpaRepository<Devices, Long> {
}
