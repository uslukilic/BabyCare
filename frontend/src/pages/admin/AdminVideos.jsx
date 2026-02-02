import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AdminVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    file: null,
  });

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const res = await api.get("/videos");
      setVideos(res.data);
    } catch {
      alert("Videolar yüklenemedi");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };

  const uploadVideo = async (e) => {
    e.preventDefault();

    if (!form.file) {
      alert("Video dosyası seçin");
      return;
    }

    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("file", form.file);

    try {
      setUploading(true);

      await api.post("/videos/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Video yüklendi");

      setForm({
        title: "",
        description: "",
        file: null,
      });

      loadVideos();
    } catch {
      alert("Video yüklenemedi");
    } finally {
      setUploading(false);
    }
  };

  const deleteVideo = async (id) => {
    if (!window.confirm("Video silinsin mi?")) return;

    try {
      await api.delete(`/videos/${id}`);
      setVideos(videos.filter((v) => v.id !== id));
    } catch {
      alert("Video silinemedi");
    }
  };

  if (loading) {
    return <p className="text-gray-600">Yükleniyor...</p>;
  }

  return (
    <div className="space-y-12">
      {/* ===== BAŞLIK ===== */}
      <h1 className="text-2xl font-semibold text-gray-900">Video Yönetimi</h1>

      {/* ===== VIDEO YÜKLE ===== */}
      <div className="bg-white border border-gray-200 rounded-xl p-8">
        <h2 className="text-lg font-semibold mb-6">Yeni Video Yükle</h2>

        <form
          onSubmit={uploadVideo}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <input
            name="title"
            placeholder="Video Başlığı"
            value={form.title}
            onChange={handleChange}
            required
            className="input"
          />

          <input
            name="description"
            placeholder="Açıklama"
            value={form.description}
            onChange={handleChange}
            className="input"
          />

          <input
            type="file"
            accept="video/mp4"
            onChange={handleFileChange}
            required
            className="md:col-span-2"
          />

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={uploading}
              className={`px-8 py-3 rounded-md text-white transition
                ${
                  uploading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-pink-600 hover:bg-pink-700"
                }`}
            >
              {uploading ? "Yükleniyor..." : "Video Yükle"}
            </button>
          </div>
        </form>
      </div>

      {/* ===== VIDEO LİSTESİ ===== */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Başlık</th>
              <th className="px-6 py-3 text-left">Açıklama</th>
              <th className="px-6 py-3 text-left">Dosya</th>
              <th className="px-6 py-3 text-right">İşlem</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {videos.map((video) => (
              <tr key={video.id}>
                <td className="px-6 py-4">{video.id}</td>
                <td className="px-6 py-4">{video.title}</td>
                <td className="px-6 py-4 max-w-xs truncate">
                  {video.description}
                </td>
                <td className="px-6 py-4 text-gray-500">{video.fileName}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => deleteVideo(video.id)}
                    className="text-red-600 hover:underline"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
