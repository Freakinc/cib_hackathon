package ru.planair.backcons.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.planair.backcons.service.EnterEventsService;

import javax.sql.DataSource;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;


@Service
@RequiredArgsConstructor
public class EnterEventServiceImpl implements EnterEventsService {

    private final DataSource dataSource;

    @Override
    public void enterEvent(String enterEvent) {
        try (Connection con = dataSource.getConnection()) {
            CallableStatement stmt=con.prepareCall("{call public.enter_event(?)}");
            stmt.setString(1, enterEvent);
            stmt.execute();
            stmt.close();
        } catch (SQLException e) {
            System.out.println(e.getErrorCode());
            e.getStackTrace();
        }
    }
}
