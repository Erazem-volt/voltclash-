# Script PowerShell pour Git facile
# Ajoutez ce contenu à votre profil PowerShell pour utiliser 'git' directement

# Créer un alias pour Git
Set-Alias -Name git -Value "C:\Program Files\Git\bin\git.exe"

# Fonctions Git utiles
function gs { & "C:\Program Files\Git\bin\git.exe" status }
function ga { & "C:\Program Files\Git\bin\git.exe" add $args }
function gc { & "C:\Program Files\Git\bin\git.exe" commit -m $args }
function gl { & "C:\Program Files\Git\bin\git.exe" log --oneline }
function gp { & "C:\Program Files\Git\bin\git.exe" push $args }
function gpull { & "C:\Program Files\Git\bin\git.exe" pull $args }

Write-Host "Git est maintenant disponible ! Utilisez :"
Write-Host "git status  ou gs   - Voir le status"
Write-Host "git add .    ou ga   - Ajouter tous les fichiers"
Write-Host "git commit -m 'message' ou gc 'message' - Faire un commit"
Write-Host "git log      ou gl   - Voir l'historique"
Write-Host "git push     ou gp   - Pousser vers GitHub"
