import "./EditImage.css";
import "../../image/Common.css";
import { Link, useLocation } from "react-router-dom";
import usePageTitle from "../../../../../hooks/usePageTitle";
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import Input from "@/components/common/input/Input";
import Button from "@/components/common/button/Button";
import { generateAiPrompt, editAiImage } from "@/services/serbisyosService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ConfirmPopup from "@/components/common/confirm/ConfirmPopup";
import LoadingStatus from "../../../../../components/common/lstatus/LoadingStatus";
import { FiDownload, FiShare2 } from "react-icons/fi";

export default function EditImage() {
  usePageTitle("Edit Image | AISerbisyosStudio");
  const user = useSelector((state) => state.user.profile);
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [original, setOriginal] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
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

  const samplePrompts = [
    "Replace the background with a futuristic cyberpunk city at night featuring glowing neon signs, wet streets, and cinematic lighting while preserving the person's pose and facial features.",
    "Change the person's outfit into a modern black business suit with realistic fabric textures while keeping the same face, hairstyle, body proportions, and natural lighting.",
    "Transform this daytime photo into a magical golden-hour sunset scene with warm sunlight, realistic shadows, and vibrant sky colors while preserving all subjects.",
    "Remove all unwanted people and distracting objects from the background, then naturally reconstruct the missing areas so the edit is invisible.",
    "Replace the background with a tropical beach featuring crystal-clear water, white sand, and palm trees while maintaining realistic edge blending and lighting.",
    "Convert this image into a professional studio portrait with a clean dark background, softbox lighting, natural skin tones, and high-end photography quality.",
    "Enhance the face by improving skin texture, removing blemishes, sharpening the eyes, and whitening the teeth while maintaining a completely natural appearance.",
    "Change the weather from sunny to heavy snowfall with realistic snow accumulation, atmospheric fog, and cool winter lighting while preserving the original composition.",
    "Expand the image into a cinematic 16:9 landscape by seamlessly extending the surroundings while keeping the original subject centered and realistic.",
    "Replace the sky with a dramatic Milky Way night sky filled with stars while preserving realistic reflections, lighting, and shadows throughout the scene.",
  ];

  const loadingMessages = [
    "🖼️ Loading your image...",
    "🤖 Understanding your editing instructions...",
    "🎯 Detecting objects and regions...",
    "✂️ Applying intelligent edits...",
    "🎨 Matching colors and textures...",
    "💡 Adjusting lighting and shadows...",
    "🧩 Blending changes naturally...",
    "🔍 Enhancing fine details...",
    "⚡ Finalizing your edited image...",
    "🎉 Almost done! Preparing your result...",
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

  const editImage = async () => {
    if (!original) {
      toast.error("Please upload an image to edit");
      return;
    }

    if (!prompt) {
      setShowPromptSuggestions((prev) => !prev);
      return;
    }

    try {
      setLoading(true);
      setLoadingButton("EDIT_IMAGE");

      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("prompt", prompt);
      formData.append("userId", user._id);

      const response = await editAiImage(formData);
      setLoadingButton(null);
      setLoading(false);

      if (response.success) {
        setImage(response.image_url);
        setOriginal(null);
        setSelectedFile(null);
        toast.success("Image edited successfully");
      } else {
        setImage(null);
        toast.success("Failed to create image");
      }
    } catch (error) {
      setLoading(false);
      setLoadingButton(null);
      toast.error(error.response?.data?.message || "Failed to edit image");
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;
    setSelectedFile(file);
    setOriginal(URL.createObjectURL(file));
  };

  const clearEditImage = () => {
    setLoading(false);
    setSelectedFile(null);
    setOriginal(null);
    setPrompt("");
    setImage(null);
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
                headingText="Editing Your Image"
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
            ) : original ? (
              <div className="image-preview" style={{ background: "white" }}>
                <img src={original} alt="Original" />
              </div>
            ) : (
              <div className="placeholder">
                <div className="placeholder-icon">🪄</div>
                <h2>Edit Images with AI</h2>
                <p>Upload an image and tell AI what to change.</p>
              </div>
            )}
          </div>
          <div className="prompt-card" style={{ paddingTop: "2rem" }}>
            <Input
              textarea={true}
              rows={isMobile ? 10 : isTablet ? 10 : 19}
              id="prompt"
              name="prompt"
              label="Prompt for Creating Image"
              placeholder="Describe the image you want to generate..."
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
                Upload Image
              </Button>
              <div className="dropdown" ref={dropdownRef}>
                <Button
                  onClick={editImage}
                  loading={loadingButton === "EDIT_IMAGE"}
                  disabled={loadingButton !== null}
                  style={{ padding: ".9rem" }}
                  customClass="primary-button"
                  theme="dark"
                >
                  Edit Image
                </Button>
                {showPromptSuggestions && (
                  <div className="dropdown-menu second custom-scrollbar">
                    <h4 className="dropdown-heading">
                      ✨ Please select a prompt
                    </h4>
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
                onClick={() => clearEditImage()}
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