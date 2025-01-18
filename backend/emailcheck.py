import smtplib
import dns.resolver
import socket

def verify_email(email_address):
    try: 
        # Step 1: Extract domain from the email address
        domain = email_address.split('@')[1]
        print("Domain split")

        # Step 2: Get the mail exchanger (MX) records for the domain
        try:
            mx_records = dns.resolver.resolve(domain, 'MX')
            mx_record = sorted(mx_records, key=lambda r: r.preference)[0].exchange.to_text()
            print("Got MX Record:", mx_record)
        except dns.resolver.NoAnswer:
            print("No MX records found for the domain.")
        except dns.resolver.NXDOMAIN:
            print("The domain does not exist.")
        except dns.exception.Timeout:
            print("DNS query timed out.")
        except Exception as e:
            print(f"Unexpected error: {e}")

        # Step 3: Establish an SMTP connection
        smtp = smtplib.SMTP()
        smtp.set_debuglevel(0)
        smtp.connect(mx_record)
        smtp.helo(socket.gethostname())
        smtp.mail('mail@benjaminwolba.com')  # Replace with a sender email address
        print("Establish SMTP")

        # Step 4: Verify the recipient
        code, message = smtp.rcpt(email_address)
        smtp.quit()
        print("Recipient verified")

        # Step 5: Interpret the response
        if code == 250:
            print("Email exists")
            return True  # Email exists and can receive messages
        else:
            return False  # Email cannot receive messages

    except Exception as e:
        return False


def is_private_email(email_address):
    # List of known private email domains
    private_domains = {
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
        "bigpond.com", "optusnet.com.au", "xtra.co.nz",
        
        # Disposable/Temporary
        "mailinator.com", "10minutemail.com", "guerrillamail.com", "yopmail.com", "tempmail.com",
        "throwawaymail.com", "getnada.com", "trashmail.com", "fakeinbox.com", "maildrop.cc",
        "sharklasers.com"
    }

    try:
        # Extract domain from the email address
        domain = email_address.split('@')[1]

        # Check if the domain is in the list of private email providers
        if domain in private_domains:
            return True  # It's a private email
        else:
            return False  # It's likely a corporate or custom email
    except IndexError:
        raise ValueError("Invalid email address format")

def is_disposable_email(email_address):
    # List of known disposable email domains
    disposable_domains = {
        "mailinator.com", "10minutemail.com", "guerrillamail.com", "yopmail.com", "tempmail.com",
        "throwawaymail.com", "getnada.com", "trashmail.com", "fakeinbox.com", "maildrop.cc",
        "sharklasers.com"
    }

    try:
        # Extract domain from the email address
        domain = email_address.split('@')[1]
        
        # Check if the domain is in the list of disposable email providers
        if domain in disposable_domains:
            return True  # It's a disposable email
        else:
            return False
    except IndexError:
        raise ValueError("Invalid email address format")