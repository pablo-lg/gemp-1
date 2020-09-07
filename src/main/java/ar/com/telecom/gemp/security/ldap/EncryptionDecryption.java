package ar.com.telecom.gemp.security.ldap;

import java.security.SecureRandom;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Base64;


public class EncryptionDecryption {

    private static String salt;
    private static int iterations = 65536  ;
    private static int keySize = 256;
    private static byte[] ivBytes;

    private static SecretKey secretKey;

	static String PLAIN_TEXT = "asdasd as d asd ";
	static String ENCRYPTION_KEY = "!·$%&/()=abcde!";

	public static void main(String [] args) {
		try {

			System.out.println("Plain text:" + PLAIN_TEXT);

			String cipherText = EncryptionDecryption.encrypt(PLAIN_TEXT);

			System.out.println("Encrypted Text: " + cipherText);

			System.out.println("");

			String decrypted = EncryptionDecryption.decrypt(cipherText);

			System.out.println("Decrypted Text: " + decrypted);

		} catch (Exception e) {
			e.printStackTrace();
		} 
	}

    static String INITIALIZATIO_VECTOR = "AODVNUASDNVVAOVF";

  
    public static String encrypt(String plainText) throws Exception {
      Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding", "SunJCE");
      SecretKeySpec key = new SecretKeySpec(ENCRYPTION_KEY.getBytes("UTF-8"), "AES");
      cipher.init(Cipher.ENCRYPT_MODE, key,new IvParameterSpec(INITIALIZATIO_VECTOR.getBytes("UTF-8")));
      byte[] encrypted = cipher.doFinal(plainText.getBytes("UTF-8"));
      System.out.println("encrypted string: "  + Base64.encodeBase64String(encrypted));

      return Base64.encodeBase64String(encrypted);
    }
   
    public static String decrypt(String cipherTextStr) throws Exception{
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding", "SunJCE");
      SecretKeySpec key = new SecretKeySpec(ENCRYPTION_KEY.getBytes("UTF-8"), "AES");
      cipher.init(Cipher.DECRYPT_MODE, key,new IvParameterSpec(INITIALIZATIO_VECTOR.getBytes("UTF-8")));
      byte[] cipherText = Base64.decodeBase64(cipherTextStr);
      return new String(cipher.doFinal(cipherText),"UTF-8");
    }
    
    public static String getSalt() throws Exception {

        SecureRandom sr = SecureRandom.getInstance("SHA1PRNG");
        byte[] salt = new byte[20];
        sr.nextBytes(salt);
        return new String(salt);
    }
}
