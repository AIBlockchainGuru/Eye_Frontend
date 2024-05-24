import React, { useState } from "react";
import { useRouter } from "next/router";
import Wrapper from "@/components/Wrapper";
import { Button } from "@nextui-org/react";
import ImageOverlay from "./ImageOverlay";
import Image from "next/image";
import ip from "../public/upload.png";
import { userAgent } from "next/server";
import CustomTextComponent from "./CustomTextComponent";
import { toast } from "react-toastify";

const Editor = () => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);
  const [userDesign, setUserDesign] = useState(null);
  const [isDesignUploaded, setIsDesignUploaded] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const handleUploadDesign = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      console.log(selectedImage);
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log("uploaded", e.target, e);
        setUserDesign(e.target.result);

        setIsDesignUploaded(true);
        // console.log(userDesign);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadAgain = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      console.log(selectedImage);
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log("uploaded again", e.target, e);
        setUserDesign(e.target.result);
        setIsDesignUploaded(true);
        // console.log("a", userDesign, selectedImage);
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleCreateDesign = async (e) => {
  //   const designerId = sessionStorage.getItem("designerID");
  //   const apiUrl = "http://localhost:8080/api/designer/createDesign";

  //   if (!isDesignUploaded) {
  //     console.error("No design uploaded");
  //     return;
  //   }

  //   const headers = {
  //     "Content-Type": "application/json",
  //     "x-api-key": "token",
  //   };

  //   const formData = new FormData();
  //   formData.append("designerId", designerId);
  //   formData.append("image", selectedImage);
  //   // console.log(formData);

  //   try {
  //     const response = await fetch(apiUrl, {
  //       method: "POST",
  //       headers: headers,
  //       body: formData,
  //     });

  //     const responseData = await response.json();
  //     console.log(responseData);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async () => {
    const apiUrl = "http://localhost:8080/api/designer/createDesign";
    const apiKey = "token";
    const formData = new FormData();

    if (name === "") {
      setNameError("Name cannot be empty");
      return;
    }

    if (description === "") {
      setDescriptionError("Description cannot be empty");
      return;
    }

    if (!userDesign) {
      toast.error("Add design first");
    }

    if (selectedImage) {
      formData.append("image", selectedImage);
    }
    const designerId = sessionStorage.getItem("designerID");
    formData.append("designerId", designerId);
    console.log("Name:", name);
    console.log("Description:", description);
    console.log("designer :", designerId);
    console.log("design :", userDesign);

    formData.append("title", name);
    formData.append("description", description);

    console.log(formData, "selected image", selectedImage);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
        },
        body: formData,
      });

      const responseData = await response.json();
      console.log(responseData);
      // Check if the response contains designImage[0].url
      if (responseData.designImage && responseData.designImage.length > 0) {
        const imageUrl = responseData.designImage[0].url;
        toast.success("Added Design Successfully");
        // Navigate to the /image-design route
        router.push(`/image-editor?url=${imageUrl}`);
      }
    } catch (err) {
      toast.error("Error in adding design");
      console.log(err);
    }
  };

  return (
    <>
      <Wrapper>
        <div className="">


          <div>
            <div className=" shadow-none image-pattern flex gap-[90px] justify-center items-center  h-[400px] bg-gray-100/75 my-6 rounded-md mt-10 ">
              <div className="flex flex-col  items-center ">
                <div className="border-2 border-dashed border-black rounded-md shadow-sm p-2 h-[300px] flex justify-center items-center w-[300px]">
                  <img
                    src={userDesign || "/image_editor.png"}
                    alt="User Design"
                    width={300}
                    className="object-contain w-full h-full"
                    // prperty to fit the images in the container
                  />
                </div>

                {!isDesignUploaded && (
                  <label >
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleUploadDesign}
                    />
                    <button
                      className=" font-bold text-black border-2 border-black rounded-full p-2 px-4 bg-transparent shadow-md hover:bg-black hover:text-white mt-3"
                      style={{
                        border: "1px solid black",
                        textDecoration: "none",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        document.querySelector("input[type=file]").click()
                      }
                    >
                      Upload Design
                    </button>
                  </label>
                )}

                {isDesignUploaded && (
                  <>
                    <label>
                      <input
                        type="file"
                        accept="image/*"
                        name="image"
                        style={{ display: "none" }}
                        onChange={handleUploadAgain}
                      />
                      <button
                        className=" flex justify-center items-center font-bold text-black border-2 border-black rounded-full p-2 px-4 bg-transparent shadow-md hover:bg-black hover:text-white mt-3"
                        style={{
                          border: "1px solid black",
                          textDecoration: "none",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          document.querySelector("input[type=file]").click()
                        }
                      >
                        Upload Again
                      </button>
                    </label>

                    {/* <Button
                      variant="contained"
                      className="text-black border border-black  rounded-full p-2 px-4 bg-transparent shadow-md hover:bg-black hover:text-white mt-3"
                      onClick={handleCreateDesign}
                    >
                      Create Design
                    </Button> */}
                  </>
                )}
              </div>
              <div className="relative">
                <Image src={ip} alt="image" />

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ">
                  <div className="flex flex-col gap-5 items-center glass p-7 pt-[1em]">
                    <p className="text-white font-bold text-2xl">
                      Design Details
                    </p>
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={handleNameChange}
                      className="border p-2 mb-2 rounded-full px-7"
                    />
                    {nameError && <p className="text-red-500">{nameError}</p>}

                    <input
                      placeholder="Description"
                      value={description}
                      onChange={handleDescriptionChange}
                      className="border p-2 mb-2 rounded-[30px] px-7"
                    />
                    {descriptionError && (
                      <p className="text-red-500">{descriptionError}</p>
                    )}

                    <button
                      onClick={handleSubmit}
                      className="bg-blue-500 text-white font-bold text-xl p-3 px-6 rounded-full  active:scale-95  transitions-all duration-100 "
                    >
                      Create Design
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <CustomTextComponent fontSize="29px">
              Check Your Design on the Products
            </CustomTextComponent>

            <div className="">
              <div className="flex gap-4">
                {[0, 1, 2].map((e, index) => (
                  <div key={index} className="flex flex-col justify-center items-center bg-white/95 shadow-sm rounded-[30px] inline-block w-[230px] p-5 bg-red-300 border-3 border-zinc-600">
                    <ImageOverlay
                      mainImage="/t_shirt2.png"
                      overlayImage={userDesign || "/logo_e.png"}
                      overlayPosition="10,20"
                      width={200}
                      height={200}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Editor;
