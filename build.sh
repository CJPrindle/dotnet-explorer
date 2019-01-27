rm -R ./bin

mkdir -p ./bin/client-scripts
mkdir -p ./bin/css
mkdir -p ./bin/images
mkdir -p ./bin/photon

cp ./src/*.html ./bin
cp -Tr ./src/client-scripts ./bin/client-scripts
cp -Tr ./src/assets ./bin/assets
cp -Tr ./src/css ./bin/css
cp -Tr ./src/models ./bin/models
cp -Tr ./src/photon ./bin/photon

tsc && electron .