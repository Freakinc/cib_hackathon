package ru.planair.backend.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;
import ru.planair.backend.kafka.entity.UserEntries;
import ru.planair.backend.repository.UserEntriesRepository;
import ru.planair.backend.service.UserEntriesService;

import javax.persistence.EntityManager;
import javax.sql.DataSource;
import java.sql.*;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserEntriesServiceImpl implements UserEntriesService {

    private final UserEntriesRepository repository;

    private final DataSource dataSource;

    private final EntityManager manager;


    @Override
    public String getReportOne(Integer id) {
        PreparedStatement preparedStatement = null;
        ResultSet rs = null;
        try (Connection con = dataSource.getConnection()) {
            preparedStatement = con.prepareStatement("SELECT get_report_1(?)");
            preparedStatement.setInt(1, id);
            preparedStatement.execute();
            rs = preparedStatement.getResultSet();
            if (rs.next()) {
                return rs.getString(1);
            }

        } catch (SQLException e) {
            System.out.println(e.getErrorCode());
        } finally {
            try {
                assert preparedStatement != null;
                preparedStatement.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
            try {
                assert rs != null;
                rs.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }

        }
        return "";
    }

    @Override
    public String getReportTwo(Integer id) {
        try (Connection con = dataSource.getConnection()) {
            PreparedStatement preparedStatement = con.prepareStatement("SELECT get_report_2(?) ");
            preparedStatement.setInt(1, id);
            preparedStatement.execute();
            ResultSet rs = preparedStatement.getResultSet();
            if (rs.next()) {
                return rs.getString(1);
            }
            preparedStatement.close();
            rs.close();
        } catch (SQLException e) {
            System.out.println(e.getErrorCode());
        }
        return ""; //todo close
    }

    @Override
    public String getReportThree(Integer id) {
        try (Connection con = dataSource.getConnection()) {
            PreparedStatement preparedStatement = con.prepareStatement("SELECT get_report_3(?) ");
            preparedStatement.setInt(1, id);
            preparedStatement.execute();
            ResultSet rs = preparedStatement.getResultSet();
            if (rs.next()) {
                return rs.getString(1);
            }
            preparedStatement.close();
            rs.close();
        } catch (SQLException e) {
            System.out.println(e.getErrorCode());
        }
        return ""; //todo close
    }

    @Override
    public String getReportFour(Integer id) {
        try (Connection con = dataSource.getConnection()) {
            PreparedStatement preparedStatement = con.prepareStatement("SELECT get_report_4(?) ");
            preparedStatement.setInt(1, id);
            preparedStatement.execute();
            ResultSet rs = preparedStatement.getResultSet();
            if (rs.next()) {
                return rs.getString(1);
            }
            preparedStatement.close();
            rs.close();
        } catch (SQLException e) {
            System.out.println(e.getErrorCode());
        }
        return ""; //todo close
    }


    @Override
    public List<UserEntries> userEntriesList() {
        return repository.findAll();
    }


//    public String callProc(Integer id) throws SQLException {
//
//
//        Connection con = dataSource.getConnection();
//        CallableStatement cstmt = con.prepareCall ("{call get_report_1(?)}");
//        cstmt.registerOutParameter(1, java.sql.Types.TINYINT, id);
//        cstmt.executeQuery();
//       return cstmt.getString(1);
//
//    }
//    @PersistenceContext
//    private EntityManager manager;
//
//    private DataSource dataSource;

}