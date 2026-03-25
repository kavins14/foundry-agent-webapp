import { memo } from 'react';
import { Tooltip } from '@fluentui/react-components';
import type { IAnnotation } from '../../types/chat';
import styles from './CitationMarker.module.css';

interface CitationMarkerProps {
  /** 1-based citation index */
  index: number;
  /** The annotation data */
  annotation?: IAnnotation;
  /** Callback when marker is clicked */
  onClick: (index: number, annotation?: IAnnotation) => void;
}

/**
 * Inline citation marker rendered as a superscript badge.
 * Clicking invokes the onClick handler to scroll/navigate to the citation.
 */
function CitationMarkerComponent({ 
  index, 
  annotation,
  onClick 
}: CitationMarkerProps) {
  const sourcePrefix = annotation?.type === 'uri_citation' ? '🔗 ' : annotation?.type === 'file_citation' ? '📄 ' : '';
  const tooltipContent = `${sourcePrefix}${annotation?.label || `Citation ${index}`}`;
  
  const handleClick = () => {
    onClick(index, annotation);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const isLink = annotation?.type === 'uri_citation' && annotation.url;

  return (
    <Tooltip content={tooltipContent} relationship="label" withArrow>
      <sup className={styles.citationMarker}>
        {isLink ? (
          <a
            href={annotation!.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.citationLink}
            aria-label={`Citation ${index}: ${tooltipContent}`}
          >
            {index}
          </a>
        ) : (
          <span
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label={`Citation ${index}: ${tooltipContent}`}
          >
            {index}
          </span>
        )}
      </sup>
    </Tooltip>
  );
}

export const CitationMarker = memo(CitationMarkerComponent);
