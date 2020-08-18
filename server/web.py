import json
from typing import Dict, List

from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel

from server.db import save_dance

app = FastAPI()


class Position(BaseModel):
    name: str
    x: int
    y: int


class Formation(BaseModel):
    index: int
    description: str
    positions: List[Position]


class Dance(BaseModel):
    title: str
    dimensions: Dict
    choreography: List[Formation]

    def to_json(self):
        return json.dumps(jsonable_encoder(self))


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/dances/")
def create_dance(dance: Dance):
    dance = save_dance(dance)
    return {
        "success": True,
        "id": dance,
    }
