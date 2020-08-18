.PHONY: init
init:
	yarn
	pip install -r requirements.txt


.PHONY: server
server:
	uvicorn --reload server.server:app
