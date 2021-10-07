package ru.planair.backcons.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.planair.backcons.model.UserEntries;
import ru.planair.backcons.repository.UserEntriesRepository;
import ru.planair.backcons.service.UserEntriesService;


@Service
@RequiredArgsConstructor
public class UserEntriesServiceImpl implements UserEntriesService {

    private final UserEntriesRepository repository;

    @Override
    public void addUserEntries(UserEntries userEntries) {
        repository.save(userEntries);
    }
}
