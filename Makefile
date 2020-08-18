.PHONY: init
init:
	yarn
	pip install -r requirements.txt


.PHONY: server
server:
	uvicorn --reload server.web:app



.PHONY: test
test:
	pytest
	yarn run jest
