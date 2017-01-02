#!/bin/bash
set -e

WIREMOCK_URL=http://repo1.maven.org/maven2/com/github/tomakehurst/wiremock-standalone/2.4.1/wiremock-standalone-2.4.1.jar
WIREMOCK_PATH=bin/wiremock-standalone-2.4.1.jar
WIREMOCK_MD5="fb1bca560d37e55c0e2c891f3597d125"

download_wiremock() {
  if which wget >/dev/null; then
    wget $WIREMOCK_URL -O $WIREMOCK_PATH
  else
    if which curl >/dev/null; then
      curl $WIREMOCK_URL -o $WIREMOCK_PATH
    else
      echo We need curl or wget in order to install wiremock for you >&2
      exit 2
    fi
  fi
}

mkdir -p bin
if [[ ! -f $WIREMOCK_PATH ]]; then
  echo "Could not find installed wiremock jar file. trying to download"
  download_wiremock
else
  WIREMOCK_ACTUAL_MD5=$(md5sum $WIREMOCK_PATH | cut -c -32)
  if [[ "$WIREMOCK_MD5" != "$WIREMOCK_ACTUAL_MD5" ]]; then
    echo "Installed wiremock seems corrupted, re-downloading"
    download_wiremock
  else
    echo "Wiremock found"
  fi
fi


