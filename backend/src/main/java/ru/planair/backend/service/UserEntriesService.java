package ru.planair.backend.service;

import org.springframework.stereotype.Service;
import ru.planair.backend.kafka.entity.UserEntries;

import java.util.List;

@Service
public interface UserEntriesService {
    List<UserEntries> userEntriesList();

    String getReportOne(Integer id);

    String getReportTwo(Integer id);

    String getReportThree(Integer id);

    String getReportFour(Integer id);
}
