"use client";
import React from 'react';

interface Image {
  mode: string;
  url: string;
}

interface Button {
  href: string;
  variant: string;
  label: string;
}

interface SectionProps {
  padding: string;
  align: 'left' | 'center';
  image?: Image;
  title: string;
  description: string;
  buttons: Button[];
  puck: {
    isEditing: boolean;
  };
  getClassName: (className: string | Record<string, boolean>) => string;
}

const HeroSection: React.FC<SectionProps> = ({
  padding,
  align,
  image,
  title,
  description,
  buttons,
  puck,
  getClassName,
}) => {
  return (
    <div
      style={{ padding }}
      className={getClassName({
        left: align === 'left',
        center: align === 'center',
        hasImageBackground: image?.mode === 'background',
      })}
    >
      {image?.mode === 'background' && (
        <>
          <div
            className={getClassName('image')}
            style={{
              backgroundImage: `url("${image?.url}")`,
            }}
          ></div>

          <div className={getClassName('imageOverlay')}></div>
        </>
      )}

      <div className={getClassName('inner')}>
        <div className={getClassName('content')}>
          <h1>{title}</h1>
          <p className={getClassName('subtitle')}>{description}</p>
          <div className={getClassName('actions')}>
            {buttons.map((button, i) => (
              <a
                key={i}
                href={button.href}
                className={getClassName(button.variant)}
                style={{ fontSize: 'large' }}
                tabIndex={puck.isEditing ? -1 : undefined}
              >
                {button.label}
              </a>
            ))}
          </div>
        </div>

        {align !== 'center' && image?.mode !== 'background' && image?.url && (
          <div
            style={{
              backgroundImage: `url('${image?.url}')`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              borderRadius: 24,
              height: 356,
              marginLeft: 'auto',
              width: '100%',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default HeroSection;
