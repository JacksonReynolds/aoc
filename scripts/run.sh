#!/bin/bash

# Function to display usage information
usage() {
  echo "Usage: $0 --year <year> --day <day>"
  echo "       $0 -y <year> -d <day>"
  echo "Both --year and --day arguments are required."
  exit 1
}

# Parse arguments
while [[ "$#" -gt 0 ]]; do
  case $1 in
    --year|-y) year="$2"; shift ;;
    --day|-d) day="$2"; shift ;;
    *) echo "Unknown parameter passed: $1"; usage ;;
  esac
  shift
done

# Check if both arguments are provided
if [ -z "$year" ] || [ -z "$day" ]; then
  usage
fi

# Construct the file path
file_path="src/${year}/${day}.ts"

# Check if the file exists
if [ ! -f "$file_path" ]; then
  echo "Error: File $file_path does not exist."
  exit 1
fi

# Execute the TypeScript file
ts-node "$file_path"