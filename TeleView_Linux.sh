#!/bin/bash
echo Cerraremos Google Chrome

#pkill chromium-browser
nohup node bin/www > teleview.log & 
chromium-browser --args --disable-web-security http://localhost:3000 --start-fullscreen 


