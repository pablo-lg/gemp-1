package ar.com.telecom.gemp.security.ldap;

public class LDAPLoginException extends RuntimeException{
	
	public LDAPLoginException(String security_login, Throwable cause) {
		super(security_login, cause);
	}

	public LDAPLoginException(String string) {
		super(string);
	}
	private static final long serialVersionUID = 3690758388749318450L;

}