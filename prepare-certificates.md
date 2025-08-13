# Certificate Image Preparation Guide

## Overview
You now have two different certificate background images to handle the layout differences between web and print versions:

1. **`certificate-web.png`** - For web display
2. **`certificate-print.png`** - For print/QR code version

## Image Specifications

### certificate-web.png
- **Purpose**: Web display with director signature
- **Layout**: Includes space for director name and title at the bottom
- **Content**: Full certificate design with signature area
- **Dimensions**: Same as your current certificate.png

### certificate-print.png  
- **Purpose**: Print version with QR code
- **Layout**: Modified to accommodate QR code without overlapping director signature
- **Content**: Same design but with adjusted bottom layout for QR code
- **Dimensions**: Same as your current certificate.png

## How to Create certificate-print.png

### Option 1: Edit Existing Image
1. Open your current `certificate.png` in an image editor (Photoshop, GIMP, etc.)
2. **Remove or move** the director signature area
3. **Adjust the bottom layout** to make room for QR code
4. **Save as** `certificate-print.png`

### Option 2: Create New Design
1. Start with your current certificate design
2. **Modify the bottom section** to:
   - Remove director signature area
   - Add more space for QR code
   - Ensure QR code doesn't overlap with other elements
3. **Save as** `certificate-print.png`

## File Placement
Place both images in: `src/assets/images/`
- `certificate-web.png`
- `certificate-print.png`

## Current Implementation
The system now automatically:
- **Web view**: Shows `certificate-web.png` with director info
- **Print view**: Shows `certificate-print.png` with QR code
- **Print button**: Temporarily switches to print version, prints, then returns to web version

## Benefits of This Approach
✅ **No layout conflicts** between QR code and director signature  
✅ **Clean separation** of web and print concerns  
✅ **Professional appearance** for both versions  
✅ **Easy maintenance** - modify each version independently  
✅ **Automatic switching** - no manual intervention needed  

## Testing
1. Use the debug checkbox to preview both versions
2. Test printing to ensure correct layout
3. Verify QR code placement doesn't overlap with text
4. Check that director info is properly hidden in print 