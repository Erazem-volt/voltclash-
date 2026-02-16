# Télécharger un fichier directement depuis GitHub
$githubUrl = "https://raw.githubusercontent.com/YOUR_USERNAME/voltclash/main/index.html"  # Remplace avec ton URL
$outputFile = "index.html"

try {
    Invoke-WebRequest -Uri $githubUrl -OutFile $outputFile
    Write-Host "Fichier téléchargé avec succès: $outputFile"
} catch {
    Write-Host "Erreur lors du téléchargement: $_"
    Write-Host "Vérifie que l'URL GitHub est correcte"
}
