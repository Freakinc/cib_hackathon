package ru.planair.backcons.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
public class Events {

    private String type;
    private Integer userId;
    private Timestamp eventTime;
    private String event;
    private Integer routerId;

}
