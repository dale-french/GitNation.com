#!/bin/bash
find ./*.* -type f -exec curl -p --insecure  "ftp://ingigo.elastictech.com:21/FrontendAmsterdam.com/" --user "$ftp_login:$ftp_password" -T {} --ftp-create-dirs \;