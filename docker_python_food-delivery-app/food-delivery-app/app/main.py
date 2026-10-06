from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import uvicorn


app = FastAPI(title="Savor - Artisan Delivery")


# --------------------------------------------------
# Static files
# --------------------------------------------------
app.mount(
    "/static",
    StaticFiles(directory="app/static"),
    name="static"
)


# --------------------------------------------------
# Templates
# --------------------------------------------------
templates = Jinja2Templates(
    directory="app/templates"
)


# --------------------------------------------------
# Menu
# --------------------------------------------------
MENU_ITEMS = [
    {
        "id": 1,
        "name": "Truffle Glazed Burger",
        "category": "Burgers",
        "price": 14.50,
        "rating": 4.9,
        "prep_time": "20-25m",
        "desc": "Double dry-aged smash patties, melted raclette, black truffle aioli on brioche.",
        "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80"
    },
    {
        "id": 2,
        "name": "Fire-Roasted Margherita",
        "category": "Pizza",
        "price": 16.00,
        "rating": 4.8,
        "prep_time": "15-20m",
        "desc": "San Marzano tomatoes, buffalo mozzarella, garden basil, cold-pressed olive oil.",
        "image": "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=700&q=80"
    },
    {
        "id": 3,
        "name": "Salmon Poke Bowl",
        "category": "Healthy",
        "price": 15.25,
        "rating": 4.9,
        "prep_time": "10-15m",
        "desc": "Sashimi-grade salmon, edamame, ripe avocado, pickled radish over warm sushi rice.",
        "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80"
    },
    {
        "id": 4,
        "name": "Signature Tonkotsu Ramen",
        "category": "Asian",
        "price": 13.75,
        "rating": 4.7,
        "prep_time": "25-30m",
        "desc": "18-hour rich pork bone broth, chashu pork, marinated nitamago egg, scallions.",
        "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=700&q=80"
    },
    {
        "id": 5,
        "name": "Matcha Crepe Cake",
        "category": "Desserts",
        "price": 8.50,
        "rating": 4.9,
        "prep_time": "5-10m",
        "desc": "Twenty layers of handcrafted crepes layered with Kyoto ceremonial matcha cream.",
        "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80"
    },
    {
        "id": 6,
        "name": "Cold Brew Tonic & Citrus",
        "category": "Drinks",
        "price": 5.50,
        "rating": 4.6,
        "prep_time": "5m",
        "desc": "Single-origin Ethiopian cold brew with tonic, blood orange slice, and fresh rosemary.",
        "image": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=700&q=80"
    }
]


# --------------------------------------------------
# Home page
# --------------------------------------------------
@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.html",
        context={
            "items": MENU_ITEMS
        }
    )


# --------------------------------------------------
# Health check
# --------------------------------------------------
@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "food-delivery-frontend"
    }


# --------------------------------------------------
# Start server
# --------------------------------------------------
if __name__ == "__main__":
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000
    )
