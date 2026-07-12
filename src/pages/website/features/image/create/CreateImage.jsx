import { useEffect, useRef, useState } from "react";
import "./CreateImage.css";
import { FiDownload, FiShare2 } from "react-icons/fi";
import Button from "@/components/common/button/Button";
import usePageTitle from "../../../../../hooks/usePageTitle";
import LoadingStatus from "../../../../../components/common/lstatus/LoadingStatus";
import { generateAiPrompt, createAiImage } from "@/services/aiService";
import Input from "@/components/common/input/Input";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import ConfirmPopup from "@/components/common/confirm/ConfirmPopup";

export default function CreateImage() {
  usePageTitle("Create Image | AISerbisyosStudio");
  const user = useSelector((state) => state.user.profile);
  const usage = useSelector((state) => state.user.usage);
  const plan = useSelector((state) => state.user.plan);
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPromptSuggestions, setShowPromptSuggestions] = useState(false);
  const [showPromptConfirm, setShowPromptConfirm] = useState(false);
  const [selectedImage, setSelectedImage] = useState("Square");
  const [selectedImageSize, setSelectedImageSize] = useState("1024x1024");
  const [loadingButton, setLoadingButton] = useState(null);
  const dropdownRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 480 });
  const isTablet = useMediaQuery({ maxWidth: 768 });
  const location = useLocation();
  const from = location?.state?.from;

  const samplePrompts = [
    "A futuristic cyberpunk city glowing under neon rain, flying cars, cinematic lighting, ultra-detailed, photorealistic, 8K",
    "A majestic dragon sleeping around a crystal castle on top of snowy mountains, magical atmosphere, ultra realistic",
    "A hidden tropical waterfall surrounded by lush rainforest, sunlight rays, crystal-clear water, photorealistic",
    "A luxury glass villa built into a cliff overlooking the ocean during sunset, modern architecture, realistic",
    "A futuristic electric supercar parked under neon city lights after rain, cinematic reflections",
    "A majestic white tiger walking through a glowing bamboo forest at night, ultra realistic",
    "A gourmet cheeseburger with melted cheese, crispy fries, dramatic studio lighting, commercial food photography",
    "A confident young woman wearing futuristic cyberpunk fashion with neon lighting, ultra realistic portrait",
    "A dreamlike floating island above the clouds painted in surreal fantasy style",
    "Santorini cliffside during sunset with white buildings and blue domes, ultra realistic",
  ];

  const loadingMessages = [
    "✨ Understanding your prompt...",
    "🧠 Imagining the perfect scene...",
    "🎨 Creating your artwork...",
    "🌈 Adding colors and lighting...",
    "🔍 Refining every detail...",
    "💎 Enhancing image quality...",
    "🚀 Rendering the final image...",
    "🎉 Your masterpiece is almost ready...",
  ];

  const imageSizes = [
    {
      key: "square",
      label: "Square",
      value: "1024x1024",
    },
    {
      key: "landscape",
      label: "Landscape",
      value: "1536x1024",
    },
    {
      key: "portrait",
      label: "Portrait",
      value: "1024x1536",
    },
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

  const generateImage = async () => {
    if (!prompt) {
      toast.error(
        "Please provide a description for the image you want to create",
      );
      return;
    }

    try {
      setLoading(true);
      setLoadingButton("GENERATE_IMAGE");
      const response = await createAiImage({
        prompt,
        size: selectedImageSize,
        userId: user._id,
      });
      setLoadingButton(null);
      setLoading(false);
      if (response.success) {
        setImage(response.image_url);
        toast.success("Image created successfully");
      } else {
        setImage(null);
        toast.success("Failed to create image");
      }
    } catch (error) {
      setImage(null);
      setLoading(false);
      setLoadingButton(null);
      toast.error(error.response?.data?.message || "Failed to create imaget");
    }
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
        toast.error("Failed to generate prompt");
      }
    } catch (error) {
      setLoadingButton(null);
      toast.error(error.response?.data?.message || "Failed to generate prompt");
    }
  };

  const clearCreateImage = () => {
    setLoading(false);
    setGloading(false);
    setPrompt("");
    setImage(null);
  };

  const imageSizeSelected = (image) => {
    setSelectedImageSize(image.value);
    setSelectedImage(image.label);
  };

  const downloadImage = async (fileName = "AIImage.png") => {
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

      const file = new File([blob], "image.jpg", {
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
    <section className="create-image">
      <Link to={from ? from : "/"} className="back-home">
        <IoArrowBack />
        <span>Back</span>
      </Link>
      <div className="image-page">
        <div className="preview-card">
          {loading ? (
            <LoadingStatus loadingMessages={loadingMessages} />
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

                  <button className="image-action-btn" onClick={() => shareImage()}>
                    <FiShare2 />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="placeholder">
              <div className="placeholder-icon">🎨</div>
              <h2>Create Amazing AI Images</h2>
              <p>Enter a prompt below and let AI create your imagination.</p>
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

          <div className="size-row">
            {imageSizes.map((item, index) => (
              <button
                key={item.key}
                type="button"
                className={`box ${selectedImage === item.label ? "selectedBox" : ""}`}
                style={{
                  ...(index === 0 && {
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                  }),
                  ...(index === imageSizes.length - 1 && {
                    borderTopRightRadius: ".5rem",
                    borderBottomRightRadius: ".5rem",
                  }),
                }}
                onClick={() => imageSizeSelected(item)}
                disabled={loading}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="button-row">
            <Button
              style={{ padding: ".9rem" }}
              loading={loadingButton === "GENERATE_PROMPT"}
              disabled={loadingButton !== null}
              onClick={generatePrompt}
            >
              Generate Prompt
            </Button>
            <div className="dropdown" ref={dropdownRef}>
              <Button
                style={{ padding: ".9rem" }}
                disabled={loadingButton !== null}
                onClick={() => setShowPromptSuggestions((prev) => !prev)}
              >
                Sample Prompts
              </Button>
              {showPromptSuggestions && (
                <div className="dropdown-menu custom-scrollbar">
                  {samplePrompts.map((item) => (
                    <button key={item} onClick={() => handlePromptSelect(item)}>
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Button
              onClick={generateImage}
              loading={loadingButton === "GENERATE_IMAGE"}
              disabled={loadingButton !== null}
              style={{ padding: ".9rem" }}
            >
              Generate Image
            </Button>
            <Button
              disabled={loadingButton !== null}
              style={{ padding: ".9rem" }}
              onClick={() => clearCreateImage()}
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
      <ConfirmPopup
        isOpen={showPromptConfirm}
        message="Generating an AI prompt will consume 50 credits from your available balance. Do you want to continue?"
        confirmText="Yes"
        cancelText="No"
        onConfirm={() => callGeneratePromptApi()}
        onCancel={() => setShowPromptConfirm(false)}
      />
    </section>
  );
}