# Script pour pousser Volt Clash sur GitHub
# Repository GitHub: https://github.com/Erazem-volt/voltclash-

$repoUrl = "https://github.com/Erazem-volt/voltclash-"

Write-Host "🚀 Configuration du repository GitHub..." -ForegroundColor Green

# Étape 1: Ajouter le remote
Write-Host "📡 Connexion au repository distant..." -ForegroundColor Yellow
& "C:\Program Files\Git\bin\git.exe" remote add origin $repoUrl

# Étape 2: Vérifier la connexion
Write-Host "🔍 Vérification de la connexion..." -ForegroundColor Yellow
& "C:\Program Files\Git\bin\git.exe" remote -v

# Étape 3: Pousser sur GitHub
Write-Host "📤 Envoi du code sur GitHub..." -ForegroundColor Yellow
& "C:\Program Files\Git\bin\git.exe" push -u origin master

Write-Host "✅ Votre projet Volt Clash est maintenant sur GitHub !" -ForegroundColor Green
Write-Host "🌐 Visitez votre repository pour voir le code !" -ForegroundColor Cyan
