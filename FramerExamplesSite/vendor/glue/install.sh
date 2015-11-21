#!/bin/sh

ln -s /Applications/Xcode6-Beta7.app /Applications/Xcode.app
ln -s /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.10.sdk /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.10.Internal.sdk

pip install --install-option="--prefix=`pwd`/package" glue

rm /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.10.Internal.sdk
rm /Applications/Xcode.app