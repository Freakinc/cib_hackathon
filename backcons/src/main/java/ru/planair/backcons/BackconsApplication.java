package ru.planair.backcons;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.kafka.annotation.EnableKafka;
import ru.planair.backcons.kafka.KafkaConsumerExample;

import javax.annotation.PostConstruct;


@SpringBootApplication
public class BackconsApplication {
//
//    @Autowired
//    private KafkaConsumerExample example;

    public static void main(String[] args) {
        SpringApplication.run(BackconsApplication.class, args);
    }



//    @EventListener(ContextRefreshedEvent.class)
//    public void contextRefreshedEvent() {
//        example.runConsumer();
//    }

//    @PostConstruct
//    public void start(){
//        example.runConsumer();
//    }

}
