import os
import shutil
from pathlib import Path

# Target directory
TARGET_DIR = r"C:\Users\ASUS\Desktop\ragModel\rag data"

def add_pdf(source_pdf: str) -> bool:
    """
    Copy a single PDF file to the target directory.
    
    Args:
        source_pdf (str): Path to the PDF file.
    
    Returns:
        bool: True if the file was copied, False otherwise.
    """
    # Ensure target directory exists
    os.makedirs(TARGET_DIR, exist_ok=True)
    
    # Convert source to Path object
    source = Path(source_pdf)
    
    # Check if source is a valid PDF file
    if not (source.is_file() and source.suffix.lower() == '.pdf'):
        print(f"Error: {source_pdf} is not a valid PDF file.")
        return False
    
    # Destination path
    dest_path = os.path.join(TARGET_DIR, source.name)
    
    # Copy the file
    try:
        shutil.copy2(str(source), dest_path)
        print(f"Copied {source.name} to {TARGET_DIR}")
        return True
    except Exception as e:
        print(f"Error copying {source.name}: {str(e)}")
        return False

if __name__ == "__main__":
    # Example usage
    source_pdf = r"C:\Users\ASUS\Desktop\sample.pdf"  # Replace with your PDF path
    add_pdf(source_pdf)
