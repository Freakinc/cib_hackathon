package ru.planair.backend.service;

import ru.planair.backend.kafka.entity.Users;

import java.util.List;

public interface UsersService {

    List<Users> getUsers();
}
