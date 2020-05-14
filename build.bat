rm -R .\bin

mkdir .\bin\client-scripts
mkdir .\bin\images
mkdir .\bin\photon
mkdir .\bin\stylesheets

xcopy /E /Y .\src\*.html .\bin\
xcopy /E /Y .\src\client-scripts\* .\bin\client-scripts\
xcopy /E /Y .\src\assets\* .\bin\assets\
xcopy /E /Y .\src\models\* .\bin\models\
xcopy /E /Y .\src\photon\* .\bin\photon\

sass .\sass\main.sass .\bin\stylesheets\main.css && tsc  && electron --debug .