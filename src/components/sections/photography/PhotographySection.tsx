import React from 'react';
import HeroBanner from '../../shared/hero/HeroBanner';
import BaseCard from '../../shared/cards/BaseCard';
import RowContainer from '../../shared/row-container/RowContainer';
import '../../../styles/sections.css';
import './PhotographySection.css';

// Placeholder image (replace with actual images later)
const placeholderImage = 'https://via.placeholder.com/300x200';

/**
 * Photo Interface
 * @interface Photo
 * @property {string} id - Unique identifier for the photo
 * @property {string} title - Photo title
 * @property {string} description - Photo description
 * @property {string} category - Photo category/type
 * @property {string} image - Photo URL
 * @property {string} album - Album the photo belongs to
 * @property {string} date - Photo capture date
 */
interface Photo {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  album: string;
  date: string;
}

/**
 * PhotographySection Component
 * Netflix-style photography gallery featuring:
 * - Category-based photo organization
 * - Featured photos section
 * - Album collections
 * - Photo viewer modal (TODO)
 *
 * Presents photography content in a visually appealing grid layout
 * with category-based horizontal scrolling rows and album previews.
 *
 * @component
 * @example
 * ```jsx
 * <PhotographySection />
 * ```
 */
const PhotographySection: React.FC = () => {
  // Example photo data (replace with real data)
  const photos: Photo[] = [
    {
      id: '1',
      title: 'Urban Night',
      description: 'City lights in the darkness',
      category: 'Urban',
      image: placeholderImage,
      album: 'City Life',
      date: 'March 2024'
    },
    // Additional photos...
  ];

  // Organize photos into categories for row display
  const categories = [
    {
      title: 'Featured Photos',
      photos: photos.slice(0, 4) // First 4 photos as featured
    },
    {
      title: 'Urban Photography',
      photos: photos.filter(photo => photo.category === 'Urban')
    },
    {
      title: 'Landscapes',
      photos: photos.filter(photo => photo.category === 'Landscape')
    }
  ];

  // Organize photos into albums
  const albums = [
    {
      title: 'City Life',
      photos: photos.filter(photo => photo.album === 'City Life')
    },
    {
      title: 'Nature',
      photos: photos.filter(photo => photo.album === 'Nature')
    }
  ];

  // State for photo viewer modal
  const [selectedPhoto, setSelectedPhoto] = React.useState<Photo | null>(null);

  /**
   * Handle photo click to open viewer modal
   * @param photo - The selected photo object
   */
  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    // TODO: Implement photo viewer modal
  };

  return (
    <div className="section-page">
      {/* Hero banner */}
      <HeroBanner 
        title="Photography" 
        subtitle="Capturing moments through my lens" 
      />
      
      {/* Photography content organized by categories */}
      <div className="photography-content">
        {/* Featured Photos row */}
        <RowContainer title="Featured">
          {categories[0].photos.map(photo => (
            <BaseCard
              key={photo.id}
              title={photo.title}
              subtitle={photo.description}
              imageUrl={photo.image}
              onClick={() => handlePhotoClick(photo)}
              className="photo-card featured"
            />
          ))}
        </RowContainer>

        {/* Category rows */}
        {categories.slice(1).map((category, index) => (
          <RowContainer 
            key={index}
            title={category.title}
          >
            {category.photos.map(photo => (
              <BaseCard
                key={photo.id}
                title={photo.title}
                subtitle={photo.description}
                imageUrl={photo.image}
                onClick={() => handlePhotoClick(photo)}
                className="photo-card"
              />
            ))}
          </RowContainer>
        ))}

        {/* Albums grid section */}
        <div className="albums-section">
          <h2>Albums</h2>
          <div className="albums-grid">
            {albums.map((album, index) => (
              <div key={index} className="album-preview">
                <BaseCard
                  title={album.title}
                  subtitle={`${album.photos.length} photos`}
                  imageUrl={album.photos[0]?.image || placeholderImage}
                  className="album-card"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TODO: Photo viewer modal component */}
      {selectedPhoto && (
        <div className="photo-modal">
          {/* Photo viewer modal content */}
        </div>
      )}
    </div>
  );
};

export default PhotographySection;