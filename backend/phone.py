from dataclasses import dataclass

@dataclass
class PhoneCheckResult:
    phone_number: str

class PhoneService:
    def check_phone(self, phone_number: str) -> PhoneCheckResult:
        # For now, just return the phone number as is
        # You can add validation or additional phone number processing here later
        return PhoneCheckResult(phone_number=phone_number) 