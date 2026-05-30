import os
import glob
import subprocess

downloads_dir = "/Users/NUMTEMA/Downloads/Photos/Liste parfums de Grasse/"
images = sorted(glob.glob(os.path.join(downloads_dir, "ChatGPT Image*.png")))

print(f"Analyzing all {len(images)} images to extract main title...")

for img_path in images:
    filename = os.path.basename(img_path)
    txt_output_base = "/Users/NUMTEMA/.gemini/antigravity/brain/68457e39-92ae-4883-ba9e-5c50fbdddebe/scratch/temp_ocr"
    try:
        subprocess.run(["tesseract", img_path, txt_output_base], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        txt_path = txt_output_base + ".txt"
        if os.path.exists(txt_path):
            with open(txt_path, "r", encoding="utf-8") as f:
                content = f.read().strip()
            
            # Print the filename and first 3 lines of OCR content to identify the title
            lines = [l.strip() for l in content.split("\n") if l.strip()]
            print(f"=== {filename} ===")
            print("\n".join(lines[:6]))
            print("====================\n")
            os.remove(txt_path)
    except Exception as e:
        print(f"Error: {e}")
