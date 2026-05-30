import os
import shutil

downloads_dir = "/Users/NUMTEMA/Downloads/Photos/Liste parfums de Grasse/"
assets_dir = "/Users/NUMTEMA/antigravity/Rêve-Parfumé-Création/src/assets/images/grasse/"

# Exact mapping from ChatGPT Image downloaded filenames to our new descriptive asset names
mapping = {
    "ChatGPT Image 29 mai 2026, 21_42_19.png": "cerise_noire_explosive.png",
    "ChatGPT Image 29 mai 2026, 21_50_02.png": "pommes_amour.png",
    "ChatGPT Image 29 mai 2026, 23_07_05.png": "delice_interdit.png",
    "ChatGPT Image 29 mai 2026, 23_09_14.png": "fleur_de_cotton.png",
    "ChatGPT Image 29 mai 2026, 23_05_09.png": "lilas_atelier.png",
    "ChatGPT Image 29 mai 2026, 21_47_46.png": "monoi_iles.png",
    "ChatGPT Image 29 mai 2026, 22_57_12.png": "clementine_monoi.png",
    "ChatGPT Image 29 mai 2026, 23_01_19.png": "peche_mignonne.png",
    "ChatGPT Image 29 mai 2026, 23_15_30.png": "fruits_rouges_bois.png",
    "ChatGPT Image 29 mai 2026, 23_03_22.png": "agrumes_presses.png"
}

# Copy and rename each file
print("Copying and renaming files to assets...")
for download_name, asset_name in mapping.items():
    src_path = os.path.join(downloads_dir, download_name)
    dst_path = os.path.join(assets_dir, asset_name)
    
    if os.path.exists(src_path):
        shutil.copy(src_path, dst_path)
        print(f"Copied {download_name} -> {asset_name} (Size: {os.path.getsize(dst_path)} bytes)")
    else:
        print(f"ERROR: Source file {download_name} not found!")

# Remove old parfum_X.png files to keep it absolutely clean!
print("\nRemoving old parfum_X.png files...")
for i in range(1, 11):
    old_file = os.path.join(assets_dir, f"parfum_{i}.png")
    if os.path.exists(old_file):
        os.remove(old_file)
        print(f"Removed old file: {old_file}")
