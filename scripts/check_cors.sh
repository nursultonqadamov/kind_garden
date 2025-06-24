#!/bin/bash

echo "🔍 CORS konfiguratsiyasini tekshirish..."

# Django server ishlab turganini tekshirish
echo "1. Django server holatini tekshirish:"
curl -I http://127.0.0.1:8000/api/auth/login/ 2>/dev/null | head -1

# CORS headers mavjudligini tekshirish
echo "2. CORS headers tekshirish:"
curl -H "Origin: http://localhost:3000" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     http://127.0.0.1:8000/api/auth/login/ \
     -v 2>&1 | grep -i "access-control"

echo "3. Oddiy GET so'rov:"
curl -X GET http://127.0.0.1:8000/api/auth/profile/ \
     -H "Origin: http://localhost:3000" \
     -v 2>&1 | grep -i "access-control"
