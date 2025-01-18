from sanctioncheck import check_name, check_company
from emailcheck import verify_email


# name_to_check = "Benjamin Berthold Wolba"
name_to_check = "Abu Abbas"
company_to_check = "TROPIC TOURS GMBH"
email = "contact@jonas-geisler.com"

# Check the name and print results
"""
file_path = "sdn.csv"
results = check_name(name_to_check, file_path)
if results:
    print(f"Matches found for '{name_to_check}':")
    for result in results:
        print(f"ID: {result['Record ID']}, Name: {result['Name']}, Description: {result['Description']}")
else:
    print(f"No matches found for '{name_to_check}'.")
#"""

# Check the company name and print results
"""
company_results = check_company(company_to_check, file_path)
if company_results:
    print(f"Matches found for company '{company_to_check}':")
    for result in company_results:
        print(f"ID: {result['Record ID']}, Company: {result['Company']}, Country: {result['Country']}, Description: {result['Description']}")
else:
    print(f"No matches found for company '{company_to_check}'.")
#"""

# Check E-Mail 
#"""
if __name__ == "__main__":
    email = "contact@jonas-geisler.com" 
    if verify_email(email):
        print(f"The email address {email} exists and can receive emails.")
    else:
        print(f"The email address {email} does not exist or cannot receive emails.") 
#"""