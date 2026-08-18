from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String

from database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    diamonds = Column(Integer, nullable=False)
    price = Column(Integer, nullable=False)
    currency = Column(String(10), default="TJS")


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    player_id = Column(String(50), nullable=False)
    product_id = Column(Integer, nullable=False)

    status = Column(
        String(30),
        default="waiting_payment"
    )

    receipt = Column(String(500), nullable=True)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )
