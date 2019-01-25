rm -R .\bin

mkdir .\bin
mkdir .\bin\css
mkdir .\bin\images
mkdir .\bin\photon
mkdir .\bin\scripts

xcopy /E /Y .\src\*.html .\bin\
xcopy /E /Y .\src\css\* .\bin\css\
xcopy /E /Y .\src\images\* .\bin\images\
xcopy /E /Y .\src\photon\* .\bin\photon\
xcopy /E /Y .\src\scripts\* .\bin\scripts\

tsc && electron .