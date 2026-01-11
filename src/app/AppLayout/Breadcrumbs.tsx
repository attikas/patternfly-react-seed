import React from 'react';
import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, separator = ' > ', className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol style={{ display: 'flex', gap: '0.5rem' }}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} aria-current={isLast ? 'page' : undefined} style={{ display: 'flex' }}>
              {item.href && !isLast ? <Link to={item.href}>{item.label}</Link> : <span>{item.label}</span>}

              {!isLast && <span style={{ margin: '0 0.25rem' }}>{separator}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
