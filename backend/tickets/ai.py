def categorize_ticket(text):

    text = text.lower()

    if "payment" in text:
        return "Billing", "High"

    if "password" in text:
        return "Account", "Medium"

    if "login" in text:
        return "Authentication", "High"

    return "General", "Low"