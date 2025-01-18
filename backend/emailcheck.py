import smtplib
import dns.resolver
import socket
from typing import Dict, Any, Set

class EmailCheckService:
    def __init__(self, sender_email: str = 'mail@benjaminwolba.com'):
        self.sender_email = sender_email
        self._private_domains = self._get_private_domains()
        self._disposable_domains = self._get_disposable_domains()

    def verify_email(self, email_address: str) -> bool:
        """
        Verify if an email address exists and can receive emails
        
        Args:
            email_address: Email address to verify
            
        Returns:
            bool: True if email exists and can receive messages
        """
        try: 
            # Step 1: Extract domain
            domain = email_address.split('@')[1]

            # Step 2: Get MX records
            try:
                mx_records = dns.resolver.resolve(domain, 'MX')
                mx_record = sorted(mx_records, key=lambda r: r.preference)[0].exchange.to_text()
            except Exception as e:
                print(f"MX record lookup failed: {e}")
                return False

            # Step 3: SMTP connection
            smtp = smtplib.SMTP()
            smtp.set_debuglevel(0)
            smtp.connect(mx_record)
            smtp.helo(socket.gethostname())
            smtp.mail(self.sender_email)

            # Step 4: Verify recipient
            code, message = smtp.rcpt(email_address)
            smtp.quit()

            # Step 5: Return result
            return code == 250

        except Exception as e:
            print(f"Email verification failed: {e}")
            return False

    def check_email(self, email_address: str) -> Dict[str, bool]:
        """
        Perform all email checks
        
        Args:
            email_address: Email address to check
            
        Returns:
            Dictionary with check results
        """
        return {
            "exists": self.verify_email(email_address),
            "is_private": self.is_private_email(email_address),
            "is_disposable": self.is_disposable_email(email_address)
        }

    def is_private_email(self, email_address: str) -> bool:
        """Check if email is from a private email provider"""
        try:
            domain = email_address.split('@')[1]
            return domain in self._private_domains
        except IndexError:
            raise ValueError("Invalid email address format")

    def is_disposable_email(self, email_address: str) -> bool:
        """Check if email is from a disposable email provider"""
        try:
            domain = email_address.split('@')[1]
            return domain in self._disposable_domains
        except IndexError:
            raise ValueError("Invalid email address format")

    @staticmethod
    def _get_private_domains() -> Set[str]:
        """Get set of known private email domains"""
        return {
            # Global
            "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "live.com", "msn.com", "aol.com", 
            "icloud.com", "protonmail.com", "gmx.com", "zoho.com", "mail.com", "yandex.com", 
            "fastmail.com", "hushmail.com", "tutanota.com",
            
            # Europe
            "orange.fr", "wanadoo.fr", "libero.it", "virgilio.it", "web.de", "freenet.de", "mail.ru",
            "rambler.ru", "tiscali.it", "gmx.net", "bluewin.ch",
            
            # Asia
            "qq.com", "163.com", "126.com", "sina.com", "sina.cn", "hanmail.net", "daum.net", 
            "naver.com", "yahoo.co.jp",
            
            # South America
            "bol.com.br", "terra.com.br", "uol.com.br", "ig.com.br", "globomail.com", "outlook.com.br",
            
            # Africa
            "mtn.co.za", "vodamail.co.za", "telkomsa.net",
            
            # Australia/New Zealand
            "bigpond.com", "optusnet.com.au", "xtra.co.nz"
        }

    @staticmethod
    def _get_disposable_domains() -> Set[str]:
        """Get set of known disposable email domains"""
        return {
            "mailinator.com", "10minutemail.com", "guerrillamail.com", "yopmail.com", "tempmail.com",
            "throwawaymail.com", "getnada.com", "trashmail.com", "fakeinbox.com", "maildrop.cc",
            "sharklasers.com"
        }


if __name__ == "__main__":
    # Test the service
    service = EmailCheckService()
    
    test_email = "test@example.com"
    results = service.check_email(test_email)
    
    print(f"Email Check Results for {test_email}:")
    print(f"Exists: {results['exists']}")
    print(f"Is Private: {results['is_private']}")
    print(f"Is Disposable: {results['is_disposable']}")