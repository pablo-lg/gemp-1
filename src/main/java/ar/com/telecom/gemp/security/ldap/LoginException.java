package ar.com.telecom.gemp.security.ldap;

public class LoginException extends RuntimeException{

	public LoginException(String security_login, Throwable cause) {
		super(security_login, cause);
	}

	public LoginException(String security_login) {
		super(security_login);
	}
	private static final long serialVersionUID = 4049356400960812343L;
}
