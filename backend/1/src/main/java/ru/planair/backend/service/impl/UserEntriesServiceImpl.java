package ru.planair.backend.service.impl;

import org.springframework.stereotype.Service;
import ru.planair.backend.service.UserEntriesService;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@Service
public class UserEntriesServiceImpl implements UserEntriesService {

    @PersistenceContext
    private EntityManager manager;

    private DataSource dataSource;

    public String getFunction (long customerId) {
        try (Connection connection = dataSource.getConnection()) {
            String sql = "select distinct c.category_id," +
                    " c.category_name" +
                    " from category as c" +
                    " join operation_category oc on c.category_id = oc.category_id" +
                    " join operation o on o.operation_id = oc.operation_id" +
                    " join account a on a.account_id = o.from_account_id" +
                    " where customer_id=?";
            PreparedStatement ps = connection.prepareStatement(sql);
            ps.setLong(1, customerId);
            ResultSet rs = ps.executeQuery();
            String report = "";
            while (rs.next()) {
                CategoryModel categoryModel = extractCategoryFromResultSet(rs);
                categoryModelList.add(categoryModel);
            }
            categoryModel.setCategoryId(rs.getLong("category_id"));
            categoryModel.setCategoryName(rs.getString("category_name"));


            return categoryModelList;
        } catch (SQLException e) {

        }
    }

}
