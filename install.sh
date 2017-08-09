#!/bin/bash
#
#

mkdir ~/.config/autostart/

cat >~/.config/autostart/autoChromium.desktop << EOL
line 1, [Desktop Entry]
line 2, Type=Application
line 3, Exec=/usr/bin/chromium-browser --noerrdialogs --disable-session-crashed-bubble --disable-infobars --kiosk http://www.website.com
line 4,Hidden=false
line 5,X-GNOME-Autostart-enabled=true
line 6,Name[en_US]=AutoChromium
line 7,Name=AutoChromium
line 8,Comment=Start Chromium when GNOME starts
EOL

