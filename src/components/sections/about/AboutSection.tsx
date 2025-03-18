import React from 'react';
import HeroBanner from '../../shared/hero/HeroBanner';
import BaseCard from '../../shared/cards/BaseCard';
import RowContainer from '../../shared/row-container/RowContainer';
import '../../../styles/sections.css';
import './AboutSection.css';


// Placeholder image (replace with actual images later)
const placeholderImage = 'https://via.placeholder.com/300x200';

/**
 * Skill Interface
 * @interface Skill
 * @property {string} id - Unique identifier for the skill
 * @property {string} name - Skill name
 * @property {string} description - Skill description
 * @property {string} image - Skill icon or image URL
 * @property {string} category - Skill category (e.g., 'Frontend', 'Backend')
 */
interface Skill {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
}

/**
 * AboutSection Component
 * Professional profile section featuring:
 * - Personal introduction
 * - Skills and expertise
 * - Professional background
 * - Technology stack
 *
 * Presents professional information in a Netflix-style layout
 * with categorized skill cards and background information.
 *
 * @component
 * @example
 * ```jsx
 * <AboutSection />
 * ```
 */
const AboutSection: React.FC = () => {
  // Example skills data (replace with real data)
  const skills: Skill[] = [
    {
      id: '1',
      name: 'React',
      description: 'Building modern web applications',
      image: placeholderImage,
      category: 'Frontend'
    },
    // Additional skills...
  ];

  // Organize skills by category
  const skillCategories = [
    {
      title: 'Frontend Development',
      skills: skills.filter(skill => skill.category === 'Frontend')
    },
    {
      title: 'Backend Development',
      skills: skills.filter(skill => skill.category === 'Backend')
    },
    {
      title: 'Other Skills',
      skills: skills.filter(skill => !['Frontend', 'Backend'].includes(skill.category))
    }
  ];

  return (
    <div className="section-page">
      {/* Hero banner with introduction */}
      <HeroBanner 
        title="About Me" 
        subtitle="Software Engineer & Problem Solver" 
      />
      
      <div className="about-content">
        {/* Introduction section */}
        <section className="intro-section">
          <h2>Hello, I'm [Your Name]</h2>
          <p className="intro-text">
            A passionate software engineer with expertise in web development
            and a love for creating elegant solutions to complex problems.
          </p>
        </section>

        {/* Skills and expertise */}
        <section className="skills-section">
          {skillCategories.map((category, index) => (
            <RowContainer 
              key={index}
              title={category.title}
            >
              {category.skills.map(skill => (
                <BaseCard
                  key={skill.id}
                  title={skill.name}
                  subtitle={skill.description}
                  imageUrl={skill.image}
                  className="skill-card"
                />
              ))}
            </RowContainer>
          ))}
        </section>

        {/* Professional background */}
        <section className="background-section">
          <h2>Professional Background</h2>
          <div className="background-content">
            <p>
              [Your professional background and experience description]
            </p>
            {/* Add more background content as needed */}
          </div>
        </section>

        {/* Technology stack */}
        <section className="tech-stack-section">
          <h2>Technology Stack</h2>
          <div className="tech-stack-grid">
            {/* Add technology stack items */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutSection;