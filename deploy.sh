#!/bin/bash
find ./ -type f -exec curl -p --insecure --ftp-create-dirs "ftp://indigo.elastictech.org:21/FrontendAmsterdam.com/" --user "u2139_main:QYIBlqjr\!1*1" -T {}\;