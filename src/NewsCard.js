import React from "react";

export const NewsCard = ({ news }) => {
  return (
    <div className="news-card">
      <img
        className="news-image"
        src={news.field_photo_image_section}
        alt="news"
      />
      <div class="news-content">
        <div className="news-title">{news.title}</div>
        <p className="news-time">{new Date(news.last_update).toDateString()}</p>
      </div>
    </div>
  );
};
