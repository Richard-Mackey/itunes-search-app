// sidebar filter

import "./Sidebar.css";

const mediaTypes = [
  { value: "all", label: "All Media" },
  { value: "music", label: "Music" },
  { value: "movie", label: "Movies" },
  { value: "podcast", label: "Podcasts" },
  { value: "music_video", label: "Music Videos" },
  { value: "audiobook", label: "Audiobooks" },
  { value: "short_film", label: "Short Films" },
  { value: "TV_episode", label: "TV Shows" },
  { value: "Ebook", label: "eBooks" },
];
// allows sidebar to filter different media types
const Sidebar = ({ selectedMediaType, onMediaTypeChange }) => {
  const handleMediaTypeClick = (mediaType) => {
    onMediaTypeChange(mediaType);
  };

  return (
    <div className="sidebar bg-dark">
      {mediaTypes.map((type) => (
        <a
          key={type.value}
          href="#"
          className={`media-type-link ${
            selectedMediaType === type.value ? "active" : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
            handleMediaTypeClick(type.value);
          }}
        >
          {type.label}
        </a>
      ))}
    </div>
  );
};
export default Sidebar;
