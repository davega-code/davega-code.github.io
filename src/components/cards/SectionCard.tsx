import React from 'react';
import { SectionCard as SectionCardType } from '../../types';
import './SectionCard.css';

interface SectionCardProps {
  card: SectionCardType;
  onClick: (path: string) => void;
}

const SectionCard: React.FC<SectionCardProps> = ({ card, onClick }) => {
  return (
    <div className="section-card" onClick={() => onClick(card.path)}>
      <div className="card-image" style={{ backgroundImage: `url(${card.image})` }}>
        <div className="card-overlay">
          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SectionCard;