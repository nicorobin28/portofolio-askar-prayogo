import React from 'react';
import { motion } from 'motion/react';

interface AnimatedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string;
  className?: string;
  stagger?: number;
}

/**
 * ReactBits AnimatedList — sequentially animates list items with snappy spring motion.
 */
export function AnimatedList<T>({
  items,
  renderItem,
  keyExtractor,
  className = '',
  stagger = 0.055
}: AnimatedListProps<T>) {
  return (
    <ul className={`list-none p-0 ${className}`}>
      {items.map((item, idx) => (
        <motion.li
          key={keyExtractor(item, idx)}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: 'spring',
            stiffness: 380,
            damping: 28,
            delay: idx * stagger
          }}
        >
          {renderItem(item, idx)}
        </motion.li>
      ))}
    </ul>
  );
}
