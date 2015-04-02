import sys
import os
import tempfile
import shutil

def run(command):
	os.system(command)

path = os.path.join(os.path.dirname(__file__), "..", "FramerExamplesSite", "static", "examples")
path = os.path.abspath(path)

for fileName in os.listdir(path):
	
	filePath = os.path.join(path, fileName)

	if not filePath.endswith(".framer"):
		continue

	# Copy index.html template if not exists

	if not os.path.exists(os.path.join(filePath, "index.html")):
		shutil.copyfile(
			os.path.join(os.path.dirname(__file__), "..", "Data", "example.html"),
			os.path.join(filePath, "index.html"),
		)

	shutil.copyfile(
		os.path.join(os.path.dirname(__file__), "..", "Data", "readme.md"),
		os.path.join(filePath, "readme.md"),
	)

	run("rm '%s/.temp.html'" % filePath)
	run("rm -Rf '%s/framer/backups'" % filePath)

	print "Zipping example project '%s'" % filePath

	run("cd '%s'; zip -r '%s.zip' '%s'" % (path, fileName, fileName))