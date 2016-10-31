// package react.app.server.config;

// import org.springframework.web.filter.CharacterEncodingFilter;
// import org.springframework.web.filter.DelegatingFilterProxy;
// import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;
// import org.springframework.boot.context.web.SpringBootServletInitializer;
// import org.springframework.boot.builder.SpringApplicationBuilder;
// import org.springframework.context.ApplicationContext;
// import org.springframework.boot.SpringApplication;
// import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
// import org.springframework.boot.autoconfigure.thymeleaf.ThymeleafAutoConfiguration;
// import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
// import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
// import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
// import org.springframework.context.annotation.PropertySource;
// import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
// import org.springframework.boot.autoconfigure.web.ErrorMvcAutoConfiguration;
// import react.app.server.ApplicationConfig;
// import javax.servlet.*;

// public class WebAppInitializer extends SpringBootServletInitializer {
    
//     @Bean
//     public static PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer() {
//         return new PropertySourcesPlaceholderConfigurer();
//     }

//     @Override
//     protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
//         return application.sources(ApplicationConfig.class);
//     }

//     public static void main(String... args) {
//         System.setProperty("spring.profiles.default", System.getProperty("spring.profiles.default", "dev"));
//         final ApplicationContext applicationContext = SpringApplication.run(ApplicationConfig.class, args);
//     }   
// }