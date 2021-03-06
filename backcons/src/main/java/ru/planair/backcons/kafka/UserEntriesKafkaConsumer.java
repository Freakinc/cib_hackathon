package ru.planair.backcons.kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import ru.planair.backcons.model.UserEntries;
import ru.planair.backcons.service.EnterEventsService;
import ru.planair.backcons.service.UserEntriesService;

import java.util.HashMap;
import java.util.Map;

@EnableKafka
@Configuration
@RequiredArgsConstructor
public class UserEntriesKafkaConsumer {

    private final UserEntriesService service;
    private final EnterEventsService enterEventsService;

    private final static String USER_ENTRIES = "user-entries";
    private final static String INCIDENTS = "incidents";
    private final static String BOOTSTRAP_SERVERS =
            "localhost:9093";

    @Bean
    public ConsumerFactory<String, String> consumerFactory() {
        Map<String, Object> props = new HashMap<>();
        props.put(
                ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,
                BOOTSTRAP_SERVERS);
        props.put(
                ConsumerConfig.GROUP_ID_CONFIG,
                "KafkaExampleConsumer");
        props.put(
                ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG,
                StringDeserializer.class);
        props.put(
                ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG,
                StringDeserializer.class);

        return new DefaultKafkaConsumerFactory<>(props);
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, String>
    kafkaListenerContainerFactory() {

        ConcurrentKafkaListenerContainerFactory<String, String> factory =
                new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory());
        return factory;
    }


    @KafkaListener(topics = USER_ENTRIES, groupId = "KafkaExampleConsumer")
    public void listenGroupUserEntries(String message) {

        ObjectMapper mapper = new ObjectMapper();

        try {
            UserEntries userEntries = mapper.readValue(message, UserEntries.class);
            service.addUserEntries(userEntries);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        System.out.println("Received Message in group foo: " + message);
    }

    @KafkaListener(topics = INCIDENTS, groupId = "KafkaExampleConsumer")
    public void listenGroupINCIDENTS(String message) {
        enterEventsService.enterEvent(message);
        System.out.println("Received Message in group foo: " + message);
    }

}
