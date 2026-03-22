import Resizer from "react-image-file-resizer";

export const resizeFile = (file) => {
    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        file, // The file to resize
        800,  // Max width
        800,  // Max height
        "JPEG", // Output format
        80,   // Quality (between 0 and 100)
        0,    // Rotation (no rotation)
        (uri) => resolve(uri), // Callback to return the resized file
        "blob", // Output as Blob
      );
    });
  };