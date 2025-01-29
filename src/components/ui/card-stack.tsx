"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ImageWithFallback from "@/components/ImageWithFallback";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

let interval: any;

type Card = {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
  image: string;
  link?: string;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    startFlipping();

    return () => clearInterval(interval);
  }, []);
  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()!); // move the last element to the front
        return newArray;
      });
    }, 5000);
  };

  return (
    <div className="relative  h-60 w-60 md:h-[240px] md:w-[480px]">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute dark:bg-black bg-white h-60 w-60 md:h-[auto] md:w-[440px] rounded-3xl p-2 shadow-xl border border-neutral-200 dark:border-white/[0.1]  shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cards.length - index, //  decrease z-index for the cards that are behind
            }}
          >
            <Box
              component="div"
              sx={{
                width: "100%",
                height: "200px", // Adjust height as needed
                overflow: "hidden",
              }}
              className="rounded-t-3xl"
            >
              <ImageWithFallback
                alt={card.name}
                height={200}
                width={320}
                src={card.image}
                className="rounded-t-3xl"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                fallbackSrc="image-placeholder_pvbgme"
              />
            </Box>
            <Box component="div" sx={{ fontWeight: 200 }}>
              <Typography variant="h6" sx={{ fontSize: "1rem" }}>
                {card.name}
              </Typography>
              <Typography variant="caption">{card.designation}</Typography>
            </Box>

            <Box component="div" sx={{ fontWeight: 200 }}>
              {card.content}
            </Box>
          </motion.div>
        );
      })}
    </div>
  );
};
