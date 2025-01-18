import smtplib
import dns.resolver
import socket

def verify_email(email_address):
    try: 
        # Step 1: Extract domain from the email address
        domain = email_address.split('@')[1]
        print("Domain split")

        # Step 2: Get the mail exchanger (MX) records for the domain
        mx_records = dns.resolver.resolve(domain, 'MX')
        mx_record = sorted(mx_records, key=lambda r: r.preference)[0].exchange.to_text()
        print("Got MX Record")

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


