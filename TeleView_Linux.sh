#!/bin/bash
echo Cerraremos Google Chrome

pm2 kill && 
pm2 start /opt/node/TeleView/bin/www --name=teleview && 
chromium-browser --args http://localhost:3000 --start-fullscreen 


