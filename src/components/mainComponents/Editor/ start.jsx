// pages/design-selection.js
import React, { useState } from "react";
import { useRouter } from "next/router";
import ImageOverlay from "./image";
import styles from "./DesignSelection.module.css"; // Import your CSS file
import Link from "next/link";
import { Button } from "@mui/material";
function DesignSelection() {
  const [userDesign, setUserDesign] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();

  const handleDesignChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserDesign(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
 

  const handleEditImage = (imageData) => {
    setSelectedImage(imageData);
    router.push(
        {
            pathname: '/image-editor/[mainImage]',
            query: {
              mainImage: "t_hoodie.png",
              overlayImage: userDesign || "logo_e.png",
            },
        }
          );
  };

  return (
    <>
      <div className={styles["design-selection"]}>
        <div className={styles["design-table"]}>
          <div className={styles["design-table-row"]}>
            <div className={styles["design-cell"]}>Design</div>
            <div className={styles["design-cell"]}>Categories</div>
          </div>
          <div className={styles["design-table-row"]}>
            <div className={styles["design-cell"]}>
              <img src={userDesign || "logo_e.png"} alt="User Design" />
              <label>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleDesignChange}
                />
                <button
                  style={{
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    marginLeft: "5%",
                    marginTop: "20%",
                    backgroundColor: "#CBB428",
                    borderRadius: "20px",
                    cursor: "pointer",
                    border: "none",
                  }}
                >
                  Change Design
                </button>
              </label>
            </div>
            <div className={styles["design-cell"]}>
              <div className={styles["category"]}>
                <button className={styles["category-button"]}>Shirts</button>
                <div className={styles["category-images"]}>
                <ImageOverlay
                    mainImage="t_shirt2.png"
                    overlayImage={userDesign || "logo_e.png"}
                    overlayPosition="10,20"
                    width={200}
                    height={200}
                  />
                  <Button
                    variant="outlined"
                    className="edit-button"
                    onClick={() => handleEditImage(selectedImage || userDesign)}
                  >
                    Edit
                  </Button>
                  <ImageOverlay
                    mainImage="t_shirt2.png"
                    overlayImage={userDesign || "logo_e.png"}
                    overlayPosition="10,20"
                    width={200}
                    height={200}
                  />
                  <Button
                    variant="outlined"
                    className="edit-button"
                    onClick={() => handleEditImage(selectedImage || userDesign)}
                  >
                    Edit
                  </Button>
                  <ImageOverlay
                    mainImage="t_shirt2.png"
                    overlayImage={userDesign || "logo_e.png"}
                    overlayPosition="10,20"
                    width={200}
                    height={200}
                  />
                  <Button
                    variant="outlined"
                    className="edit-button"
                    onClick={() => handleEditImage(selectedImage || userDesign)}
                  >
                    Edit
                  </Button>
                
                </div>
              </div>
              <div className={styles["category"]}>
                <button className={styles["category-button"]}>Hoodie</button>
                <div className={styles["category-images"]}>
                <Button variant="contained">Hoodie</Button>
                <div className="category-images">
                  <ImageOverlay
                    mainImage="t_hoodie.png"
                    overlayImage={userDesign || "logo_e.png"}
                    overlayPosition="10,20"
                    width={300}
                    height={400}
                  />
                  <Button
                    variant="outlined"
                    className="edit-button"
                    onClick={() => handleEditImage(selectedImage || userDesign)}
                  >
                    Edit
                  </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Pass the selected image to the Editor */}

      <Link href={`/image-editor?mainImage=${encodeURIComponent("t_hoodie.png")}&overlayImage=${encodeURIComponent(userDesign || "logo_e.png")}`}>
        Edit Image
      </Link>
    </>
  );
}

export default DesignSelection;
