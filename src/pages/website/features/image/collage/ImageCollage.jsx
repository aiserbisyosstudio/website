import "./ImageCollage.css";
import "../../image/Common.css";
import usePageTitle from "../../../../../hooks/usePageTitle";
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import Input from "@/components/common/input/Input";
import Button from "@/components/common/button/Button";
import { generateAiPrompt, generateAiImage } from "@/services/serbisyosService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ConfirmPopup from "@/components/common/confirm/ConfirmPopup";

export default function ImageCollage() {
    usePageTitle("Image Collage | AISerbisyosStudio");
}