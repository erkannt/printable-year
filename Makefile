.PHONY: dev
dev: node_modules
	npx parcel -p 8080 src/index.html

node_modules: package.json package-lock.json
	npm install
	touch node_modules

.PHONY: check
check: lint prettier typecheck

.PHONY: lint
lint: node_modules
	npx eslint .

.PHONY: prettier
prettier: node_modules
	npx prettier --ignore-unknown --check '**'

.PHONY: typecheck
typecheck: node_modules
	npx tsc --noEmit

.PHONY: dev
format: node_modules
	npx prettier --ignore-unknown --write '**'

.PHONY: dev
build:
	npx parcel build src/index.html --no-source-maps --public-url https://erkannt.github.io/printable-year/

.PHONY: dev
clean:
	rm -rf node_modules
	rm -rf .parcel-cache
	rm -rf dist