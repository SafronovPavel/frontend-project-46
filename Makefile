install:
	npm ci

gendiff:
	node bin/gendiff.js

publish:
	npm publish --dry-run

lint:
	npx eslint .

jest tests:
	npx jest

test-coverage:
	npx test --coverage