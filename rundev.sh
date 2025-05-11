#!/bin/bash

osascript <<EOF
tell application "Terminal"
    do script "cd $(pwd)/frontend && npx vite --host"
    delay 1
    do script "cd $(pwd)/backend && npm run dev"
end tell
EOF