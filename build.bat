:: ***************************************************************************
::   💾  Application:    dotNet Explorer
::   👱  Author:         Christopher Prindle
::   📑  Copyright:      Copyright ©️ 2020 Christopher Prindle
::   📆  Date:           May 2020
::   📜  License:        MIT
::
::   A graphical interface for the dotnet CLI. Provides the ability to create
::   new projects, browse and update project templates, and a host of other
::   available features.
:: ***************************************************************************

RM -R .\bin

MKDIR .\bin\client-scripts
MKDIR .\bin\images
MKDIR .\bin\settings
MKDIR .\bin\stylesheets

XCOPY /E /Y .\src\assets\* .\bin\assets\
XCOPY /E /Y .\src\client-scripts\* .\bin\client-scripts\
XCOPY /E /Y .\src\models\* .\bin\models\
COPY /Y .\src\settings.json .\bin\settings\settings.json
COPY /Y .\src\*.html .\bin\

:: Keep the commands below on the same line else it will stop at sass compilation
sass .\sass\main.sass .\bin\stylesheets\main.css && tsc  && electron --debug .