#! /bin/bash

echo "$(tput setaf 2)[Please, type the project name]$(tput sgr0)\n"
read project_name

echo "\n$(tput setaf 2)[Configuring the project name]$(tput sgr0)\n"

jq ".modes .window .title = \"${project_name}\"" neutralino.config.json > tmp.$$.json 
mv tmp.$$.json neutralino.config.json

echo "$(tput setaf 2)[Configuring the project binary name]$(tput sgr0)\n"

project_binary_name=$(echo $project_name | tr ' ' '-' | tr '[:upper:]' '[:lower:]')

jq ".cli .binaryName = \"$project_binary_name\"" neutralino.config.json > tmp.$$.json 
mv tmp.$$.json neutralino.config.json

git remote remove origin > /dev/null

rm -rf .git > /dev/null

git init > /dev/null

echo "$(tput setaf 2)[Well the project is ready.]$(tput sgr0)\n"

rm -rf ./config.sh