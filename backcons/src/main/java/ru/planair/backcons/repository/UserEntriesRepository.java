package ru.planair.backcons.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.planair.backcons.model.UserEntries;

public interface UserEntriesRepository extends JpaRepository<UserEntries, Long> {
}
