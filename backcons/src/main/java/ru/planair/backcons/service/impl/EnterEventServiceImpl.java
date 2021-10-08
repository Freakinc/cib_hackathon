package ru.planair.backcons.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.planair.backcons.service.EnterEventsService;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;


@Service
@RequiredArgsConstructor
public class EnterEventServiceImpl implements EnterEventsService {

    private final DataSource dataSource;

    @Override
    public void enterEvent(String enterEvent) {
        try (Connection con = dataSource.getConnection()) {
            PreparedStatement preparedStatement = con.prepareStatement("SELECT enter_event(?) ");
            preparedStatement.setString(1, enterEvent);
            preparedStatement.executeQuery();
            preparedStatement.close();
        } catch (SQLException e) {
            System.out.println(e.getErrorCode());
        }
    }


}
