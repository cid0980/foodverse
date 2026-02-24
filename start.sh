#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
FRONTEND_DIR="$ROOT_DIR/frontend"
BACKEND_PORT="${BACKEND_PORT:-5000}"
FRONTEND_PORT="${FRONTEND_PORT:-5173}"

if [[ ! -d "$BACKEND_DIR" || ! -d "$FRONTEND_DIR" ]]; then
  echo "Missing backend or frontend directory." >&2
  exit 1
fi

if command -v systemctl >/dev/null 2>&1; then
  if systemctl list-unit-files | grep -q '^mongod\\.service'; then
    echo "Starting MongoDB (mongod)..."
    sudo systemctl start mongod || true
  fi
fi

if [[ ! -f "$BACKEND_DIR/.env" ]]; then
  echo "Missing backend/.env. Copying from .env.example" >&2
  cp "$BACKEND_DIR/.env.example" "$BACKEND_DIR/.env"
  echo "Please edit backend/.env with your MONGO_URI and JWT_SECRET." >&2
fi

if [[ ! -d "$BACKEND_DIR/node_modules" ]]; then
  echo "Installing backend dependencies..."
  (cd "$BACKEND_DIR" && npm install)
fi

if [[ ! -d "$FRONTEND_DIR/node_modules" ]]; then
  echo "Installing frontend dependencies..."
  (cd "$FRONTEND_DIR" && npm install)
fi

cleanup() {
  if [[ -n "${BACKEND_PID:-}" ]] && kill -0 "$BACKEND_PID" 2>/dev/null; then
    kill "$BACKEND_PID"
  fi
}
trap cleanup EXIT

port_in_use() {
  local port="$1"
  if command -v ss >/dev/null 2>&1; then
    ss -ltn | awk '{print $4}' | grep -q ":${port}$"
    return $?
  fi
  if command -v lsof >/dev/null 2>&1; then
    lsof -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1
    return $?
  fi
  return 1
}

echo "Starting backend..."
if port_in_use "$BACKEND_PORT"; then
  echo "Port $BACKEND_PORT is already in use. Skipping backend start."
else
  (cd "$BACKEND_DIR" && PORT="$BACKEND_PORT" npm run dev) &
  BACKEND_PID=$!
fi

sleep 1

echo "Starting frontend..."
if port_in_use "$FRONTEND_PORT"; then
  echo "Port $FRONTEND_PORT is already in use. Skipping frontend start."
else
  (cd "$FRONTEND_DIR" && VITE_API_BASE="/api" npm run dev)
fi
