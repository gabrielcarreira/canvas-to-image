import { useEffect, useRef, useState } from "react";

const BACKGROUND_IMAGE_URL =
  "https://res.cloudinary.com/dvyhc5pp5/image/upload/v1716761457/jdaxh5fsomxfcuyfhbl1.png";

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [template, setTemplate] = useState([
    {
      text: "TITLE",
      x: 540,
      y: 300,
      color: "white",
      fontSize: 100,
      fontWeight: 900,
      fontFamily: "sans-serif",
    },
    {
      text: "subtitle",
      x: 540,
      y: 700,
      color: "red",
      fontSize: 60,
      fontWeight: 100,
      fontFamily: "sans-serif",
    },
  ]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.width = 1080;
    canvas.height = 1920;

    const ctx = canvas.getContext("2d");

    contextRef.current = ctx;

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = BACKGROUND_IMAGE_URL;

    img.onload = function () {
      imageRef.current = img;
      drawCanvas();
    };
  }, []);

  useEffect(() => {
    drawCanvas();
  }, [template]);

  const drawCanvas = () => {
    const ctx = contextRef.current;
    const img = imageRef.current;
    if (!ctx || !img) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(img, 0, 0);

    template.forEach((item) => {
      ctx.fillStyle = item.color;
      ctx.font = `${item.fontWeight} ${item.fontSize}px ${item.fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(item.text, item.x, item.y);
    });
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    const newTemplate = [...template];
    newTemplate[index] = {
      ...newTemplate[index],
      [field]:
        field === "fontSize" || field === "fontWeight" ? Number(value) : value,
    };
    setTemplate(newTemplate);
  };

  const handleSaveImage = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    let link = event.currentTarget;
    link.setAttribute("download", "canvas.png");
    if (!canvasRef.current) return;
    let image = canvasRef.current.toDataURL("image/png");
    link.setAttribute("href", image);
  };

  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", maxWidth: 900 }}
    >
      <div>
        {template.map((item, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <input
              type="text"
              value={item.text}
              onChange={(event) =>
                handleInputChange(index, "text", event.target.value)
              }
              placeholder="Text"
            />
          </div>
        ))}
        <a
          id="download_image_link"
          href="download_link"
          onClick={handleSaveImage}
        >
          Download Image
        </a>
      </div>
      <canvas
        ref={canvasRef}
        style={{ border: "solid 1px grey", width: "100%" }}
      />
    </div>
  );
};
