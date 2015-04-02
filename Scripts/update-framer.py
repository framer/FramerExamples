import sys
import os
import tempfile
import shutil

def run(command):
	os.system(command)

path = os.path.join(os.path.dirname(__file__), "..", "Examples")
path = os.path.abspath(path)

def downloadFile(url, path):
	# os.system("curl -# '%s' | gzip -d > '%s'" % (url, path))
	os.system("curl -# '%s' > '%s'" % (url, path))

# Download the latest framer files
tempPath = tempfile.mkdtemp()

downloadFile(
	"http://builds.framerjs.com/86b7691/framer.js",
	os.path.join(tempPath, "framer.js"))

downloadFile(
	"http://builds.framerjs.com/86b7691/framer.js.map",
	os.path.join(tempPath, "framer.js.map"))


for fileName in os.listdir(path):
	
	filePath = os.path.join(path, fileName)

	if not filePath.endswith(".framer"):
		continue

	print "Updating Framer in '%s'" % filePath

	shutil.copyfile(
		os.path.join(tempPath, "framer.js"),
		os.path.join(filePath, "framer", "framer.js"))

	shutil.copyfile(
		os.path.join(tempPath, "framer.js.map"),
		os.path.join(filePath, "framer", "framer.js.map"))