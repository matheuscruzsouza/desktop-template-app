#! /bin/bash

echo "$(tput setaf 2)[Please, type the project name]$(tput sgr0)\n"
read project_name

jq ".modes .window .title = \"${project_name}\"" neutralino.config.json > tmp.$$.json 
mv tmp.$$.json neutralino.config.json

project_binary_name=$(echo $project_name | tr ' ' '-' | tr '[:upper:]' '[:lower:]')

jq ".cli .binaryName = \"$project_binary_name\"" neutralino.config.json > tmp.$$.json 
mv tmp.$$.json neutralino.config.json

git remote remove origin > /dev/null

rm .git

git init > /dev/null

echo "$(tput setaf 2)[Well the project is ready.]$(tput sgr0)\n"