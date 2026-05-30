import os
import glob
import subprocess

downloads_dir = "/Users/NUMTEMA/Downloads/Photos/Liste parfums de Grasse/"
images = ["ChatGPT Image 29 mai 2026, 23_01_19.png", "ChatGPT Image 29 mai 2026, 23_07_05.png", "ChatGPT Image 29 mai 2026, 23_15_30.png"]

for img in images:
    img_path = os.path.join(downloads_dir, img)
    txt_output_base = "/Users/NUMTEMA/.gemini/antigravity/brain/68457e39-92ae-4883-ba9e-5c50fbdddebe/scratch/temp_ocr"
    try:
        subprocess.run(["tesseract", img_path, txt_output_base], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        txt_path = txt_output_base + ".txt"
        if os.path.exists(txt_path):
            with open(txt_path, "r", encoding="utf-8") as f:
                content = f.read().strip()
            print(f"=== {img} ===")
            print(content[:250])
            print("====================\n")
            os.remove(txt_path)
    except Exception as e:
        print(f"Error: {e}")
