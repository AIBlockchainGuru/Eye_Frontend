import React, { useEffect, useRef } from "react";

function ImageOverlay({
  mainImage,
  overlayImage,
  overlayPosition,
  width,
  height,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (mainImage && overlayImage && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      const mainImageObj = new Image();
      mainImageObj.src = mainImage;

      const overlayImageObj = new Image();
      overlayImageObj.src = overlayImage;

      mainImageObj.onload = () => {
        canvas.width = width || mainImageObj.width;
        canvas.height = height || mainImageObj.height;

        // Calculate the maximum size for the overlay image
        const maxSize = Math.min(
          canvas.width / 3, // Max width is half of the canvas
          canvas.height / 3 // Max height is half of the canvas
        );

        // Calculate the position for centering the overlay image
        const overlayX = (canvas.width - maxSize) / 2;
        const overlayY = (canvas.height - maxSize) / 2;

        // Draw the main image on the canvas
        context.drawImage(mainImageObj, 0, 0, canvas.width, canvas.height);

        // Draw the overlay image with the calculated size and position
        context.drawImage(
          overlayImageObj,
          overlayX,
          overlayY,
          maxSize,
          maxSize
        );
      };
    }
  }, [mainImage, overlayImage, overlayPosition, width, height]);

  return <canvas ref={canvasRef} />;
}

export default ImageOverlay;
