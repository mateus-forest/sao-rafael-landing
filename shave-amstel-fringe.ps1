Add-Type -AssemblyName System.Drawing
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

for ($pass = 0; $pass -lt 2; $pass++) {
  $clear = New-Object System.Collections.Generic.List[System.Drawing.Point]
  for ($y = 1; $y -lt ($height - 1); $y++) {
    for ($x = 1; $x -lt ($width - 1); $x++) {
      $c = $bitmap.GetPixel($x, $y)
      if ($c.A -eq 0) { continue }
      $brightness = ($c.R + $c.G + $c.B) / 3
      $range = ([Math]::Max($c.R, [Math]::Max($c.G, $c.B))) - ([Math]::Min($c.R, [Math]::Min($c.G, $c.B)))
      if ($brightness -lt 220 -or $range -gt 70) { continue }

      $neighbors = @(
        $bitmap.GetPixel($x + 1, $y),
        $bitmap.GetPixel($x - 1, $y),
        $bitmap.GetPixel($x, $y + 1),
        $bitmap.GetPixel($x, $y - 1)
      )

      $touchesTransparency = $false
      foreach ($n in $neighbors) {
        if ($n.A -eq 0) { $touchesTransparency = $true; break }
      }

      if ($touchesTransparency) {
        $clear.Add([System.Drawing.Point]::new($x, $y))
      }
    }
  }

  foreach ($p in $clear) {
    $old = $bitmap.GetPixel($p.X, $p.Y)
    $bitmap.SetPixel($p.X, $p.Y, [System.Drawing.Color]::FromArgb(0, $old.R, $old.G, $old.B))
  }
}

$bitmap.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bitmap.Dispose()
Move-Item -LiteralPath $tempPath -Destination $path -Force
