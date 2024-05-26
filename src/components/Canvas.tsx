import { useEffect, useRef, useState } from "react";

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [text, setText] = useState<string>("CANVAS");

  useEffect(() => {
    if (!canvasRef) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 500;
    canvas.height = 500;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    context.fillStyle = "white";
    context.font = "50px sans-serif";
    context.textAlign = "center";
    context.fillText(text, 250, 100);

    contextRef.current = context;
  }, [text]);

  const saveImageToLocal = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    let link = event.currentTarget;
    link.setAttribute("download", "canvas.png");
    if (!canvasRef.current) return;
    let image = canvasRef.current.toDataURL("image/png");
    link.setAttribute("href", image);
  };

  return (
    <div>
      <canvas
        className="canvas-container"
        ref={canvasRef}
        style={{ border: "solid 1px grey" }}
      ></canvas>
      <div>
        <input
          value={text}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setText(event.target.value);
          }}
        />
        <a
          id="download_image_link"
          href="download_link"
          onClick={saveImageToLocal}
        >
          Download Image
        </a>
      </div>
    </div>
  );
};
