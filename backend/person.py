class Person:
    def __init__(self, name: str, email: str, nationality: str, linkedin_url: str):
        self.name = name
        self.email = email
        self.nationality = nationality
        self.linkedin_url = linkedin_url

    def __str__(self):
        return (
            f"Name: {self.name}\n"
            f"Email: {self.email}\n"
            f"Nationality: {self.nationality}\n"
            f"LinkedIn: {self.linkedin_url}"
        )

    def update_email(self, new_email: str):
        if "@" in new_email and "." in new_email:
            self.email = new_email
        else:
            raise ValueError("Invalid email format.")

    def update_linkedin_url(self, new_url: str):
        if new_url.startswith("https://") and "linkedin.com" in new_url:
            self.linkedin_url = new_url
        else:
            raise ValueError("Invalid LinkedIn URL.")

# Example usage:
# person = Person("John Doe", "john.doe@example.com", "American", "https://linkedin.com/in/johndoe")
# print(person)
