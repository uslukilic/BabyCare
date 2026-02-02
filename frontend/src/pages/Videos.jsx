import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Videos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    api
      .get("/videos")
      .then((res) => setVideos(res.data))
      .catch(() => alert("Videolar yüklenemedi"));
  }, []);

  return (
    <>
      {/* ===== ÜST BAŞLIK ===== */}
      <section className="w-full bg-[#F7ECF3] py-24">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <h1 className="text-[42px] font-semibold text-gray-900 mb-4">
            Videolar
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Doğum sonrası bakım sürecini destekleyen eğitim ve bilgilendirme
            videoları.
          </p>
        </div>
      </section>

      {/* ===== VİDEO LİSTESİ ===== */}
      <section className="w-full bg-white py-32">
        <div className="max-w-6xl mx-auto px-8">
          {videos.length === 0 ? (
            <p className="text-center text-gray-500">Henüz video eklenmedi.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
                >
                  {/* Video */}
                  <video
                    controls
                    className="w-full h-[260px] object-cover bg-black"
                  >
                    <source
                      src={`http://localhost:5222/videos/${video.fileName}`}
                      type="video/mp4"
                    />
                  </video>

                  {/* İçerik */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {video.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
