// package react.app.server.config;

// import java.net.UnknownHostException;

// import com.mongodb.Mongo;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.context.annotation.Lazy;
// import org.springframework.data.mongodb.MongoDbFactory;
// import org.springframework.data.mongodb.core.MongoTemplate;
// import org.springframework.data.mongodb.core.SimpleMongoDbFactory;
// import org.springframework.data.mongodb.core.convert.DefaultMongoTypeMapper;
// import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
// import org.springframework.data.mongodb.core.convert.MongoTypeMapper;
// import org.springframework.data.mongodb.core.mapping.MongoMappingContext;
// import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
// import react.app.server.ApplicationConfig;
// import java.util.Properties;

// import javax.persistence.EntityManagerFactory;
// import javax.sql.DataSource;

// import com.zaxxer.hikari.HikariConfig;
// import com.zaxxer.hikari.HikariDataSource;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;
// import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
// import org.springframework.orm.jpa.JpaTransactionManager;
// import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
// import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
// import org.springframework.transaction.PlatformTransactionManager;
// import org.springframework.transaction.annotation.EnableTransactionManagement;
// import org.springframework.boot.context.properties.ConfigurationProperties;
// import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
// import org.springframework.util.ClassUtils;

// @Configuration
// @Lazy
// @EnableTransactionManagement
// @EnableMongoRepositories(mongoTemplateRef="mongoTemplate",
//     value="react.app.server.account",
//     basePackageClasses=ApplicationConfig.class)
// class MongoConfig {

//     @Value("${dataSource.jdbcDriver}")
//     private String driver;
//     @Value("${dataSource.url}")
//     private String url;
//     @Value("${dataSource.username}")
//     private String username;
//     @Value("${dataSource.password}")
//     private String password;
//     @Value("${hibernate.dialect}")
//     private String dialect;
//     @Value("${hibernate.hbm2ddl.auto}")
//     private String hbm2ddlAuto;

// // MongoClient mongoClient = new MongoClient("localhost");
// // String dbURI = "mongodb://localhost";
// // MongoClient mongoClient = new MongoClient(new MongoClientURI(dbURI));

//     @Bean
//     // @ConfigurationProperties(prefix="dataSource")
//     public DataSource dataSource() {
//         return DataSourceBuilder.create()
//                 .url(url)
//                 .username(username)
//                 .password(password)
//                 .driverClassName(driver)
//                 .build();
//     }

//     @Bean
//     public LocalContainerEntityManagerFactoryBean entityManagerFactory(DataSource dataSource) {
//         LocalContainerEntityManagerFactoryBean entityManagerFactoryBean = new LocalContainerEntityManagerFactoryBean();
//         entityManagerFactoryBean.setDataSource(dataSource);

//         String entities = ClassUtils.getPackageName(ApplicationConfig.class);
//         String converters = ClassUtils.getPackageName(Jsr310JpaConverters.class);
//         entityManagerFactoryBean.setPackagesToScan(entities, converters);

//         entityManagerFactoryBean.setJpaVendorAdapter(new HibernateJpaVendorAdapter());

//         Properties jpaProperties = new Properties();
//         jpaProperties.put(org.hibernate.cfg.Environment.DIALECT, dialect);
//         jpaProperties.put(org.hibernate.cfg.Environment.HBM2DDL_AUTO, hbm2ddlAuto);
//         entityManagerFactoryBean.setJpaProperties(jpaProperties);

//         return entityManagerFactoryBean;
//     }

//     @Bean
//     public PlatformTransactionManager transactionManager(EntityManagerFactory entityManagerFactory) {
//         return new JpaTransactionManager(entityManagerFactory);
//     }

//     @Bean
//     public MongoDbFactory mongoDbFactory() throws UnknownHostException {
//         return new SimpleMongoDbFactory(new Mongo(), "accounts");
//     }

//     @Bean
//     public MongoTemplate mongoTemplate() throws UnknownHostException {
//         MongoTemplate template = new MongoTemplate(mongoDbFactory(), mongoConverter());
//         return template;
//     }

//     @Bean
//     public MongoTypeMapper mongoTypeMapper() {
//         return new DefaultMongoTypeMapper(null);
//     }

//     @Bean
//     public MongoMappingContext mongoMappingContext() {
//         return new MongoMappingContext();
//     }

//     @Bean
//     public MappingMongoConverter mongoConverter() throws UnknownHostException {
//         MappingMongoConverter converter = new MappingMongoConverter(mongoDbFactory(), mongoMappingContext());
//         converter.setTypeMapper(mongoTypeMapper());
//         return converter;
//     }
// }
