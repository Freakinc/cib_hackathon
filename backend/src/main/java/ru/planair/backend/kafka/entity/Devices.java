package ru.planair.backend.kafka.entity;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Objects;


@Getter
@Setter
@ToString
@Entity
@NoArgsConstructor
@Table(name = "DEVICES")
public class Devices {

    @Id
    @Column(name = "ID")
    private Long id;

    @Column(name = "ZONE_IN")
    private Long zoneIn;

    @Column(name = "ZONE_OUT")
    private Long zoneOut;

    @Column(name = "COORDINATES")
    private String coordinates;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Devices devices = (Devices) o;
        return id != null && Objects.equals(id, devices.id);
    }

    @Override
    public int hashCode() {
        return 0;
    }
}
