#!/bin/bash

SOURCE="drafts"
TARGET="drafts/Bible"

FILES=(
    "aimer.md"
    "apocalypse.md"
    "axe1.md"
    "conscience.md"
    "crête.md"
    "deluge.md"
    "deux_arbres.md"
    "dieu.md"
    "enfantement.md"
    "evangiles.md"
    "filsunique.md"
    "folie.md"
    "genese.md"
    "jesus.md"
    "noreligion.md"
    "prophetes.md"
    "psaumes.md"
    "racines1.md"
    "retournement.md"
    "retournementconcret.md"
    "sacrifice.md"
    "souzenelle.md"
    "unite.md"
)

for file in "${FILES[@]}"; do
    if [ -f "$SOURCE/$file" ]; then
        mv "$SOURCE/$file" "$TARGET/"
        echo "Déplacé : $file"
    else
        echo "Absent : $file"
    fi
done
