import csv

# Function to check name against the list
def check_name(name, file_path):
    # Normalize the name for matching (convert to uppercase, remove extra spaces)
    normalized_name = name.upper().replace(",", "").strip()

    matches = []
    with open(file_path, mode="r", encoding="utf-8") as csv_file:
        csv_reader = csv.reader(csv_file)
        for line in csv_reader:
            # Skip empty or malformed rows
            if len(line) < 2:  # Ensure at least two columns (ID and Name) are present
                continue

            # Extract and normalize the name field (column 2 in your format)
            record_name = line[1].strip().replace(",", "").upper()
            if normalized_name in record_name:
                matches.append({
                    "Record ID": line[0],
                    "Name": line[1],
                    "Description": line[11] if len(line) > 11 else "No description available"
                })

    return matches

# Function to check company name against the list
def check_company(company, file_path):
    # Normalize the company name for matching (convert to uppercase, remove extra spaces)
    normalized_company = company.upper().replace(",", "").strip()

    matches = []
    with open(file_path, mode="r", encoding="utf-8") as csv_file:
        csv_reader = csv.reader(csv_file)
        for line in csv_reader:
            # Skip empty or malformed rows
            if len(line) < 2:  # Ensure at least two columns (ID and Company Name) are present
                continue

            # Extract and normalize the company name field (column 2 in your format)
            record_company = line[1].strip().replace(",", "").upper()
            if normalized_company in record_company:
                matches.append({
                    "Record ID": line[0],
                    "Company": line[1],
                    "Country": line[3] if len(line) > 3 else "Unknown",
                    "Description": line[11] if len(line) > 11 else "No description available"
                })

    return matches
