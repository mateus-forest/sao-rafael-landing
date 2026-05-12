Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Drawing.Common
$path = Join-Path (Get-Location) 'public\brands\amstel-ultra.png'
$tempPath = Join-Path (Get-Location) 'public\brands\amstel-ultra.tmp.png'
$source = [System.Drawing.Bitmap]::new($path)
$bitmap = New-Object System.Drawing.Bitmap($source.Width, $source.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.DrawImage($source, 0, 0, $source.Width, $source.Height)
$graphics.Dispose()
$source.Dispose()

$width = $bitmap.Width
$height = $bitmap.Height
$visited = New-Object 'bool[,]' $width, $height
$queue = [System.Collections.Generic.Queue[System.Drawing.Point]]::new()

function Add-Point([int]$x, [int]$y) {
  if ($x -lt 0 -or $x -ge $width -or $y -lt 0 -or $y -ge $height) { return }
  if ($visited[$x,$y]) { return }
  $visited[$x,$y] = $true
  $queue.Enqueue([System.Drawing.Point]::new($x,$y))
}

for ($x = 0; $x -lt $width; $x++) {
  Add-Point $x 0
  Add-Point $x ($height - 1)
}
for ($y = 0; $y -lt $height; $y++) {
  Add-Point 0 $y
  Add-Point ($width - 1) $y
}

while ($queue.Count -gt 0) {
  $p = $queue.Dequeue()
  $c = $bitmap.GetPixel($p.X, $p.Y)
  $isBg = $c.A -gt 0 -and $c.R -ge 240 -and $c.G -ge 240 -and $c.B -ge 240
  if (-not $isBg) { continue }
  $bitmap.SetPixel($p.X, $p.Y, [System.Drawing.Color]::FromArgb(0, $c.R, $c.G, $c.B))
  Add-Point ($p.X + 1) $p.Y
  Add-Point ($p.X - 1) $p.Y
  Add-Point $p.X ($p.Y + 1)
  Add-Point $p.X ($p.Y - 1)
}

$bitmap.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bitmap.Dispose()
Move-Item -LiteralPath $tempPath -Destination $path -Force
