all: build

# update:
# 	python Scripts/update-framer.py

bootstrap:
	npm install

convert:
	python Scripts/coffee2js.py

build: bootstrap
	make convert

	rm -Rf FramerExamplesSite/static/examples/*
	cp -Rf Examples/*.framer FramerExamplesSite/static/examples/

	python Scripts/zip-projects.py

upload:
	cd FramerExamplesSite; cactus deploy

optimize:
	cd Examples; find . -name "*.png" -exec optipng -o3 {} \;

.PHONY: update