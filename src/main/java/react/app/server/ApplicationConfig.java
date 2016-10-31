package react.app.server;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
// import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.thymeleaf.ThymeleafAutoConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.web.context.support.HttpRequestHandlerServlet;
import org.springframework.boot.context.embedded.ServletRegistrationBean;
import org.springframework.boot.autoconfigure.web.ErrorMvcAutoConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import react.app.server.Application;
import react.app.server.signup.SignupController;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.context.web.SpringBootServletInitializer;

@EnableAutoConfiguration(exclude={
    ThymeleafAutoConfiguration.class})
@PropertySource("classpath:persistence.properties")
@PropertySource("classpath:application.properties")
@ComponentScan
public class ApplicationConfig extends SpringBootServletInitializer {

    // public static void main(String[] args) {
    //     SpringApplication.run(ApplicationConfig.class, args);
    // }

    // @Bean
    // public static PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer() {
    //     return new PropertySourcesPlaceholderConfigurer();
    // }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(ApplicationConfig.class);
    }

    public static void main(String[] args) throws Exception {
        SpringApplication.run(ApplicationConfig.class, args);
    }

}