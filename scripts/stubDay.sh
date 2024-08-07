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

# Check if both year and day are provided
if [ -z "$year" ] || [ -z "$day" ]; then
  usage
fi

# Create the directory if it doesn't exist
mkdir -p "src/${year}"

# Create the TypeScript file
ts_file="src/${year}/${day}.ts"
if [ ! -f "$ts_file" ]; then
  echo "// TypeScript file for year ${year}, day ${day}" > "$ts_file"
  echo "Created TypeScript file at $ts_file"
else
  echo "TypeScript file already exists at $ts_file"
fi

# Create the input file
input_file="src/${year}/inputs/${day}.txt"
if [ ! -f "$input_file" ]; then
  touch "$input_file"
  echo "Created input file at $input_file"
else
  echo "Input file already exists at $input_file"
fi