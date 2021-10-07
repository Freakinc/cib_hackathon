package ru.planair.backend.kafka.producer;

import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.util.concurrent.ListenableFutureCallback;
import ru.planair.backend.kafka.entity.UserEntries;

@Service

@RequiredArgsConstructor
public class ProducerService {

    private final KafkaTemplate<String, UserEntries> kafkaTemplate;

    public void produce(UserEntries userEntries) {
        System.out.println("Producing the message: " + userEntries);
        kafkaTemplate.send("user-entries", userEntries);
    }

//    public void sendMessage(String message) {
//
//        ListenableFuture<SendResult<String, String>> future =
//                kafkaTemplate.send("user-entries", message);
//
//        future.addCallback(new ListenableFutureCallback<SendResult<String, String>>() {
//
//            @Override
//            public void onSuccess(SendResult<String, String> result) {
//                System.out.println("Sent message=[" + message +
//                        "] with offset=[" + result.getRecordMetadata().offset() + "]");
//            }
//            @Override
//            public void onFailure(Throwable ex) {
//                System.out.println("Unable to send message=["
//                        + message + "] due to : " + ex.getMessage());
//            }
//        });
//    }
}
