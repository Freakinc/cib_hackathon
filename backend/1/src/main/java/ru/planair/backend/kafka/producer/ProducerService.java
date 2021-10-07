package ru.planair.backend.kafka.producer;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import ru.planair.backend.kafka.entity.UserEntries;

@Service

@RequiredArgsConstructor
public class ProducerService {

    private final KafkaTemplate<String, UserEntries> kafkaTemplate;

    public void produce(UserEntries userEntries) {
        System.out.println("Producing the message: " + userEntries);
        kafkaTemplate.send("messages", userEntries);
    }
}
