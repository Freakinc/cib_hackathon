package ru.planair.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.planair.backend.kafka.entity.UserEntries;

public interface UserEntriesRepository extends JpaRepository<UserEntries, Long> {
}
