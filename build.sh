#! /bin/bash

cd ./application && \
echo "$(tput setaf 2)[Stage 1 - Install NPM packages]$(tput sgr0)\n" && \
npm i && \
echo "\n$(tput setaf 2)[Stage 2 - Build angular app]$(tput sgr0)\n" && \
ng build --base-href /resources/ && cd .. && \
echo "\n$(tput setaf 2)[Stage 3 - Build desktop app]$(tput sgr0)\n" && \
neu update && \
neu build
# echo "\n$(tput setaf 2)[Stage 4 - Clear workspace]$(tput sgr0)\n" && \
# rm -rf ./resources