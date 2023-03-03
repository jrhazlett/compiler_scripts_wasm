#!/bin/zsh
#
# Run any code within the main project
#
cd /root/compiler_scripts_wasm || exit
#
# Install any necessary packages
# Reminder: The node_modules directory is mounted, so every run after the first should be very quick
#
npm i
#
# Reminders:
# In-container, the first argument should always be /root/target
# The 2nd argument is passed from the outside script
#
node src/index.js /root/target "$NAME_LANGUAGE"










































