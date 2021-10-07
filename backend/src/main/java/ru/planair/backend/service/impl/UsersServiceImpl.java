package ru.planair.backend.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.planair.backend.kafka.entity.Users;
import ru.planair.backend.repository.UsersRepository;
import ru.planair.backend.service.UsersService;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UsersServiceImpl implements UsersService {

    @PersistenceContext
    private final EntityManager manager;

    private final UsersRepository usersRepository;

    @Override
    public List<Users> getUsers() {
        return usersRepository.findAll();
    }

}
