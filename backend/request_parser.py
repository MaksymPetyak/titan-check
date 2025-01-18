from pydantic import BaseModel
from llms import get_completion
import json


class QueryParameters(BaseModel):
    name: str | None = None
    linkedIn: str | None = None
    email: str | None = None
    company: str | None = None


class BackgroundCheckQueryParser:
    def __init__(self):
        pass

    def parse(self, query: str) -> QueryParameters:
        """
        Parse the query string using Mistral to extract structured information.
        Returns a QueryParameters object with the extracted information.
        """
        prompt = f"""Extract information about a person from the following query. 
Return a JSON object with the following fields (leave them null if not found):
- name: person's full name
- linkedIn: LinkedIn profile URL or username
- email: email address
- company: company name or organization

Query: {query}

Return only the JSON object, nothing else.

Output: """

        try:
            # Get structured response from Mistral
            response = get_completion(prompt, is_json=True)

            print(f"Response: {response}")
            
            # Parse JSON response
            data = json.loads(response)
            
            # Create and return QueryParameters object
            return QueryParameters(**data)
            
        except Exception as e:
            # If parsing fails, return empty parameters
            print(f"Error parsing query: {str(e)}")
            return QueryParameters()
    


if __name__ == "__main__":

    example_text = """
    Name: Maksym Petyak
    email: petyak.mi@gmail.com
    linkedIn: https://www.linkedin.com/in/maksym-petyak/
    """

    parser = BackgroundCheckQueryParser()
    print(parser.parse(query=example_text))