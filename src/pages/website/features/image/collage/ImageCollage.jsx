import "./ImageCollage.css";
import "../../image/Common.css";
import usePageTitle from "../../../../../hooks/usePageTitle";
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import Input from "@/components/common/input/Input";
import Button from "@/components/common/button/Button";
import {
  generateAiPrompt,
  createAiImageCollage,
} from "@/services/serbisyosService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ConfirmPopup from "@/components/common/confirm/ConfirmPopup";
import LoadingStatus from "../../../../../components/common/lstatus/LoadingStatus";
import { FiDownload, FiShare2 } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";

export default function ImageCollage() {
  usePageTitle("Image Collage | AISerbisyosStudio");
  const user = useSelector((state) => state.user.profile);
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [originals, setOriginals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPromptSuggestions, setShowPromptSuggestions] = useState(false);
  const [showPromptConfirm, setShowPromptConfirm] = useState(false);
  const [loadingButton, setLoadingButton] = useState(null);
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 480 });
  const isTablet = useMediaQuery({ maxWidth: 768 });
  const location = useLocation();
  const from = location?.state?.from;
  const MAX_IMAGES = 10;

  const samplePrompts = [
    "Create a stylish 2x2 photo collage with clean white borders, soft shadows, and balanced spacing while preserving the original quality of each image.",
    "Design a modern Instagram-style collage using all uploaded images with rounded corners, subtle gradients, and an aesthetic layout.",
    "Create a heart-shaped collage using the uploaded photos with smooth blending and a romantic, elegant appearance.",
    "Generate a scrapbook-style collage with torn paper edges, tape stickers, handwritten notes, and realistic paper textures.",
    "Create a travel-themed collage featuring all uploaded images with postcard frames, map elements, location pins, and vibrant colors.",
    "Arrange the uploaded photos into a cinematic collage with overlapping images, soft drop shadows, and a premium magazine-style layout.",
    "Design a birthday celebration collage with colorful balloons, confetti, elegant typography, and festive decorations while highlighting every photo.",
    "Create a family photo collage with warm wooden frames, soft lighting, and a cozy home decor style while maintaining realistic proportions.",
    "Generate a minimalistic collage with equal-sized image tiles, consistent spacing, a clean background, and a modern premium aesthetic.",
    "Create a creative mosaic collage where all uploaded photos seamlessly combine into one artistic composition with balanced colors and smooth transitions.",
  ];

  const loadingMessages = [
    "🖼️ Uploading your photos...",
    "🤖 Understanding your collage request...",
    "📸 Analyzing all uploaded images...",
    "🧩 Finding the best layout...",
    "📐 Arranging photos perfectly...",
    "🎨 Applying borders, frames, and styling...",
    "✨ Balancing colors and lighting...",
    "🔍 Enhancing image quality...",
    "🖌️ Blending the collage seamlessly...",
    "⚡ Rendering your final collage...",
    "🎉 Almost done! Preparing your masterpiece...",
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowPromptSuggestions(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, []);

  const handlePromptSelect = (prompt) => {
    setPrompt(prompt);
    setShowPromptSuggestions(false);
  };

  const generatePrompt = () => {
    if (!prompt) {
      toast.error("Please enter a prompt to generate an improved prompt");
      return;
    }

    setShowPromptConfirm(true);
  };

  const callGeneratePromptApi = async () => {
    setShowPromptConfirm(false);
    try {
      setLoadingButton("GENERATE_PROMPT");
      const response = await generateAiPrompt({ prompt, userId: user._id });
      setLoadingButton(null);
      if (response.success) {
        setPrompt(response.prompt);
        toast.success("Prompt generated successfully");
      } else {
        toast.error(response.message || "Failed to generate prompt");
      }
    } catch (error) {
      setLoadingButton(null);
      toast.error(error.response?.data?.message || "Failed to generate prompt");
    }
  };

  const downloadImage = async (fileName = "AIEditedImage.png") => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const shareImage = async () => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();

      const file = new File([blob], "AIEditedImage.png", {
        type: blob.type,
      });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "AI Generated Image",
          text: "Check out this image!",
          files: [file],
        });
      } else if (navigator.share) {
        await navigator.share({
          title: "AI Generated Image",
          text: "Check out this image!",
          url: image,
        });
      } else {
        await navigator.clipboard.writeText(image);
        alert("Sharing is not supported. Image URL copied to clipboard.");
      }
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;
    const allFiles = [...selectedFiles, ...files];

    if (allFiles.length > MAX_IMAGES) {
      toast.error(`You can upload a maximum of ${MAX_IMAGES} images.`);
    }

    const limitedFiles = allFiles.slice(0, MAX_IMAGES);
    setSelectedFiles(limitedFiles);

    const previews = limitedFiles.map((file) => URL.createObjectURL(file));
    setOriginals(previews);
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(originals[index]);

    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setOriginals((prev) => prev.filter((_, i) => i !== index));
  };

  const clearImageCollage = () => {
    setLoading(false);
    setSelectedFiles([]);
    setOriginals([]);
    setPrompt("");
    setImage(null);
  };

  const createImageCollage = async () => {
    if (selectedFiles.length == 0) {
      toast.error("Please upload atleast 2 images to create collage");
      return;
    }

    if (!prompt) {
      setShowPromptSuggestions((prev) => !prev);
      return;
    }

    try {
      setLoading(true);
      setLoadingButton("CREATE_COLLAGE");

      const formData = new FormData();
      selectedFiles.forEach((image) => {
        formData.append("images", image);
      });
      formData.append("prompt", prompt);
      formData.append("userId", user._id);

      const response = await createAiImageCollage(formData);
      setLoadingButton(null);
      setLoading(false);

      if (response.success) {
        setImage(response.image_url);
        setOriginal(null);
        setSelectedFile(null);
        toast.success("Image collage created successfully");
      } else {
        setImage(null);
        toast.error("Failed to create image collage");
      }
    } catch (error) {
      setLoading(false);
      setLoadingButton(null);
      toast.error(
        error.response?.data?.message || "Failed to create image collage",
      );
    }
  };

  return (
    <>
      <section className="create-image">
        <Link to={from ? from : "/"} className="back-home">
          <IoArrowBack />
          <span>Back</span>
        </Link>

        <div className="image-page">
          <div className="preview-card">
            {loading ? (
              <LoadingStatus
                loadingMessages={loadingMessages}
                headingText="Creating Image Collage"
              />
            ) : image ? (
              <>
                <div className="image-preview">
                  <img src={image} alt="Generated" />

                  <div className="image-actions">
                    <button
                      className="image-action-btn"
                      onClick={() => downloadImage()}
                    >
                      <FiDownload />
                    </button>

                    <button
                      className="image-action-btn"
                      onClick={() => shareImage()}
                    >
                      <FiShare2 />
                    </button>
                  </div>
                </div>
              </>
            ) : originals.length > 0 ? (
              <div className="selected-images">
                {originals.map((src, index) => (
                  <div className="image-tile" key={index}>
                    <img src={src} alt={`Preview ${index}`} />

                    <button
                      className="delete-btn"
                      onClick={() => removeImage(index)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="placeholder">
                <div className="placeholder-icon">🧩</div>
                <h2>Create AI Image Collage</h2>
                <p>
                  Upload multiple images and let AI combine them into a
                  beautiful collage.
                </p>
              </div>
            )}
          </div>
          <div className="prompt-card" style={{ paddingTop: "2rem" }}>
            <Input
              textarea={true}
              rows={isMobile ? 10 : isTablet ? 10 : 19}
              id="prompt"
              name="prompt"
              label="Prompt for Creating Image Collage"
              placeholder="Describe the image collage you want to create..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={loading}
            />

            <div className="button-row">
              <Button
                style={{ padding: ".9rem" }}
                disabled={loadingButton !== null}
                onClick={handleButtonClick}
              >
                Upload Images
              </Button>
              <div className="dropdown" ref={dropdownRef}>
                <Button
                  onClick={createImageCollage}
                  loading={loadingButton === "CREATE_COLLAGE"}
                  disabled={loadingButton !== null}
                  style={{ padding: ".9rem" }}
                  customClass="primary-button"
                  theme="dark"
                >
                  Create Collage
                </Button>
                {showPromptSuggestions && (
                  <div className="dropdown-menu second custom-scrollbar">
                    <h4 className="dropdown-heading">✨ Please select a prompt</h4>
                    {samplePrompts.map((item) => (
                      <button
                        key={item}
                        onClick={() => handlePromptSelect(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <Button
                style={{ padding: ".9rem" }}
                loading={loadingButton === "GENERATE_PROMPT"}
                disabled={loadingButton !== null}
                onClick={generatePrompt}
              >
                Generate Prompt
              </Button>

              <Button
                disabled={loadingButton !== null}
                style={{ padding: ".9rem" }}
                onClick={() => clearImageCollage()}
              >
                Clear
              </Button>
            </div>
          </div>
        </div>
      </section>
      <ConfirmPopup
        isOpen={showPromptConfirm}
        message="Generating an AI prompt will consume 50 credits from your available balance. Do you want to continue?"
        confirmText="Yes"
        cancelText="No"
        onConfirm={() => callGeneratePromptApi()}
        onCancel={() => setShowPromptConfirm(false)}
      />
    </>
  );
}