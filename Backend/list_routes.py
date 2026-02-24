from app import create_app

app = create_app()

print("\n=== All Registered Routes ===\n")
for rule in app.url_map.iter_rules():
    methods = ','.join(sorted(rule.methods - {'HEAD', 'OPTIONS'}))
    print(f"{rule.endpoint:30s} {methods:20s} {rule.rule}")
