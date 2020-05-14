REM | ***************************************************************************
REM |   💾  Application:    dotNet Explorer
REM |   👱  Author:         Christopher Prindle
REM |   📑  Copyright:      Copyright ©️ 2020 Christopher Prindle
REM |   📆  Date:           May 2020
REM |   📜  License:        MIT
REM |
REM |   A graphical interface for the dotnet CLI. Provides the ability to create
REM |   new projects, browse and update project templates, and a host of other
REM |   available features.
REM | ***************************************************************************

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

REM | Keep the commands below on the same line else it will stop at sass compilation
sass .\sass\main.sass .\bin\stylesheets\main.css && tsc  && electron --debug .