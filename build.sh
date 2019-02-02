rm -R ./bin

mkdir -p ./bin/client-scripts
mkdir -p ./bin/images
mkdir -p ./bin/photon
mkdir -p ./bin/stylesheets

cp ./src/*.html ./bin
cp -Tr ./src/client-scripts ./bin/client-scripts
cp -Tr ./src/assets ./bin/assets
cp -Tr ./src/models ./bin/models
cp -Tr ./src/photon ./bin/photon

sass ./sass/main.sass ./bin/stylesheets/main.css
tsc && electron .
