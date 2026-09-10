#!/usr/bin/env bash
# Mesma coisa da versão PowerShell, para macOS e Linux.
#   ./extrair-frames.sh "/caminho/VIRAL PRESETS"
set -euo pipefail

ORIGEM="${1:-$HOME/Google Drive/MEGAMENTE-BRAIN/VIRAL PRESETS}"
DESTINO="${2:-$ORIGEM/frames}"
SEGUNDOS=(1.5 4.0 6.5)

command -v ffmpeg >/dev/null || { echo "ffmpeg não encontrado."; exit 1; }
mkdir -p "$DESTINO"

n=0
shopt -s nullglob
for v in "$ORIGEM"/*.mp4; do
  n=$((n+1))
  base="$(basename "${v%.mp4}")"
  i=0
  for s in "${SEGUNDOS[@]}"; do
    i=$((i+1))
    ffmpeg -y -loglevel error -ss "$s" -i "$v" -frames:v 1 \
           -vf "scale=540:-1" "$DESTINO/$base--$i.png"
  done
  echo "[$n] $base"
done

echo "Pronto. $(ls "$DESTINO"/*.png | wc -l) frames em $DESTINO"
