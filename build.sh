# ***************************************************************************
#   💾  Application:    dotNet Explorer
#   👱  Author:         Christopher Prindle
#   📑  Copyright:      Copyright ©️ 2020 Christopher Prindle
#   📆  Date:           May 2020
#   📜  License:        MIT
# 
#   A graphical interface for the dotnet CLI. Provides the ability to create
#   new projects, browse and update project templates, and a host of other
#   available features.
# ***************************************************************************

rm -R ./bin

mkdir -p ./bin/client-scripts
mkdir -p ./bin/images
mkdir -p ./bin/stylesheets

cp ./src/*.html ./bin
cp -Tr ./src/client-scripts ./bin/client-scripts
cp -Tr ./src/assets ./bin/assets
cp -Tr ./src/models ./bin/models

sass ./sass/main.sass ./bin/stylesheets/main.css
tsc && electron --debug .
