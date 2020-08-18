import json
import os
from pathlib import Path
from typing import Dict, List

from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from fastapi.responses import FileResponse
from pydantic import BaseModel

from server import db

app = FastAPI()
dist_dir = Path(os.path.abspath(__file__)).parent.parent / "dist"


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
    return FileResponse(str(dist_dir / "index.html"))


@app.get("/client.f69400ca.js")
def read_js():
    return FileResponse(str(dist_dir / "client.f69400ca.js"))


@app.get("/client.f69400ca.css")
def read_css():
    return FileResponse(str(dist_dir / "client.f69400ca.css"))


@app.get("/dances/")
def get_dances(title: str):
    results = db.get_dances(title)
    return {"dances": [json.loads(r.data) for r in results]}


@app.post("/dances/")
def create_dance(dance: Dance):
    dance = db.save_dance(dance)
    return {
        "success": True,
        "id": dance,
    }
