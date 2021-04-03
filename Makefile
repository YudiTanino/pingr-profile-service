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
##                               SHELL EXECUTION                              ##
################################################################################

shell-run:
	@docker-compose run --rm api /bin/bash
