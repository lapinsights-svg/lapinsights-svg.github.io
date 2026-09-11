#!/usr/bin/env ruby

# Corrige tous les chemins /images/... vers /statics/images/...
# dans tous les fichiers Markdown ET CSS.

files = Dir["**/*.md"] + Dir["**/*.css"]

files.each do |file|
  content = File.read(file)

  # Remplacement global, respectant les sous-dossiers
  new_content = content.gsub(%r{(?<!statics)\/images\/}, "/statics/images/")

  if new_content != content
    puts "✔ Chemins corrigés dans #{file}"
    File.write(file, new_content)
  else
    puts "• Aucun chemin à corriger dans #{file}"
  end
end
