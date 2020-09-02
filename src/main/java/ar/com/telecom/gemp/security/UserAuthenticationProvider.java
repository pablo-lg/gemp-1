package ar.com.telecom.gemp.security;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;



@Component("authenticationProvider")

public class UserAuthenticationProvider implements AuthenticationProvider {

    @Override
    public Authentication authenticate(Authentication auth) 
      throws AuthenticationException {
        String username = auth.getName();
        String password = auth.getCredentials()
            .toString();
        List<GrantedAuthority> grantedAuths = new ArrayList<>();
            grantedAuths.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
            grantedAuths.add(new SimpleGrantedAuthority("ROLE_USER"));
        if ("pablo".equals(username) && "pablo".equals(password)) {
            return new UsernamePasswordAuthenticationToken
              (username, password, grantedAuths);
        } else {
            throw new 
              BadCredentialsException("External system authentication failed");
        }
    }

    @Override
    public boolean supports(Class<?> auth) {
        return auth.equals(UsernamePasswordAuthenticationToken.class);
    }
}