rm -R .\bin
mkdir .\bin\
mkdir .\bin\css\
mkdir .\bin\scripts\
copy .\src\*.html .\bin
copy .\src\css\* .\bin\css
copy .\src\scripts\* .\bin\scripts
tsc && electron .