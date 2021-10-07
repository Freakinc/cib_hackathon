package ru.planair.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.planair.backend.kafka.entity.Users;

public interface UsersRepository extends JpaRepository<Users, Long> {
}
