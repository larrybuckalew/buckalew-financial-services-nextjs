#!/bin/bash
npm install @prisma/client
npx prisma generate
npm install
npm run build
npm run dev
