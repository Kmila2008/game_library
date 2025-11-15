import React from 'react';
import './ReviewItem.css'; 

export default function ReviewItem({ review }) {
  return (
    <div className="review-item">
      <div className="avatar">{review.title[0].toUpperCase()}</div>
      <div className="review-content">
        <div className="review-header">
          <strong>{review.title}</strong>
          <span className="stars">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
        </div>
        <p className="comment">{review.comment}</p>
      </div>
    </div>
  );
}