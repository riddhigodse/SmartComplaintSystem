import requests
import json

# Test login endpoint
url = "http://localhost:5000/api/login"

# Test credentials
test_cases = [
    {"email": "admin@example.com", "password": "admin123", "expected": "admin"},
    {"email": "user@example.com", "password": "user123", "expected": "user"},
    {"email": "admin@godse.com", "password": "wrong", "expected": "fail"},
]

print("\n=== Testing Login Endpoint ===\n")

for test in test_cases:
    print(f"Testing: {test['email']}")
    
    try:
        response = requests.post(
            url,
            json={"email": test["email"], "password": test["password"]},
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Success! Role: {data.get('role')}, User ID: {data.get('user_id')}")
            print(f"   Token: {data.get('access_token')[:50]}...")
        else:
            print(f"❌ Failed! Status: {response.status_code}")
            print(f"   Error: {response.json()}")
            
    except Exception as e:
        print(f"❌ Exception: {str(e)}")
    
    print()
