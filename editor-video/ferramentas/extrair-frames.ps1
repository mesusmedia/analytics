<#
  Extrai frames dos vídeos de preset para PNG.

  Por que existe: o ambiente remoto onde o editor é desenvolvido não tem
  decodificador H.264, então os .mp4 não podem ser lidos lá. PNG resolve,
  e ainda custa uma fração do tráfego.

  Uso:
    powershell -ExecutionPolicy Bypass -File extrair-frames.ps1

  Precisa do ffmpeg no PATH. Se não tiver:
    winget install Gyan.FFmpeg
#>

param(
  [string]$Origem  = "G:\Meu Drive\MEGAMENTE-BRAIN\VIRAL PRESETS",
  [string]$Destino = "G:\Meu Drive\MEGAMENTE-BRAIN\VIRAL PRESETS\frames",
  [double[]]$Segundos = @(1.5, 4.0, 6.5)
)

if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
  Write-Host "ffmpeg nao encontrado. Instale com: winget install Gyan.FFmpeg" -ForegroundColor Red
  exit 1
}

if (-not (Test-Path $Destino)) { New-Item -ItemType Directory -Path $Destino | Out-Null }

$videos = Get-ChildItem -Path $Origem -Filter *.mp4 -File
if ($videos.Count -eq 0) {
  Write-Host "Nenhum .mp4 em $Origem" -ForegroundColor Red
  exit 1
}

Write-Host "$($videos.Count) videos encontrados." -ForegroundColor Cyan
$n = 0

foreach ($v in $videos) {
  $n++
  $base = [System.IO.Path]::GetFileNameWithoutExtension($v.Name)
  $i = 0
  foreach ($s in $Segundos) {
    $i++
    $saida = Join-Path $Destino "$base--$i.png"
    # -ss antes de -i faz busca rapida; -vf scale limita o peso do arquivo
    & ffmpeg -y -loglevel error -ss $s -i $v.FullName -frames:v 1 `
             -vf "scale=540:-1" $saida 2>$null
  }
  Write-Host "[$n/$($videos.Count)] $base" -ForegroundColor DarkGray
}

$total = (Get-ChildItem $Destino -Filter *.png).Count
Write-Host "`nPronto. $total frames em:" -ForegroundColor Green
Write-Host $Destino
Write-Host "`nEspere o Drive sincronizar e me avise." -ForegroundColor Yellow
