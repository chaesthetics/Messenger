// components/FullPageLoader.tsx
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center">
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2">
        <DotLottieReact
          src="https://lottie.host/e7bf6ba5-a6e6-439b-bcb1-07d2b6d6dbfc/rRZan5FLUS.lottie"
          loop
          autoplay
          style={{
            width: "200px", // or 256px for a cleaner resolution
            height: "200px",
          }}
        />
      </div>
    </div>
  );
};

export default FullPageLoader;
