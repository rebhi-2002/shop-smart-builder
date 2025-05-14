
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

// Sample review data
const sampleReviews = [
  {
    id: '1',
    user: { name: 'John D.', avatar: 'https://i.pravatar.cc/150?img=1' },
    rating: 5,
    date: '2023-09-15',
    comment: 'This product exceeded my expectations! The quality is outstanding and I highly recommend it to anyone looking for reliability and performance.',
  },
  {
    id: '2',
    user: { name: 'Sarah M.', avatar: 'https://i.pravatar.cc/150?img=5' },
    rating: 4,
    date: '2023-09-10',
    comment: 'Very good product overall. It works as described and the shipping was fast. The only small issue was the packaging, which could be improved.',
  },
  {
    id: '3',
    user: { name: 'Michael T.', avatar: 'https://i.pravatar.cc/150?img=8' },
    rating: 5,
    date: '2023-09-01',
    comment: 'Absolutely worth every penny! This is my second time purchasing this product and I continue to be impressed with its durability and design.',
  },
];

interface ReviewsProps {
  productId: string;
  rating?: number;
  reviewCount?: number;
}

const Reviews: React.FC<ReviewsProps> = ({ productId, rating = 0, reviewCount = 0 }) => {
  const [userReview, setUserReview] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviews] = useState(sampleReviews);
  
  // In a real app, you would fetch reviews for this product
  const averageRating = rating || 
    reviews.reduce((acc, review) => acc + review.rating, 0) / (reviews.length || 1);
  
  const totalReviews = reviewCount || reviews.length;
  
  // Calculate review stats
  const reviewStats = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  };
  
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would send this to your backend API
    console.log('Submitting review:', {
      productId,
      rating: userRating,
      comment: userReview
    });
    
    // Reset the form
    setUserReview('');
    setUserRating(0);
    
    // Show success message
    alert('Thank you for your review! It will be published soon after moderation.');
  };
  
  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center mb-4">
            <span className="text-5xl font-bold mr-4">{averageRating.toFixed(1)}</span>
            <div>
              <div className="flex text-amber-400 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="h-5 w-5 fill-current" 
                    fill={i < Math.floor(averageRating) ? "currentColor" : "none"} 
                  />
                ))}
              </div>
              <p className="text-muted-foreground">{totalReviews} reviews</p>
            </div>
          </div>
          
          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(star => (
              <div key={star} className="flex items-center">
                <span className="w-8">{star} ★</span>
                <div className="flex-1 mx-2 h-2 bg-gray-200 rounded">
                  <div 
                    className="h-full bg-amber-400 rounded"
                    style={{ width: `${(reviewStats[star as keyof typeof reviewStats] / totalReviews) * 100}%` }}
                  ></div>
                </div>
                <span className="w-8 text-right text-muted-foreground">
                  {reviewStats[star as keyof typeof reviewStats]}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Write a Review */}
        <div>
          <h3 className="font-medium text-lg mb-3">Write a Review</h3>
          <form onSubmit={handleSubmitReview}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Your Rating</label>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-8 w-8 cursor-pointer ${
                      (hoverRating || userRating) > i ? 'text-amber-400 fill-current' : 'text-gray-300'
                    }`}
                    onMouseEnter={() => setHoverRating(i + 1)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setUserRating(i + 1)}
                  />
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Your Review</label>
              <Textarea
                value={userReview}
                onChange={(e) => setUserReview(e.target.value)}
                placeholder="Share your experience with this product..."
                rows={4}
              />
            </div>
            <Button type="submit" disabled={userRating === 0 || userReview.trim() === ''}>
              Submit Review
            </Button>
          </form>
        </div>
      </div>
      
      <Separator />
      
      {/* Customer Reviews */}
      <div>
        <h3 className="font-medium text-lg mb-4">Customer Reviews</h3>
        <div className="space-y-6">
          {reviews.map(review => (
            <div key={review.id} className="mb-6">
              <div className="flex items-center mb-2">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={review.user.avatar} alt={review.user.name} />
                  <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{review.user.name}</h4>
                  <div className="flex items-center">
                    <div className="flex text-amber-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="h-4 w-4 fill-current" 
                          fill={i < review.rating ? "currentColor" : "none"} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 mt-2">{review.comment}</p>
              <div className="mt-3 flex items-center text-sm">
                <Button variant="ghost" size="sm">Helpful</Button>
                <Button variant="ghost" size="sm">Report</Button>
              </div>
              {reviews.indexOf(review) < reviews.length - 1 && <Separator className="mt-6" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
