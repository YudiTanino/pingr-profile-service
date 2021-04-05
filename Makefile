MAKE := make --no-print-directory

################################################################################
##                             DOCKER IMAGE BUILD                             ##
################################################################################

docker-build-dev:
	@API_BUILD_TARGET=development docker-compose build

docker-build-prod:
	@API_BUILD_TARGET=production docker-compose build
