def remove_duplicate_urls(input_file, output_file):
  try:
    with open(input_file, 'r') as infile, open(output_file, 'w') as outfile:

      unique_urls = set(line.strip() for line in infile)
      outfile.writelines(url + '\n' for url in unique_urls)
    print(f"Unique URLs saved to: {output_file}")

  except FileNotFoundError:
    print(f"Error: Input file '{input_file}' not found.")


input_file = input("Enter the path to the file containing URLs: ")
output_file = input("Enter the desired name for the output file (excluding .txt): ") + ".txt"
remove_duplicate_urls(input_file, output_file)