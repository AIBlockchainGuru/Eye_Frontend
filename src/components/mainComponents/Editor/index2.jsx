import React, { useState, useRef, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRedo,
  faSearchPlus,
  faSearchMinus,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@nextui-org/react";
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";
import { MdOutlinePreview } from "react-icons/md";



// import dynamic from "next/dynamic";
// const Image = dynamic(() => import("next/image"), { ssr: false });

function ImageEditor({
  mainImageSrc,
  overlayImageSrc,
  imageSize = 1,
  showBoundingBox = true,
  onCapturePropsChange,
}) {
  const canvasRef = useRef(null);
  const [overlayPosition, setOverlayPosition] = useState({ x: 4, y: 0 });
  const [overlayScale, setOverlayScale] = useState(0.5);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0 });
  const [mainImage, setMainImage] = useState(null);
  const [overlayImage, setOverlayImage] = useState(null);
  const [scaleButtonsVisible, setScaleButtonsVisible] = useState(true);

  // useEffect(() => {
  //   console.log("1");
  //   setMainImage(new Image());
  //   mainImage.src = mainImageSrc;
  //   setOverlayImage(new Image());
  //   overlayImage.src = overlayImageSrc;
  // }, []);
  useEffect(() => {
    console.log("4", mainImageSrc, overlayImageSrc);
    const mainImg = new Image();
    mainImg.onload = () => {
      setMainImage(mainImg);
    };
    mainImg.src = mainImageSrc;

    const overlayImg = new Image();
    overlayImg.onload = () => {
      setOverlayImage(overlayImg);
    };
    overlayImg.src = overlayImageSrc;
  }, [mainImageSrc, overlayImageSrc]);

  const drawImages = useCallback(() => {
    console.log("3");
    if (mainImage && overlayImage) {
      console.log("Error her", mainImage, overlayImage);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Scale the canvas size based on imageSize
      canvas.width = mainImage.width * imageSize;
      canvas.height = mainImage.height * imageSize;

      ctx.drawImage(mainImage, 0, 0, canvas.width, canvas.height);

      const { x, y } = overlayPosition;
      const width = overlayImage.width * overlayScale * imageSize;
      const height = overlayImage.height * overlayScale * imageSize;

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 0.8;

      ctx.save();
      ctx.translate(x + width / 2, y + height / 2);
      ctx.rotate((rotationAngle * Math.PI) / 180);
      ctx.drawImage(overlayImage, -width / 4, -height / 4, width, height);
      ctx.restore();

      ctx.globalAlpha = 1;
      if (showBoundingBox) {
        ctx.setLineDash([2, 3]);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "red";
        const boundingBoxWidth = overlayImage.width * overlayScale;
        const boundingBoxHeight = overlayImage.height * overlayScale;
        ctx.strokeRect(x, y, boundingBoxWidth, boundingBoxHeight);
      }
    }
  }, [
    mainImage,
    overlayImage,
    overlayPosition,
    overlayScale,
    rotationAngle,
    showBoundingBox,
  ]);

  useEffect(() => {
    console.log("2");
    if (mainImage && overlayImage) {
      const canvas = canvasRef.current;

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

      // Notify the parent component about the changes
      onCapturePropsChange({
        overlayPosition,
        overlayScale,
        rotationAngle,
      });
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

      // Notify the parent component about the changes
      onCapturePropsChange({
        overlayPosition,
        overlayScale,
        rotationAngle,
      });
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

      // Notify the parent component about the changes
      onCapturePropsChange({
        overlayPosition,
        overlayScale,
        rotationAngle,
      });
    }
  };

  const handleRotateLeft = () => {
    // Rotate the overlay image left (counter-clockwise)
    setRotationAngle(rotationAngle - 90);
    drawImages();

    // Notify the parent component about the changes
    onCapturePropsChange({
      overlayPosition,
      overlayScale,
      rotationAngle,
    });
  };

  const handleRotateRight = () => {
    // Rotate the overlay image right (clockwise)
    setRotationAngle(rotationAngle + 90);
    drawImages();

    // Notify the parent component about the changes
    onCapturePropsChange({
      overlayPosition,
      overlayScale,
      rotationAngle,
    });
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
    // Scale the canvas size based on imageSize
    canvas.width = mainImage.width * imageSize;
    canvas.height = mainImage.height * imageSize;
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Scale the canvas size based on imageSize
    canvas.width = mainImage.width * imageSize;
    canvas.height = mainImage.height * imageSize;
    // Draw the main image
    ctx.drawImage(mainImage, 0, 0, canvas.width, canvas.height);

    const { x, y } = overlayPosition;
    const width = overlayImage.width * overlayScale * imageSize;
    const height = overlayImage.height * overlayScale * imageSize;
    // Reset blending mode and opacity
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 0.8;

    ctx.save();
    ctx.translate(x + width / 2, y + height / 2);
    ctx.rotate((rotationAngle * Math.PI) / 180);
    ctx.drawImage(overlayImage, -width / 4, -height / 4, width, height);

    ctx.restore();
  };

  const scaleButtonSize = 30; // Set the size of scale buttons

  const hideButtons = () => {
    setScaleButtonsVisible(!scaleButtonsVisible);
  };

  const renderScaleButtons = () => {
    if (mainImage && overlayImage && scaleButtonsVisible) {
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
            key={`scaleButton-${index}`}
            onClick={() => handleScale(0.1 * (index < 2 ? 1 : -1), index < 2)}
            style={{
              position: "absolute",
              top: button.y,
              left: button.x,
              width: scaleButtonSize,
              height: scaleButtonSize,
              backgroundColor: "black",
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
              key={`rotationButton-${index}`}
              onClick={index === 0 ? handleRotateLeft : handleRotateRight}
              style={{
                position: "absolute",
                top: button.y,
                left: button.x,
                width: scaleButtonSize,
                height: scaleButtonSize,
                backgroundColor: "black",
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
    <div style={{ position: "relative" }} >
      <canvas
    
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          cursor: isDragging ? "grabbing" : isResizing ? "se-resize" : "grab",
        }}
     
      />

      {showBoundingBox && (
        <div className="mt-[-26px] flex justify-center w-full gap-4 ">
          <Button onClick={hideButtons}>
            {scaleButtonsVisible ? <b className="flex items-center gap-1 ">Hide Buttons<span className="text-lg"><BiHide/></span></b> : <b className="flex items-center gap-1 ">Show Buttons<span className="text-lg"><BiShow/></span></b>}
          
          </Button>

          <Button onClick={handlePreview}>
            <b>Preview Product</b>
            <br />
          <span className="text-lg"><MdOutlinePreview/></span>
          </Button>
        </div>
      )}

      {showBoundingBox && renderScaleButtons()}
    </div>
  );
}

export default ImageEditor;
