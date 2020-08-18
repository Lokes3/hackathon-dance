from typing import Dict, List

from fastapi import FastAPI
from icecream import ic
from pydantic import BaseModel

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


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/dances/")
def create_dance(dance: Dance):
    ic(dance)
    return {
        "success": True,
    }
