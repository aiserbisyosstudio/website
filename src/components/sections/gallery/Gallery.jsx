import "./Gallery.css";

export default function Gallery({ t }) {
  const media = [
    {
      id: "101",
      url: "https://res.cloudinary.com/ai-serbisyos-studio/image/upload/v1780868926/aistudio_uploads/COLLAGE/e9h9qbqnx5dfh0djme87.png",
      type: "image",
    },
    {
      id: "102",
      url: "https://res.cloudinary.com/ai-serbisyos-studio/image/upload/v1780869038/aistudio_uploads/COLLAGE/zt80era5inyiqxzxldub.png",
      type: "image",
    },
    {
      id: "103",
      url: "https://res.cloudinary.com/ai-serbisyos-studio/video/upload/v1780946468/aistudio_uploads/VIDEO/hgsdmjegoam4uaugjfhc.mp4",
      type: "video",
    },
    {
      id: "104",
      url: "https://res.cloudinary.com/ai-serbisyos-studio/image/upload/v1780870409/aistudio_uploads/IMAGES/t6wpj8hj0giz3foo1l1r.png",
      type: "image",
    },
    {
      id: "105",
      url: "https://res.cloudinary.com/ai-serbisyos-studio/image/upload/v1780870786/aistudio_uploads/IMAGES/agzqdf7r7nyjqitu5yrj.png",
      type: "image",
    },
    {
      id: "106",
      url: "http://res.cloudinary.com/ai-serbisyos-studio/image/upload/v1781416923/aistudio_uploads/IMAGES/ih8xmntuuvux5u7j7dq4.png",
      type: "image",
    },
  ];

  return (
    <section className="showcase-section">
      <span className="showcase-tag">{t("home.gallery.title")}</span>

      <h2 className="showcase-title">{t("home.gallery.heading")}</h2>

      <div className="showcase-grid">
        {media.map((item) => (
          <div className="showcase-card" key={item.id}>
            {item.type === "image" ? (
              <img src={item.url} alt="" className="showcase-image" />
            ) : (
              <>
                <video
                  className="showcase-media"
                  src={item.url}
                  controls
                  preload="metadata"
                />
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}