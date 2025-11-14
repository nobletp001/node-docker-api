#!/bin/bash
set -e

usage() {
  echo "Usage: $0 [--studio]"
  exit 1
}

RUN_STUDIO=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --studio)
      RUN_STUDIO=true
      shift
      ;;
    *)
      usage
      ;;
  esac
done

echo "🧹 Formatting Prisma schema..."
npx prisma format

echo "⚙️ Generating Prisma client..."
npx prisma generate

echo "🗃️ Applying migrations..."
npx prisma migrate dev

if [ "$RUN_STUDIO" = true ]; then
  echo "🖥️ Launching Prisma Studio..."
  npx prisma studio
else
  echo "✅ All Prisma commands completed successfully."
  echo "👉 Use './prisma-all.sh --studio' to open Prisma Studio."
fi
