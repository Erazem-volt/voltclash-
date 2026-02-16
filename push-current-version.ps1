# Script pour pousser la version actuelle sur GitHub
Write-Host "=== PUSH SUR GITHUB ===" -ForegroundColor Cyan

# Vérifier si Git est disponible
try {
    git --version
    Write-Host "Git est disponible" -ForegroundColor Green
} catch {
    Write-Host "Git n'est pas installé. Veuillez installer Git d'abord." -ForegroundColor Red
    Write-Host "Téléchargez Git depuis: https://git-scm.com/download/win"
    exit 1
}

# Aller dans le bon répertoire
Set-Location "c:\Users\Yann\Desktop\voltclash"

# Vérifier l'état actuel
Write-Host "`n=== ÉTAT ACTUEL ===" -ForegroundColor Yellow
git status

# Ajouter tous les fichiers modifiés
Write-Host "`n=== AJOUT DES FICHIERS ===" -ForegroundColor Yellow
git add .

# Créer un commit
Write-Host "`n=== CRÉATION DU COMMIT ===" -ForegroundColor Yellow
$commitMessage = "Restauration version fonctionnelle avec sons corrigés"
git commit -m $commitMessage

# Pousser sur GitHub
Write-Host "`n=== PUSH SUR GITHUB ===" -ForegroundColor Yellow
git push origin main

Write-Host "`n✅ Push terminé avec succès !" -ForegroundColor Green
Write-Host "Message du commit: $commitMessage"
