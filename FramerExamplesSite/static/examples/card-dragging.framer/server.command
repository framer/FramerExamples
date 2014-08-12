#!/usr/bin/env python

"""

Copyright (c) 2014 Koen Bok / Podium BV / framerjs.com

Small web server script that you can drop in and run from every Framer Studio 
project to serve it to the browser over http. This is great if you want to avoid
same origin policy errors in the browser, but also nice to preview it on another
device connected to the same network.

To use it, copy this file into your .framer project and double click it.

This script tries to be smart and:

- Report your local network ip address
- Automatically select an open port
- Reuse the same port for the same project (if possible)

"""

import sys
import os
import webbrowser
import subprocess
import socket

import SimpleHTTPServer
import SocketServer

def ipAddress():
	cmd = "ifconfig  | grep -E 'inet.[0-9]' | grep -v '127.0.0.1' | awk '{ print $2}'"
	proc = subprocess.Popen(cmd, shell=True,stdout=subprocess.PIPE)
	
	try:
		return proc.communicate()[0].replace('\n', '')
	except:
		return

def isPortOpen(host, port):

	s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	s.settimeout(0.5)

	try:
		s.connect((host, int(port)))
		s.shutdown(2)
		return False
	except Exception, e:
		return True

def getOpenPort(host, startPort):

	attempts = 0

	while True and attempts < 10:

		print "Trying", host, startPort

		if isPortOpen(host, startPort):
			return startPort
		
		startPort += 1
		attempts += 1

	raise Exception("Could not find open port from %s", startPort)


# This gives us a slightly faster server and makes sure we can re-use ports quickly
class Server(SocketServer.ThreadingMixIn, SocketServer.TCPServer):
	allow_reuse_address = True


if __name__ == "__main__":

	# Get the path for the project and find out this machines ip address
	path = os.path.dirname(__file__)
	ipv4 = ipAddress() or "127.0.0.1"

	# Generate a random port based on the path and make sure it's open
	rndm = int(str(path.__hash__())[-3:]) # Random 3 digit number based on the path
	port = 8000 + rndm
	port = getOpenPort("127.0.0.1", port)

	url = "http://127.0.0.1:%s" % port

	# Set up the web server
	handler = SimpleHTTPServer.SimpleHTTPRequestHandler
	httpd = Server(("", port), handler)
	os.chdir(path)

	print
	print "*** Running server at %s" % url
	print "*** Path:", path
	print "*** Type control-c or close this window to stop the server"
	print

	# Open the project in the browser and start the web server
	webbrowser.open(url)
	httpd.serve_forever()