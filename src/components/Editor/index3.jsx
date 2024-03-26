import React, { useState, useRef, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRedo,
  faSearchPlus,
  faSearchMinus,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
// import dynamic from "next/dynamic";
// const Image = dynamic(() => import("next/image"), { ssr: false });

function ImageEditor({ mainImageSrc, overlayImageSrc }) {
  const canvasRef = useRef(null);
  const [overlayPosition, setOverlayPosition] = useState({ x: 80, y: 50 });
  const [overlayScale, setOverlayScale] = useState(0.5);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0 });
  const [mainImage, setMainImage] = useState(null);
  const [overlayImage, setOverlayImage] = useState(null);

  useEffect(() => {
    setMainImage(new Image());
    setOverlayImage(new Image());
  }, []);

  const drawImages = useCallback(() => {
    if (mainImage && overlayImage) {
      console.log("Error her", mainImage, overlayImage);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(mainImage, 0, 0, canvas.width, canvas.height);

      const { x, y } = overlayPosition;
      const width = overlayImage.width * overlayScale;
      const height = overlayImage.height * overlayScale;

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 0.8;

      ctx.save();
      ctx.translate(x + width / 2, y + height / 2);
      ctx.rotate((rotationAngle * Math.PI) / 180);
      ctx.drawImage(overlayImage, -width / 2, -height / 2, width, height);
      ctx.restore();

      ctx.globalAlpha = 1;

      ctx.setLineDash([2, 3]);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "red";
      const boundingBoxWidth = overlayImage.width * overlayScale;
      const boundingBoxHeight = overlayImage.height * overlayScale;
      ctx.strokeRect(x, y, boundingBoxWidth, boundingBoxHeight);
    }
  }, [mainImage, overlayImage, overlayPosition, overlayScale, rotationAngle]);

  useEffect(() => {
    if (mainImage && overlayImage) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      mainImage.src = mainImageSrc;
      mainImage.onload = () => {
        canvas.width = mainImage.width;
        canvas.height = mainImage.height;

        overlayImage.src = overlayImageSrc;
        overlayImage.onload = () => {
          drawImages();
        };
      };
    }
  }, [
    mainImageSrc,
    overlayImageSrc,
    overlayPosition,
    overlayScale,
    rotationAngle,
    drawImages,
    mainImage,
    overlayImage,
  ]);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if (
      offsetX >= overlayPosition.x &&
      offsetX <= overlayPosition.x + overlayImage.width * overlayScale &&
      offsetY >= overlayPosition.y &&
      offsetY <= overlayPosition.y + overlayImage.height * overlayScale
    ) {
      // Clicked inside the overlayed image, enable dragging
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    } else {
      // Clicked outside the overlayed image, enable resizing
      setIsResizing(true);
      setResizeStart({ x: e.clientX, y: e.clientY });
      // Determine the resize handle (e.g., top-left, top-right, bottom-left, bottom-right)
      // You can add logic to set the `resizeHandle` state based on the click position
      setResizeHandle("bottom-right");
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;

      setOverlayPosition({
        x: overlayPosition.x + dx,
        y: overlayPosition.y + dy,
      });

      setDragStart({ x: e.clientX, y: e.clientY });
      drawImages();
    } else if (isResizing) {
      const dx = e.clientX - resizeStart.x;
      const dy = e.clientY - resizeStart.y;

      // Implement resizing logic based on the `resizeHandle`
      if (resizeHandle === "bottom-right") {
        const newScale = overlayScale + (dx + dy) * 0.01;
        if (newScale > 0.1) {
          setOverlayScale(newScale);
        }
      }

      setResizeStart({ x: e.clientX, y: e.clientY });
      drawImages();
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleScale = (scaleFactor) => {
    const newScale = overlayScale + scaleFactor;
    if (newScale > 0.1) {
      // Calculate the new width while maintaining the aspect ratio
      const originalWidth = overlayImage.width;
      const newWidth = originalWidth * newScale;

      setOverlayScale(newScale);
      drawImages();
    }
  };

  const handleRotateLeft = () => {
    // Rotate the overlay image left (counter-clockwise)
    setRotationAngle(rotationAngle - 90);
    drawImages();
  };

  const handleRotateRight = () => {
    // Rotate the overlay image right (clockwise)
    setRotationAngle(rotationAngle + 90);
    drawImages();
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");

    // Capture the composition of the main image and overlayed image without the bounding box
    const snapshot = document.createElement("canvas");
    snapshot.width = canvas.width;
    snapshot.height = canvas.height;
    const ctx = snapshot.getContext("2d");
    ctx.drawImage(mainImage, 0, 0, canvas.width, canvas.height);
    // Reset blending mode and opacity
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 0.8;
    ctx.save();
    ctx.translate(
      overlayPosition.x + (overlayImage.width * overlayScale) / 2,
      overlayPosition.y + (overlayImage.height * overlayScale) / 2
    );
    ctx.rotate((rotationAngle * Math.PI) / 180);
    ctx.drawImage(
      overlayImage,
      (-overlayImage.width * overlayScale) / 2,
      (-overlayImage.height * overlayScale) / 2,
      overlayImage.width * overlayScale,
      overlayImage.height * overlayScale
    );
    ctx.restore();

    // Convert the snapshot to a data URL
    const dataURL = snapshot.toDataURL();

    // Create a download link and trigger the download
    link.href = dataURL;
    link.download = "edited_image.png";
    link.click();
  };

  //handle preview

  const handlePreview = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the main image
    ctx.drawImage(mainImage, 0, 0, canvas.width, canvas.height);

    const { x, y } = overlayPosition;
    const width = overlayImage.width * overlayScale;
    const height = overlayImage.height * overlayScale;
    // Reset blending mode and opacity
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 0.8;

    ctx.save();
    ctx.translate(x + width / 2, y + height / 2);
    ctx.rotate((rotationAngle * Math.PI) / 180);
    ctx.drawImage(overlayImage, -width / 2, -height / 2, width, height);

    ctx.restore();
  };

  const scaleButtonSize = 30; // Set the size of scale buttons

  const renderScaleButtons = () => {
    if (mainImage && overlayImage) {
      const { x, y } = overlayPosition;
      const width = overlayImage.width * overlayScale;
      const height = overlayImage.height * overlayScale;

      // Calculate button positions at the corners of the bounding box
      const buttons = [
        { x: x - scaleButtonSize, y: y - scaleButtonSize },
        { x: x + width, y: y - scaleButtonSize },
        { x: x - scaleButtonSize, y: y + height },
        { x: x + width, y: y + height },
      ];

      // Rotation buttons at the top-left and bottom-right corners
      const rotationButtons = [
        { x: x - scaleButtonSize, y: y - scaleButtonSize },
        { x: x + width, y: y + height },
      ];

      return buttons
        .map((button, index) => (
          <button
            key={index}
            onClick={() => handleScale(0.1 * (index < 2 ? 1 : -1), index < 2)}
            style={{
              position: "absolute",
              top: button.y,
              left: button.x,
              width: scaleButtonSize,
              height: scaleButtonSize,
              backgroundColor: "white",
              border: "1px solid #ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesomeIcon
              icon={index < 2 ? faSearchPlus : faSearchMinus}
              style={{ fontSize: "20px" }}
            />
          </button>
        ))
        .concat(
          rotationButtons.map((button, index) => (
            <button
              key={index}
              onClick={index === 0 ? handleRotateLeft : handleRotateRight}
              style={{
                position: "absolute",
                top: button.y,
                left: button.x,
                width: scaleButtonSize,
                height: scaleButtonSize,
                backgroundColor: "white",
                border: "1px solid #ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesomeIcon
                icon={index === 0 ? faRedo : faRedo}
                style={{
                  fontSize: "20px",
                  transform: index === 0 ? "none" : "rotate(180deg)",
                }}
              />
            </button>
          ))
        );
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          cursor: isDragging ? "grabbing" : isResizing ? "se-resize" : "grab",
        }}
      />
      <Button
        variant="contained"
        style={{
          backgroundColor: "#A24D50",
          paddingLeft: "10%",
          paddingRight: "10%",
          borderRadius: "5px 0 0 5px",
        }}
        onClick={handleSave}
      >
        SAVE PRODUCT <br />
        <FontAwesomeIcon icon={faSave} />
      </Button>

      <Button
        variant="contained"
        style={{
          backgroundColor: "#A24D50",
          paddingLeft: "10%",
          paddingRight: "10%",
          borderRadius: "5px 0 0 5px",
        }}
        onClick={handlePreview}
      >
        PREVIEW PRODUCT <br />
        <FontAwesomeIcon icon={faSave} />
      </Button>

      {renderScaleButtons()}
    </div>
  );
}

export default ImageEditor;
