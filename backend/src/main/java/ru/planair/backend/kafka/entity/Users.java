package ru.planair.backend.kafka.entity;


import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Objects;

@Getter
@Setter
@Entity
@ToString
@NoArgsConstructor
@Table(name = "USERS")
public class Users {

    @Id
    @Column(name = "ID")
    private Long id;
    @Column(name = "NAME")
    private String name;
    @Column(name = "WORK_PLACE")
    private String workPlace;
    @Column(name = "ZONE_ID")
    private Long zoneId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Users users = (Users) o;
        return id != null && Objects.equals(id, users.id);
    }

    @Override
    public int hashCode() {
        return 0;
    }
}
