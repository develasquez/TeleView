#!/bin/bash
echo Cerraremos Google Chrome

pkill chrome
nohup node bin/www > teleview.log & 
google-chrome --args --disable-web-security http://localhost:3000 --start-fullscreen 


