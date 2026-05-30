import os
import glob
import subprocess
import re

downloads_dir = "/Users/NUMTEMA/Downloads/Photos/Liste parfums de Grasse/"
images = glob.glob(os.path.join(downloads_dir, "ChatGPT Image*.png"))

print(f"Found {len(images)} ChatGPT images. Analyzing with Tesseract...")

scents = [
    "Délice Interdit",
    "Fleur de Coton",
    "Lilas d'Atelier",
    "Pêche Mignonne",
    "Fruits Rouges des Bois",
    "Agrumes Pressés"
]

results = []

for img_path in sorted(images):
    # Skip the ones we already know
    filename = os.path.basename(img_path)
    if "21_42_19" in filename:
        print(f"{filename} -> Cerise Noire Explosive (Skipped)")
        continue
    if "21_47_46" in filename:
        print(f"{filename} -> Monoï des Îles (Skipped)")
        continue
    if "21_50_02" in filename:
        print(f"{filename} -> Pommes d'Amour (Skipped)")
        continue
    if "22_57_12" in filename:
        print(f"{filename} -> Clémentine Monoï (Skipped)")
        continue

    # Run tesseract
    txt_output_base = "/Users/NUMTEMA/.gemini/antigravity/brain/68457e39-92ae-4883-ba9e-5c50fbdddebe/scratch/temp_ocr"
    try:
        subprocess.run(["tesseract", img_path, txt_output_base], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        txt_path = txt_output_base + ".txt"
        if os.path.exists(txt_path):
            with open(txt_path, "r", encoding="utf-8") as f:
                content = f.read().lower()
            
            # Try to match scent names
            matched = "Unknown"
            if "délice" in content or "delice" in content or "interdit" in content:
                matched = "Délice Interdit"
            elif "coton" in content or "fleur de coton" in content:
                matched = "Fleur de Coton"
            elif "lilas" in content or "lilas d'atelier" in content:
                matched = "Lilas d'Atelier"
            elif "pêche" in content or "peche" in content or "mignonne" in content:
                matched = "Pêche Mignonne"
            elif "fruits" in content or "fruits rouges" in content or "mûre" in content:
                matched = "Fruits Rouges des Bois"
            elif "agrumes" in content or "pamplemousse" in content or "citron" in content:
                matched = "Agrumes Pressés"
            
            print(f"{filename} -> MATCHED: {matched}")
            results.append((filename, matched, img_path))
            
            os.remove(txt_path)
    except Exception as e:
        print(f"Error processing {filename}: {e}")
