rm -R ./bin

mkdir -p ./bin/css
mkdir -p ./bin/images
mkdir -p ./bin/photon
mkdir -p ./bin/scripts

cp ./src/*.html ./bin
cp -Tr ./src/assets ./bin/assets
cp -Tr ./src/css ./bin/css
cp -Tr ./src/photon ./bin/photon
cp -Tr ./src/scripts ./bin/scripts

tsc && electron .