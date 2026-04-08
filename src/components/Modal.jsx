import React, { useEffect } from 'react';

export default function Modal({ isOpen, onClose, title, description, children, actions }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-handle" />
        {title && <h3 className="modal-title">{title}</h3>}
        {description && <p className="modal-desc">{description}</p>}
        {children}
        {actions && (
          <div className="modal-actions">
            {actions.map((action, i) => (
              <button
                key={i}
                className={`modal-btn ${action.primary ? 'modal-btn-primary' : 'modal-btn-secondary'}`}
                onClick={action.onClick}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
