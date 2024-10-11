// components/Reviews.js
import React from "react";
import { List, Avatar, Typography } from "antd";

const { Title } = Typography;

const Reviewtranslator = ({ reviews }) => {
  return (
    <div className="mb-6">
      <Title level={4} className="mt-8">Reviews</Title>
      <List
        itemLayout="horizontal"
        dataSource={reviews}
        renderItem={review => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={review.avatar} size={64} />}
              title={
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-700">{review.name}</span>
                  <span className="text-gray-600">
                    {review.rating ? '⭐'.repeat(Math.round(Number(review.rating))) : ''}
                  </span>
                </div>
              }
              description={
                <>
                  <p className="text-gray-500">{review.date}</p>
                  <p className="text-gray-600">{review.review}</p>
                </>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Reviewtranslator;
