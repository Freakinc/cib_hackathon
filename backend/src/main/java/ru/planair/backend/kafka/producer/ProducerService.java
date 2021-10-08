package ru.planair.backend.kafka.producer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class ProducerService {

    @Autowired
    @Qualifier("userEntries")
    private KafkaTemplate<String, String> userEntriesKafkaTemplate;


    @Autowired
    @Qualifier("enterEvent")
    private KafkaTemplate<String, String> enterEventKafkaTemplate;

    public void userEntries(String userEntries) {
        userEntriesKafkaTemplate.send("user-entries", userEntries);

    }

    public void enterEvents(String message) {
        enterEventKafkaTemplate.send("incidents", message);
    }


}
