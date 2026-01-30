import cv2
import numpy as np

def preprocess_image(image):
    """
    Apply basic MRI preprocessing: Grayscale, Normalization, and CLAHE.
    """
    if len(image.shape) == 3:
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    else:
        gray = image

    # Apply CLAHE (Contrast Limited Adaptive Histogram Equalization)
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    enhanced = clahe.apply(gray)

    # Normalize
    normalized = cv2.normalize(enhanced, None, 0, 255, cv2.NORM_MINMAX)
    
    return normalized

def generate_mock_heatmap(image):
    """
    Generate a mock XAI heatmap for demonstration purposes.
    In a real scenario, this would be Grad-CAM output.
    """
    # Create a dummy heatmap based on high-intensity regions
    # (a simple hack for demonstration)
    blurred = cv2.GaussianBlur(image, (15, 15), 0)
    _, heatmap_mask = cv2.threshold(blurred, 200, 255, cv2.THRESH_BINARY)
    
    # Colorize the mask
    heatmap_color = cv2.applyColorMap(heatmap_mask, cv2.COLORMAP_JET)
    
    # Overlay on original image
    if len(image.shape) == 2:
        image_color = cv2.cvtColor(image, cv2.COLOR_GRAY2BGR)
    else:
        image_color = image
        
    overlay = cv2.addWeighted(image_color, 0.7, heatmap_color, 0.3, 0)
    return overlay
