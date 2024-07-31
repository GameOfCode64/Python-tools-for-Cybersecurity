import requests

api_key = input("Enter Your Map Api Key: ");
api_key = 'YOUR_API_KEY'
endpoint = f"https://maps.googleapis.com/maps/api/geocode/json?address=New+York&key={api_key}"

response = requests.get(endpoint)
data = response.json()

if 'error_message' in data:
    print("Invalid API Key:", data['error_message'])
else:
    print("Valid API Key. Response:", data)
