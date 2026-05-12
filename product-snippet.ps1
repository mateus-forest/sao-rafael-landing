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
function Get-Brand([string]$name) {
  $n = (Remove-Diacritics $name).ToLowerInvariant()
  if ($n -match 'heineken\s*0\.0|heineken\s*0|0\.0') { return 'Heineken 0.0' }
  if ($n -match 'amstel\s+ultra') { return 'Amstel Ultra' }
  if ($n -match 'vibes') { return 'Vibes' }
  if ($n -match 'blue\s+moon') { return 'Blue Moon' }
  if ($n -match 'baden') { return 'Baden Baden' }
  if ($n -match 'lagunitas') { return 'Lagunitas' }
  if ($n -match 'glacial') { return 'Glacial' }
  if ($n -match 'schin') { return 'Schin' }
  if ($n -match 'praya') { return 'Praya' }
  if ($n -match 'itubaina') { return 'Itubaina' }
  if ($n -match 'skinka') { return 'Skinka' }
  if ($n -match 'fys') { return 'FYS' }
  if ($n -match 'baer') { return 'Baer-Mate' }
  if ($n -match 'mamba') { return 'Mamba Water' }
  if ($n -match 'amstel') { return 'Amstel' }
  if ($n -match 'heineken') { return 'Heineken' }
  return $null
}
function To-Slug([string]$text) {
  $text = Remove-Diacritics $text
  $text = $text.ToLowerInvariant()
  $text = $text -replace '&', ' e '
  $text = $text -replace '[^a-z0-9]+', '-'
  return $text.Trim('-')
}
function Get-Category([string]$name) {
  $n = (Remove-Diacritics $name).ToLowerInvariant()
  $parts = @()
  if ($n -match '^chopp') { $parts += 'Chopp' }
  elseif ($n -match '^agua') { $parts += 'Agua' }
  elseif ($n -match 'protein') { $parts += 'Bebida Proteica' }
  elseif ($n -match 'matcha') { $parts += 'Matcha Gaseificado' }
  elseif ($n -match 'cha mate') { $parts += 'Cha Mate Gaseificado' }
  elseif ($n -match '^drink pronto') { $parts += 'Drink Pronto' }
  elseif ($n -match '^refrigerante') { $parts += 'Refrigerante' }
  elseif ($n -match '^suco') { $parts += 'Suco' }
  elseif ($n -match 'tonica') { $parts += 'Tonica' }
  elseif ($n -match '^cerveja') {
    if ($n -match '0\.0') { $parts += 'Sem Alcool' }
    elseif ($n -match 'ultra') { $parts += 'Low Carb' }
    elseif ($n -match 'ipa') { $parts += 'IPA' }
    elseif ($n -match 'witbier|witibier') { $parts += 'Witbier' }
    elseif ($n -match 'golden') { $parts += 'Golden' }
    elseif ($n -match 'amber lager') { $parts += 'Amber Lager' }
    elseif ($n -match 'peach') { $parts += 'Peach' }
    else { $parts += 'Cerveja' }
  }
  if ($n -match ' gfa ') { $parts += 'Garrafa' }
  elseif ($n -match ' ln ') { $parts += 'Long Neck' }
  elseif ($n -match ' lt ') { $parts += 'Lata' }
  elseif ($n -match ' keg ') { $parts += 'Keg' }
  if ($name -match '(\d+[\.,]?\d*(?:ml|l))') { $parts += $matches[1].ToUpper().Replace(',', ', ') }
  return ($parts -join ' • ')
}
function Get-DisplayName([string]$baseName) {
  $display = Remove-Diacritics $baseName
  $display = $display -replace '^BEBIDA PROTEICA ', ''
  $display = $display -replace '^CHA MATE GASEIFICADO ', ''
  $display = $display -replace '^MATCHA GASEIFICADO ', ''
  $display = $display -replace '^DRINK PRONTO ', ''
  $display = $display -replace '^REFRIGERANTE ', ''
  $display = $display -replace '^SUCO ', ''
  $display = $display -replace '^CERVEJA ', ''
  $display = $display -replace '^CHOPP ', ''
  $display = $display -replace '^AGUA ', ''
  return $display
}
$sourceDir = 'C:\Users\mateu\Downloads\Produtos Portifólio São Rafael'
$items = Get-ChildItem $sourceDir -File | ForEach-Object {
  $brand = Get-Brand $_.BaseName
  if (-not $brand) { return }
  $slugBrand = To-Slug $brand
  $slug = To-Slug $_.BaseName
  [pscustomobject]@{
    Brand = $brand
    Name = Get-DisplayName $_.BaseName
    Category = Get-Category $_.BaseName
    Image = "/produtos/$slugBrand/$slug$($_.Extension.ToLowerInvariant())"
  }
} | Sort-Object Brand, Name
$grouped = $items | Group-Object Brand
foreach($group in $grouped){
  "### $($group.Name)"
  foreach($item in $group.Group){
    "{ name: '$($item.Name)', category: '$($item.Category)', image: '$($item.Image)' },"
  }
  ""
}
