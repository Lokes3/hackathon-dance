import json
import sqlite3
from typing import Dict, List, Tuple


def get_dances(name) -> List[Tuple[int, str, Dict]]:
    c, conn = get_cursor()
    c.execute("SELECT id, name, data FROM dances WHERE name LIKE '%?%'", (name,))
    rows = c.fetchall()
    return list(rows)


def save_dance(dance):
    conn = sqlite3.connect("example.db")
    c, conn = get_cursor()
    # add another row
    c.execute(
        "INSERT INTO dances values (?, ?, ?) ON CONFLICT(id) DO UPDATE SET name=excluded.name, data=excluded.data",
        (dance.id, dance.name, json.dumps(dance)),
    )
    conn.commit()


def get_cursor():
    # open connection and get a cursor
    conn = sqlite3.connect("example.db")
    c = conn.cursor()
    # create schema for a new table
    c.execute("CREATE TABLE IF NOT EXISTS dances (id INTEGER, name, data)")
    conn.commit()
    return c, conn
