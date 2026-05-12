function Remove-Diacritics([string]$text) {
  $normalized = $text.Normalize([Text.NormalizationForm]::FormD)
  $sb = New-Object System.Text.StringBuilder
  foreach ($ch in $normalized.ToCharArray()) {
    if ([Globalization.CharUnicodeInfo]::GetUnicodeCategory($ch) -ne [Globalization.UnicodeCategory]::NonSpacingMark) {
      [void]$sb.Append($ch)
    }
  }
  return $sb.ToString().Normalize([Text.NormalizationForm]::FormC)
}

function To-Slug([string]$text) {
  $text = Remove-Diacritics $text
  $text = $text.ToLowerInvariant()
  $text = $text -replace '&', ' e '
  $text = $text -replace '[^a-z0-9]+', '-'
  $text = $text.Trim('-')
  return $text
}

function Get-Brand([string]$name) {
  $n = (Remove-Diacritics $name).ToLowerInvariant()
  if ($n -match 'heineken\s*0\.0|heineken\s*0|0\.0') { return 'heineken-00' }
  if ($n -match 'amstel\s+ultra') { return 'amstel-ultra' }
  if ($n -match 'vibes') { return 'vibes' }
  if ($n -match 'blue\s+moon') { return 'blue-moon' }
  if ($n -match 'baden') { return 'baden-baden' }
  if ($n -match 'lagunitas') { return 'lagunitas' }
  if ($n -match 'glacial') { return 'glacial' }
  if ($n -match 'schin') { return 'schin' }
  if ($n -match 'praya') { return 'praya' }
  if ($n -match 'itubaina') { return 'itubaina' }
  if ($n -match 'skinka') { return 'skinka' }
  if ($n -match 'fys') { return 'fys' }
  if ($n -match 'baer') { return 'baer-mate' }
  if ($n -match 'mamba') { return 'mamba-water' }
  if ($n -match 'amstel') { return 'amstel' }
  if ($n -match 'heineken') { return 'heineken' }
  return $null
}

function Get-Category([string]$name) {
  $n = (Remove-Diacritics $name).ToLowerInvariant()
  if ($n -match '^chopp') { return 'Chopp' }
  if ($n -match '^agua') { return 'Agua' }
  if ($n -match 'protein') { return 'Bebida Proteica' }
  if ($n -match 'matcha') { return 'Matcha Gaseificado' }
  if ($n -match 'cha mate') { return 'Cha Mate Gaseificado' }
  if ($n -match '^drink pronto') { return 'Drink Pronto' }
  if ($n -match '^refrigerante') { return 'Refrigerante' }
  if ($n -match '^suco') { return 'Suco' }
  if ($n -match 'tonica') { return 'Tonica' }
  if ($n -match '^cerveja') {
    if ($n -match 'ipa') { return 'IPA' }
    if ($n -match 'witbier|witibier|belgian white') { return 'Witbier' }
    if ($n -match 'golden') { return 'Golden' }
    if ($n -match 'amber lager') { return 'Amber Lager' }
    if ($n -match 'peach') { return 'Peach' }
    if ($n -match 'ultra') { return 'Low Carb' }
    if ($n -match '0\.0') { return 'Sem Alcool' }
    return 'Cerveja'
  }
  return 'Produto'
}

$sourceDir = 'C:\Users\mateu\Downloads\Produtos Portifólio São Rafael'
$targetRoot = Join-Path (Get-Location) 'public\produtos'
New-Item -ItemType Directory -Force -Path $targetRoot | Out-Null
$unclassified = @()
$mapped = @()
Get-ChildItem $sourceDir -File | ForEach-Object {
  $brand = Get-Brand $_.BaseName
  if (-not $brand) {
    $unclassified += $_.Name
    return
  }
  $brandDir = Join-Path $targetRoot $brand
  New-Item -ItemType Directory -Force -Path $brandDir | Out-Null
  $slug = To-Slug $_.BaseName
  $destName = "$slug$($_.Extension.ToLowerInvariant())"
  $destPath = Join-Path $brandDir $destName
  Copy-Item -LiteralPath $_.FullName -Destination $destPath -Force
  $mapped += [pscustomobject]@{
    Brand = $brand
    File = $_.Name
    Target = ("/produtos/$brand/$destName")
    Category = Get-Category $_.BaseName
  }
}
$mapped | Sort-Object Brand, File | ConvertTo-Json -Depth 3
if ($unclassified.Count -gt 0) {
  "UNCLASSIFIED:"
  $unclassified
}
