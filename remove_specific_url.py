import re

def remove_domain(file_path, domain_to_remove, output_file_path):
    # Regular expression pattern to match the specified domain and its subdomains
    domain_pattern = re.compile(rf'https?://(?:[a-zA-Z0-9-]+\.)*{re.escape(domain_to_remove)}(?:/|$)|www\.(?:[a-zA-Z0-9-]+\.)*{re.escape(domain_to_remove)}(?:/|$)')
    
    # Read the contents of the input file
    with open(file_path, 'r') as file:
        content = file.read()
    

    cleaned_content = re.sub(domain_pattern, '', content)
    
  
    with open(output_file_path, 'w') as file:
        file.write(cleaned_content)
    
    print(f"Removed domain '{domain_to_remove}' and saved the result to {output_file_path}")

# Get user input
input_file_path = input("Enter the path to the input file: ")
domain_to_remove = input("Enter the domain you want to remove (e.g., example.com): ")
output_file_path = input("Enter the path to the output file: ")

# Remove the domain and its subdomains
remove_domain(input_file_path, domain_to_remove, output_file_path)
