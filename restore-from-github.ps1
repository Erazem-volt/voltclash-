# Script pour restaurer depuis GitHub
$repoUrl = "https://github.com/YOUR_USERNAME/voltclash.git"  # Remplace avec ton URL
$tempDir = "temp_restore"
$backupDir = "backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"

# Créer un backup de l'actuel
if (Test-Path "index.html") {
    New-Item -ItemType Directory -Path $backupDir -Force
    Copy-Item "index.html" "$backupDir\"
    Write-Host "Backup créé dans: $backupDir"
}

# Télécharger depuis GitHub (si git était disponible)
# git clone $repoUrl $tempDir
# Copy-Item "$tempDir\index.html" "."
# Remove-Item $tempDir -Recurse -Force

Write-Host "Pour restaurer depuis GitHub:"
Write-Host "1. Va sur ton dépôt GitHub"
Write-Host "2. Télécharge le fichier index.html"
Write-Host "3. Remplace le fichier actuel"
