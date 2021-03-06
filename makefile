install: ## Install dependencies
	@ npm i

run: ## Run application
	@ echo '* Start webpack dev server *'
	@ NODE_ENV=development TARGET=web ./node_modules/.bin/webpack-dev-server \
		-d \
		--host=0.0.0.0 \
		--port 9000 \
		--colors \
		--progress \
		--no-info \
		--hot \
		--quiet \
		--inline

.PHONY: test
test: ## Run unit tests
	@ cp -n config/test.dist.json config/test.json
	@ NODE_ENV=test ./node_modules/.bin/mocha --compilers js:babel-core/register --require babel-polyfill test/setup.js test/*.spec.js

build: ## Build with webpack
	@ mkdir -p dist
	@ ./node_modules/.bin/webpack -p
