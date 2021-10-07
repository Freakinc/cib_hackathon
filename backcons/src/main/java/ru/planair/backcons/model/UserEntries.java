package ru.planair.backcons.model;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;
import java.util.Objects;


@Getter
@Setter
@ToString
@Entity
@NoArgsConstructor
@Table(name = "USER_ENTRIES")
public class UserEntries {

    @Id
    @Column(name = "ID")
    private Long id;

    @Column(name = "USER_ID")
    private Long userId;

    @Column(name = "DEVICE_ID")
    private Long deviceId;

    @Column(name = "ENTRY_TIME")
    private Timestamp entryTime;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        UserEntries that = (UserEntries) o;
        return id != null && Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return 0;
    }
}
