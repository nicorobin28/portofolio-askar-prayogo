import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import type { PanInfo } from 'motion/react';

export interface StackCardData {
  id: string;
  content: React.ReactNode;
}

interface StackProps {
  cards: StackCardData[];
  className?: string;
}

interface DraggableCardProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  index: number;
  total: number;
}

const DraggableCard: React.FC<DraggableCardProps> = ({
  children,
  onSendToBack,
  index,
  total
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateZ = useTransform(x, [-180, 180], [-14, 14]);
  const isTop = index === total - 1;

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 85 || Math.abs(info.offset.y) > 85) {
      onSendToBack();
    }
  };

  const depthFromTop = total - 1 - index;
  const offset = depthFromTop * 6;
  const baseRotate = depthFromTop === 0 ? 0 : depthFromTop % 2 === 1 ? -2.5 : 2.5;

  return (
    <motion.div
      style={{
        x: isTop ? x : 0,
        y: isTop ? y : offset,
        rotateZ: isTop ? rotateZ : baseRotate,
        zIndex: index + 1,
        scale: 1 - depthFromTop * 0.035
      }}
      drag={isTop}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.65}
      onDragEnd={isTop ? handleDragEnd : undefined}
      onClick={isTop ? onSendToBack : undefined}
      whileDrag={{ scale: 1.03, cursor: 'grabbing' }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      className={`absolute inset-0 select-none ${isTop ? 'cursor-grab' : 'pointer-events-none'}`}
    >
      {children}
    </motion.div>
  );
};

/**
 * ReactBits Stack — swipeable/clickable card deck styled for Neubrutalism case study stories.
 */
export const Stack: React.FC<StackProps> = ({ cards: initialCards, className = '' }) => {
  const [cards, setCards] = useState(initialCards);

  const sendToBack = (id: string) => {
    setCards((prev) => {
      const next = [...prev];
      const index = next.findIndex((c) => c.id === id);
      if (index === -1) return prev;
      const [item] = next.splice(index, 1);
      next.unshift(item);
      return next;
    });
  };

  return (
    <div className={`relative h-[220px] w-full ${className}`}>
      {cards.map((card, index) => (
        <DraggableCard
          key={card.id}
          index={index}
          total={cards.length}
          onSendToBack={() => sendToBack(card.id)}
        >
          {card.content}
        </DraggableCard>
      ))}
    </div>
  );
};
