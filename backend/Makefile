MAKE := make --no-print-directory

################################################################################
##                             DOCKER IMAGE BUILD                             ##
################################################################################

docker-build-dev:
	@API_BUILD_TARGET=development docker-compose build

docker-build-prod:
	@API_BUILD_TARGET=production docker-compose build

################################################################################
##                          NPM PACKAGE INSTALLATION                          ##
################################################################################

npm-install-packages:
	@docker-compose run --rm api npm install

npm-add-dev-package:
	@docker-compose run --rm api npm install --save-dev $(strip $(PACKAGE))

npm-rm-dev-package:
	@docker-compose run --rm api npm uninstall --save-dev $(strip $(PACKAGE))

npm-add-prod-package:
	@docker-compose run --rm api npm install --save-prod $(strip $(PACKAGE))

npm-rm-prod-package:
	@docker-compose run --rm api npm uninstall --save-prod $(strip $(PACKAGE))

################################################################################
##                               CODE PROCESSING                              ##
################################################################################

code-check:
	@docker-compose run --rm api npm run format:check
	@docker-compose run --rm api npm run lint:check

code-fix:
	@docker-compose run --rm api npm run format:fix
	@docker-compose run --rm api npm run lint:fix

################################################################################
##                               SHELL EXECUTION                              ##
################################################################################

shell-run:
	@docker-compose run --rm api /bin/bash

shell-exec:
	@docker-compose exec api /bin/bash

################################################################################
##                               TEST EXECUTION                               ##
################################################################################

run-tests-dev:
	@docker-compose run --rm api npm run test:dev

run-tests-prod:
	@docker-compose run --rm api npm run test:prod

################################################################################
##                                API EXECUTION                               ##
################################################################################

api-start:
	@docker-compose up

api-stop:
	@docker-compose down
