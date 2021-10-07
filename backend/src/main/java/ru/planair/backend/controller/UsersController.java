package ru.planair.backend.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.planair.backend.kafka.entity.Users;
import ru.planair.backend.service.UsersService;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UsersController {

    private final UsersService usersService;

    @GetMapping("/list")
    public List<Users> users() {
        return usersService.getUsers();
    }
}
