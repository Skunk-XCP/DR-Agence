param(
  [int]$Threshold = 95,
  [int]$StartPort = 4273
)

$ErrorActionPreference = "Stop"

function Get-FreePort {
  param([int]$From)
  for ($p = $From; $p -lt ($From + 50); $p++) {
    $listener = $null
    try {
      $listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Any, $p)
      $listener.Start()
      return $p
    } catch {
      continue
    } finally {
      if ($listener) {
        try { $listener.Stop() } catch {}
      }
    }
  }
  throw "Aucun port libre trouve entre $From et $($From + 49)."
}

function Wait-Server {
  param(
    [string]$Url,
    [int]$TimeoutSeconds = 60
  )
  for ($i = 0; $i -lt $TimeoutSeconds; $i++) {
    try {
      $resp = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 2
      if ($resp.StatusCode -ge 200) {
        return
      }
    } catch {}
    Start-Sleep -Seconds 1
  }
  throw "Serveur injoignable: $Url"
}

$reportDir = Join-Path (Get-Location) "reports\a11y"
New-Item -ItemType Directory -Force -Path $reportDir | Out-Null

npm run build
if ($LASTEXITCODE -ne 0) {
  throw "Build en echec."
}

$port = Get-FreePort -From $StartPort
$server = Start-Process -FilePath "cmd.exe" -ArgumentList "/c", "npm run start -- --port $port" -PassThru -WindowStyle Hidden

try {
  Wait-Server -Url "http://localhost:$port/"

  $targets = @(
    @{ Name = "home"; Path = "/" },
    @{ Name = "offres"; Path = "/offres" },
    @{ Name = "configurateur"; Path = "/configurateur?businessType=snack&siteType=vitrine" }
  )

  $results = @()

  foreach ($target in $targets) {
    foreach ($formFactor in @("mobile", "desktop")) {
      $url = "http://localhost:$port$($target.Path)"
      $reportName = "localhost-$port-$($target.Name)-$formFactor.json"
      $reportPath = Join-Path $reportDir $reportName

      if ($url.Contains("&")) {
        $escapedUrl = $url -replace "&", "^&"
        $cmd = "npx --yes lighthouse ""$escapedUrl"" --only-categories=accessibility --output=json --output-path=""$reportPath"" --chrome-flags=""--headless=new --no-sandbox"" --emulated-form-factor=$formFactor --throttling-method=provided"
        cmd /c $cmd
      } else {
        npx --yes lighthouse $url `
          --only-categories=accessibility `
          --output=json `
          --output-path="$reportPath" `
          --chrome-flags="--headless=new --no-sandbox" `
          --emulated-form-factor=$formFactor `
          --throttling-method=provided
      }

      if ($LASTEXITCODE -ne 0) {
        throw "Lighthouse a echoue pour $url [$formFactor]."
      }

      $json = Get-Content -Raw -Path $reportPath | ConvertFrom-Json
      $score = [math]::Round(($json.categories.accessibility.score * 100), 0)
      $results += [PSCustomObject]@{
        Url = $url
        FormFactor = $formFactor
        Score = [int]$score
        Report = $reportName
      }
    }
  }

  Write-Host ""
  Write-Host "A11Y summary:"
  foreach ($r in $results) {
    Write-Host "- [$($r.FormFactor)] $($r.Url) => $($r.Score)/100 ($($r.Report))"
  }

  $failed = $results | Where-Object { $_.Score -lt $Threshold }
  if ($failed.Count -gt 0) {
    Write-Host ""
    Write-Host "A11Y threshold failed (threshold: $Threshold)." -ForegroundColor Red
    foreach ($f in $failed) {
      Write-Host "- $($f.Url) [$($f.FormFactor)] score $($f.Score)" -ForegroundColor Red
    }
    exit 1
  }

  Write-Host ""
  Write-Host "A11Y threshold passed (threshold: $Threshold)." -ForegroundColor Green
} finally {
  if ($server -and -not $server.HasExited) {
    Stop-Process -Id $server.Id -Force
  }
}
