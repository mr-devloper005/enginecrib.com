"use client";

import { X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { ContentImage } from "./content-image";

type Props = {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
};

export function ImageLightbox({ images, initialIndex = 0, isOpen, onClose }: Props) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrevious();
    },
    [isOpen, onClose, handleNext, handlePrevious]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen || !images.length) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm" onClick={onClose}>
      <div className="relative h-full w-full max-w-7xl p-4" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          aria-label="Close lightbox"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Image Container */}
        <div className="relative flex h-full items-center justify-center">
          <div className="relative max-h-full max-w-full">
            <ContentImage
              src={images[currentIndex]}
              alt={`Gallery image ${currentIndex + 1} of ${images.length}`}
              width={1920}
              height={1080}
              className="max-h-[85vh] w-auto object-contain"
              priority
            />
          </div>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Previous image"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Next image"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
}
