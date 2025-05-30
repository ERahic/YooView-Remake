// In order to have blurry/tunnel vision effect for when modal video is opened; need to make a new component that will render in a seeperate dom tree layer by using react portals
"use client";
import { useEffect } from "react";
import { createPortal } from "react-dom";

// Need to defin the props that will be used to help create Modal, as well as have a glassified tunnel vision effect when opened
type Props = {
  videoId: string;
  onClose: () => void;
};

function VideoModal({ videoId, onClose }: Props) {
  // useEffect used to recognize that when "Esc" key is pressed once, video modal will close if you dont have a mouse to click on the red "X"
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);
  // createPortal allows to render a component into a different part of the DOM, useful for creating blur/tunnelvision effect
  return createPortal(
    <div className="fixed inset-0 z-50 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.1)_0%,_rgba(0,0,0,0.9)_100%)] flex justify-center items-center caret-transparent transition-all duration-300">
      <div className="relative w-[1200px] h-auto rounded-lg overflow-hidden bg-transparent">
        <button
          onClick={onClose}
          className="absolute text-2xl sm:fixed right-0 sm:top-80 sm:right-150 text-6xl text-red-900 cursor-pointer rounded-full bg-black p-3"
        >
          X
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="w-full h-[500px]"
        ></iframe>
      </div>
    </div>,
    document.body
  );
}

export default VideoModal;
