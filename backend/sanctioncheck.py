import csv
from typing import List, Dict, Optional
import os

class SanctionCheckService:
    def __init__(self, file_path: Optional[str] = None):
        self.file_path = file_path or os.path.join(os.path.dirname(__file__), "sdn.csv")

    def check_name(self, name: str) -> List[Dict[str, str]]:
        """
        Check a name against the sanctions list
        
        Args:
            name: Name to check
            
        Returns:
            List of matching records
        """
        # Normalize the name for matching
        normalized_name = name.upper().replace(",", "").strip()

        matches = []
        with open(self.file_path, mode="r", encoding="utf-8") as csv_file:
            csv_reader = csv.reader(csv_file)
            for line in csv_reader:
                # Skip empty or malformed rows
                if len(line) < 2:
                    continue

                # Extract and normalize the name field
                record_name = line[1].strip().replace(",", "").upper()
                if normalized_name in record_name:
                    matches.append({
                        "Record_ID": line[0],
                        "Name": line[1],
                        "Description": line[11] if len(line) > 11 else "No description available"
                    })

        return matches

    def check_company(self, company: str) -> List[Dict[str, str]]:
        """
        Check a company name against the sanctions list
        
        Args:
            company: Company name to check
            
        Returns:
            List of matching records
        """
        # Normalize the company name for matching
        normalized_company = company.upper().replace(",", "").strip()

        matches = []
        with open(self.file_path, mode="r", encoding="utf-8") as csv_file:
            csv_reader = csv.reader(csv_file)
            for line in csv_reader:
                # Skip empty or malformed rows
                if len(line) < 2:
                    continue

                # Extract and normalize the company name field
                record_company = line[1].strip().replace(",", "").upper()
                if normalized_company in record_company:
                    matches.append({
                        "Record_ID": line[0],
                        "Company": line[1],
                        "Country": line[3] if len(line) > 3 else "Unknown",
                        "Description": line[11] if len(line) > 11 else "No description available"
                    })

        return matches


if __name__ == "__main__":
    # Test the service
    service = SanctionCheckService()
    
    # Test name check
    name_results = service.check_name("Maksym Petyak")
    print("Name Check Results:")
    print(name_results)
    
    # Test company check
    company_results = service.check_company("Test Corp")
    print("\nCompany Check Results:")
    print(company_results)
