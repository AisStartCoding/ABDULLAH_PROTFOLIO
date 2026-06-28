from django.urls import path

from . import views

urlpatterns = [
    path("portfolio/home/", views.portfolio_home, name="portfolio-home"),
    path("contact/", views.contact, name="contact"),
]
