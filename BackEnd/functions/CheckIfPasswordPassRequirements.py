import re

def CheckPasswordRequirements(password) -> tuple:
    # Check the minimum length of the password
    if len(password) < 8:
        return False, "Password must be at least 8 characters long."
    
    # Check for both uppercase and lowercase characters
    if not re.search(r"[A-Z]", password):
        return False, "Password must contain at least one uppercase letter."
    
    if not re.search(r"[a-z]", password):
        return False, "Password must contain at least one lowercase letter."
    
    # Check for at least one numerical digit
    if not re.search(r"\d", password):
        return False, "Password must contain at least one number."
    
    # Check for at least one special character
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        return False, "Password must contain at least one special character."
    
    # If all conditions are met
    return True, "Password meets all requirements."

# Example usage:
result, message = CheckPasswordRequirements("P@ssw0rd")
print(result, message)  # Should print: True Password meets all requirements.

result, message = CheckPasswordRequirements("password")
print(result, message)  # Should print: False Password must contain at least one uppercase letter.
