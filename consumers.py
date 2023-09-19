# consumers.py

import json
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer

class RealTimeDataConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

        # Simulate real-time data streaming
        while True:
            data = {
                'timestamp': 'current_timestamp',  # Replace with your data
                'value': 'current_value',  # Replace with your data
            }
            await self.send(json.dumps(data))
            await asyncio.sleep(1)  # Adjust the frequency as needed
