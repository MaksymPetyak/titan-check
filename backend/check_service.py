from typing import Optional
from request_parser import BackgroundCheckQueryParser, QueryParameters
from emailcheck import EmailCheckService
from sanctioncheck import SanctionCheckService
from linkedin import LinkedInService
from models import CheckResult, EmailCheckResult, SanctionCheckResult, LinkedInProfile

class CheckService:
    def __init__(self):
        self.parser = BackgroundCheckQueryParser()
        self.email_service = EmailCheckService()
        self.sanction_service = SanctionCheckService()
        self.linkedin_service = LinkedInService()

    def process_query(self, query: str) -> CheckResult:
        """
        Process a query string and run all available checks.
        Returns a structured CheckResult with all check results.
        """
        # Parse the query
        params: QueryParameters = self.parser.parse(query)
        
        # Initialize result
        result = CheckResult()
        
        # Run email checks if email is provided
        if params.email:
            result.email_check = self.email_service.check_email(params.email)
        
        # Run sanction checks if name or company is provided
        if params.name or params.company:
            sanction_result = SanctionCheckResult()
            if params.name:
                sanction_result.name_matches = self.sanction_service.check_name(params.name)
            if params.company:
                sanction_result.company_matches = self.sanction_service.check_company(params.company)
            result.sanction_check = sanction_result
        
        # Run LinkedIn checks if LinkedIn profile is provided
        if params.linkedIn:
            result.linkedin_profile = self.linkedin_service.get_profile_data(params.linkedIn)
        
        return result


if __name__ == "__main__":
    # Test the service
    service = CheckService()
    
    example_text = """
    Name: Maksym Petyak
    email: petyak.mi@gmail.com
    linkedIn: https://www.linkedin.com/in/maksym-petyak/
    """
    
    result = service.process_query(example_text)
    print("\nCheck Results:")
    print(result.model_dump_json(indent=2))
