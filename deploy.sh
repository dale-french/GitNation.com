#!/bin/bash
curl --ftp-create-dirs -T *.* -u $ftp_login:$ftp_pass ftp://indigo.elastictech.org:21