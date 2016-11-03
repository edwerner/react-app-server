package react.app.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.StandardPasswordEncoder;
import org.springframework.security.web.authentication.rememberme.TokenBasedRememberMeServices;
// import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.http.HttpMethod;


import react.app.server.account.AccountService;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private AccountService accountService;

    @Bean
    public TokenBasedRememberMeServices rememberMeServices() {
        return new TokenBasedRememberMeServices("remember-me-key", accountService);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new StandardPasswordEncoder();
	}

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
            .eraseCredentials(true)
            .userDetailsService(accountService)
            .passwordEncoder(passwordEncoder());
    }

    // @Override
    // public void configure(WebSecurity web) throws Exception {
    //     web.ignoring().antMatchers("/signup");
    // }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/signup", "/signin").permitAll()
                .antMatchers(HttpMethod.GET, "/", "/shop").permitAll()
                .antMatchers("/", "/favicon.ico", "/resources/**", "/orders", "/signup", "/signin").permitAll()
                .anyRequest().authenticated()
                .and()
            .rememberMe()
                .rememberMeServices(rememberMeServices())
                .key("remember-me-key")
            .and()
                .httpBasic().disable();
    }

    @Bean(name = "authenticationManager")
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}