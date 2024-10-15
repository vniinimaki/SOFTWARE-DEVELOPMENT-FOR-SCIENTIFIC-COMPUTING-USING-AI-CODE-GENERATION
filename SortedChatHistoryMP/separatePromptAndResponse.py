import re
import sys
import os

# Usage: python separatePromptAndResponse.py <filename>.md
# Generated with Copilot

# Get the filename from the command-line arguments
filename = sys.argv[1]

# Read the file
with open(filename, 'r') as file:
    data = file.read()

# Split the content into prompts and responses
pairs = re.split(r'(-{3,})', data)

# Define the filenames for the prompts and responses
prompts_filename = filename.replace('.md', '_prompts.md')
responses_filename = filename.replace('.md', '_responses.md')

# Open the files for the prompts and responses
with open(prompts_filename, 'w') as prompts_file, open(responses_filename, 'w') as responses_file:
    for i in range(0, len(pairs), 2):
        # Split each pair into prompt and response
        split_pair = re.split(r'(\*\*(.*?)\*\*)', pairs[i], flags=re.DOTALL)  # Split on the first occurrence of ** that is not followed by another **, and include newlines

        # Check if the split was successful
        if len(split_pair) >= 3:
            prompt = split_pair[2]  # The prompt is the second element in the list (between the first and second **)
            response = "".join(split_pair[3:])  # The response is everything after the prompt

            # Remove leading and trailing whitespace
            prompt = prompt.strip()
            response = response.strip()

            # Write the prompt and response to their respective files
            prompts_file.write(prompt + '\n\n')
            responses_file.write(response + '\n\n')

        # Add separator to prompts and responses file
        if i+1 < len(pairs):
            prompts_file.write(pairs[i+1] + '\n\n')
            responses_file.write(pairs[i+1] + '\n\n')

# Count the words in the prompts file
with open(prompts_filename, 'r') as file:
    prompts_word_count = len(file.read().split())

# Count the words in the responses file
with open(responses_filename, 'r') as file:
    responses_word_count = len(file.read().split())

# Rename the files to include the word count
os.rename(prompts_filename, prompts_filename.replace('.md', f'_{prompts_word_count}_words.md'))
os.rename(responses_filename, responses_filename.replace('.md', f'_{responses_word_count}_words.md'))