# Script pour vérifier et afficher le README sur GitHub
Write-Host "🔍 Vérification du README..." -ForegroundColor Green

# Vérifier si le README existe localement
if (Test-Path "README.md") {
    Write-Host "✅ README.md trouvé localement" -ForegroundColor Green
    Get-Content "README.md" | Select-Object -First 5
} else {
    Write-Host "❌ README.md non trouvé localement" -ForegroundColor Red
}

# Instructions pour GitHub
Write-Host "`n🌐 Pour voir le README sur GitHub :" -ForegroundColor Cyan
Write-Host "1. Allez sur : https://github.com/Erazem-volt/voltclash-" -ForegroundColor White
Write-Host "2. Cliquez sur l'onglet 'Code'" -ForegroundColor White
Write-Host "3. Le README devrait s'afficher automatiquement" -ForegroundColor White
Write-Host "4. Si non, rafraîchissez la page (F5)" -ForegroundColor White

# Ouvrir le repository dans le navigateur
Write-Host "`n🚀 Ouverture du repository GitHub..." -ForegroundColor Yellow
Start-Process "https://github.com/Erazem-volt/voltclash-"
