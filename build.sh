#! /bin/bash

project_name=`jq -r '.modes .window .title' neutralino.config.json`
project_title=`jq -r '.cli .binaryName' neutralino.config.json`
project_folder=$PWD/dist/${project_title} 

cd ./application

echo "$(tput setaf 2)[Starting to build the ${project_name} project]$(tput sgr0)\n"

echo "$(tput setaf 2)[Stage 1 - Install NPM packages]$(tput sgr0)\n"
npm i

echo "\n$(tput setaf 2)[Stage 2 - Build angular app]$(tput sgr0)\n"
ng build --base-href /resources/ && cd ..

echo "\n$(tput setaf 2)[Stage 3 - Clear dist folder]$(tput sgr0)\n" && \
rm -rf ./dist

echo "\n$(tput setaf 2)[Stage 4 - Build desktop app]$(tput sgr0)\n"
neu update && neu build

echo "\n$(tput setaf 2)[Stage 5 - Create the .desktop file]$(tput sgr0)\n" && \

cat >./dist/${project_title}/${project_title}.desktop <<EOL
[Desktop Entry]
Encoding=UTF-8
Version=1.0
Type=Application
Terminal=false
Exec=${project_folder}/${project_title}-linux_x64
Name=${project_name}
Icon=${project_folder}/${project_title}.png
EOL

cp resources/assets/icons/appIcon.png dist/${project_title}/${project_title}.png

echo "\n$(tput setaf 2)[Stage 6 - Clear workspace]$(tput sgr0)\n" && \
rm -rf ./resources