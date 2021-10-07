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
@Table(name = "ZONES")
public class Zones {

    @Id
    @Column(name = "ID")
    private Long id;

    @Column(name = "PARENT_ID")
    private Long parent_id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "TYPE")
    private String type;

    @Column(name = "COORDINATES", columnDefinition = "Geometry")
    private String coordinates;

    @Column(name = "JSON")
    private String json;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Zones zones = (Zones) o;
        return id != null && Objects.equals(id, zones.id);
    }

    @Override
    public int hashCode() {
        return 0;
    }
}
