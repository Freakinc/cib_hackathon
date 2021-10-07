//package ru.planair.backend.config;
//
//
//import org.springframework.boot.context.properties.ConfigurationProperties;
//import org.springframework.boot.jdbc.DataSourceBuilder;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.stereotype.Component;
//
//import javax.sql.DataSource;
//
//@Configuration
//@Component
//public class DataSourceConfiguration {
//
//    @Bean(name = "datasource")
//    @ConfigurationProperties(prefix = "datasource")
//    public DataSource dataSource(){
//        return DataSourceBuilder.create().build();
//    }
//}
