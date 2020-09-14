package ar.com.telecom.gemp.security.ldap;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.naming.NamingException;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import io.jsonwebtoken.io.Decoders;

import com.identicum.ldap.LdapException;
import com.identicum.ldap.LdapServer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.BadCredentialsException;


public class SecurityActionLDAP {

    private final Logger log = LoggerFactory.getLogger(SecurityActionLDAP.class);

	
	private static final long serialVersionUID = 1L;
	private static final String APP_FILTER_TRANS = "*";

	private static final String LDAPSERVER = "ldapServer";
	private static final String LDAPPORT = "ldapPort";
	private static final String USERDN = "serviceAccountDN";
	private static final String USERPASS = "serviceAccountPwd";
	private static final String ROLEBSEDN = "roleDN";
	
	private String baseLDAPPath;
	private boolean success;
	private String userId;
	private String password;
	private String reason;
	private String keystorePassword;
	private Map<String, Object> session;
	private Map ctx = null;


	public Map<String, Object> login(String userInput, String passInput) throws Exception {
		
		Map<String,Object> respuesta = new HashMap<String, Object>();
		try {
			if (this.validateUserLDAP(userInput, passInput)) {

				LdapServer ldapServer = new LdapServer(this.ctx);
				Map user = ldapServer.getUser(userInput);
				String nombre = (String) ((List) user.get("givenName")).get(0);
				String apellido = (String) ((List) user.get("sn")).get(0);
				String email = (String) ((List) user.get("mail")).get(0);

				List roles = ldapServer.getUserRoles(userInput, APP_FILTER_TRANS);
				if(roles.isEmpty()){
					throw new BadCredentialsException("Eror al validar datos del usuario");

				}
				List perfil = new ArrayList<String>();
				
				String attributes[] = { "tvalue" };
				for (Object r : roles) {
					String rol = (String) r;
					Map role = ldapServer.getRole(rol, attributes);

					ArrayList<String> per = (ArrayList<String>) role.get("tvalue");
					perfil.add(per.get(0).toString());
					
				}   


				
				respuesta.put("nombre",nombre);
				respuesta.put("apellido",apellido);
				respuesta.put("email",email);
				respuesta.put("perfil",perfil);
                return respuesta;


			} else {
				throw new BadCredentialsException("Usuario LDAP invalido");

			}
		} catch (LDAPLoginException e) {
			throw new BadCredentialsException("Usuario LDAP invalido");

		} catch (LdapException e) {
			throw new BadCredentialsException("Eror al validar datos del usuario");
		}
	
	}
	
	/**
	 * Valida el usuario contra LDAP
	 * 
	 * @param user
	 * @return
	 * @throws Exception 
	 */
	private boolean validateUserLDAP(String user, String pass)
			throws Exception {

		try {
			this.ctx = connectIdent();
			LdapServer ldapServer = new LdapServer(this.ctx);
			if (ldapServer.authenticateUser(user, pass)) {
				System.out.println("usuario autenticado con exito");

			} else {
				System.out.println("usuario invalido");
				return false;
			}

			return true;
		} catch (NamingException ne) {
			ne.printStackTrace();
			return false;
		}
	}
	
	public Map connectIdent()	throws Exception {
        String roleBDN = "iWNZYo1UiobR+By4RJa7mSc/FWskn5UVcYmJXY/PNRLM5c3CzoO3Dv/3HAJ/lHbnQ/6SKbJNOtKNfHFh1beUZiO2yFUdMTtbHsv2UVgv7mN9QsE/Ro6aCz1a+fAB7rnFI35D/ian7KODkrcYJ0drqzV1IuBRHKrgDlYnJ0vPMktvyiyQ/2YOT/RryAHjZZTt";
		Map env = new HashMap<String, String>();;

		env.put("ldapServer","dlnx0067");
		env.put("ldapPort", "636");
		// env.put("rolesBaseDN",   EncryptionDecryption.decrypt(roleBDN));
		env.put("rolesBaseDN", "cn=GESTION_DE_EMPRENDIMIENTOS,cn=Level10,cn=RoleDefs,cn=RoleConfig,cn=AppConfig,cn=UserApplication,cn=DriverSet1,ou=Servicios,o=Telecom");
		env.put("serviceAccountDN","cn=z001699,ou=usuariosespeciales,ou=usuarios,o=telecom");
		env.put("serviceAccountPwd", "Tw49U#7uyWAp");		
		env.put("usersDefaultAttrs", "sn,givenName,fullName,uid,mail");
		
		return env;
	}
	
	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public void setSession(Map<String, Object> asession) {
		this.session = asession;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getBaseLDAPPath() {
		return baseLDAPPath;
	}

	public void setBaseLDAPPath(String baseLDAPPath) {
		this.baseLDAPPath = baseLDAPPath;
	}

	public String getKeystorePassword() {
		return keystorePassword;
	}

	public void setKeystorePassword(String keystorePassword) {
		this.keystorePassword = keystorePassword;
	}

	public Map<String, Object> getSession() {
		return session;
	}



}