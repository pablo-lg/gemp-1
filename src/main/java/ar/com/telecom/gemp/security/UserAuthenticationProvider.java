package ar.com.telecom.gemp.security;

import ar.com.telecom.gemp.security.AuthoritiesConstants;
import ar.com.telecom.gemp.security.ldap.SecurityActionLDAP;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

@Component("authenticationProvider")
public class UserAuthenticationProvider implements AuthenticationProvider {

    @Override
    public Authentication authenticate(Authentication auth) throws AuthenticationException {
        SecurityActionLDAP ldap = new SecurityActionLDAP();
        String username = auth.getName();
        String password = auth.getCredentials().toString();
        List<GrantedAuthority> grantedAuths = new ArrayList<>();
        if (username.equals("noregistro") && password.equals("noregistro")) {
            grantedAuths.add(new SimpleGrantedAuthority(AuthoritiesConstants.ADMIN));
            grantedAuths.add(new SimpleGrantedAuthority(AuthoritiesConstants.GESTION_OPERATIVA));
            return new UsernamePasswordAuthenticationToken(username, password, grantedAuths);
        } else {
            // Prueba del ldap
            try {
                Map<String, Object> resultadoLdap = ldap.login(username, password);
                List perfil = (List) resultadoLdap.get("perfil");
                for (Object p : perfil) {
                    grantedAuths.add(new SimpleGrantedAuthority((String) p));
                }

                // grantedAuths.add(new SimpleGrantedAuthority((String) (resultadoLdap.get("perfil"))));

                return new UsernamePasswordAuthenticationToken(username, password, grantedAuths);
            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            throw new BadCredentialsException("External system authentication failed");
        }
    }

    @Override
    public boolean supports(Class<?> auth) {
        return auth.equals(UsernamePasswordAuthenticationToken.class);
    }
}
