import os
import json
import requests

def print_welcome_message():
    welcome_message = """
  _________    ___.        .___                    .__           _____       __         .__                  
 /   _____/__ _\_ |__    __| _/____   _____ _____  |__| ____   _/ ____\_____/  |_  ____ |  |__   ___________ 
 \_____  \|  |  \ __ \  / __ |/  _ \ /     \\__  \ |  |/    \  \   __\/ __ \   __\/ ___\|  |  \_/ __ \_  __ \
 /        \  |  / \_\ \/ /_/ (  <_> )  Y Y  \/ __ \|  |   |  \  |  | \  ___/|  | \  \___|   Y  \  ___/|  | \/
/_______  /____/|___  /\____ |\____/|__|_|  (____  /__|___|  /  |__|  \___  >__|  \___  >___|  /\___  >__|   
        \/          \/      \/            \/     \/        \/             \/          \/     \/     \/       
"""
    print(welcome_message)

def get_api_key():
    api_key_file = "securitytrails_api_key.txt"
    if os.path.exists(api_key_file):
        with open(api_key_file, "r") as file:
            api_key = file.read().strip()
    else:
        api_key = input("Enter your SecurityTrails API key: ")
        with open(api_key_file, "w") as file:
            file.write(api_key)
    return api_key

def get_subdomains(api_key, domain):
    url = f"https://api.securitytrails.com/v1/domain/{domain}/subdomains?children_only=false&include_inactive=true"
    headers = {
        "APIKEY": api_key,
        "accept": "application/json"
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json().get("subdomains", [])
    else:
        print(f"Failed to fetch subdomains: {response.status_code}")
        return []

def save_subdomains_to_file(domain, subdomains):
    filename = f"{domain}_subdomains.txt"
    with open(filename, "w") as file:
        for subdomain in subdomains:
            file.write(f"{subdomain}.{domain}\n")
    print(f"Subdomains saved to {filename}")

def main():
    print_welcome_message()
    api_key = get_api_key()
    domain = input("Enter the domain name: ")
    subdomains = get_subdomains(api_key, domain)
    save_subdomains_to_file(domain, subdomains)

if __name__ == "__main__":
    main()
