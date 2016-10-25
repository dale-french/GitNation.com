#!/bin/bash
find ./*.* -type f -exec curl -p --insecure  "ftp://ingigo.elastictech.com:21/FrontendAmsterdam.com/" --user "u2139_main:QYIBlqjr\!1*1" -T {} --ftp-create-dirs \;