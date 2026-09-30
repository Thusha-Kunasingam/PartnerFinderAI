import React from 'react';
import { ChatMessage } from '../../types';
import { cn } from '../../utils/cn';

interface ChatMessageBubbleProps {
  message: ChatMessage;
  isCurrentUser: boolean;
  className?: string;
}

export const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({
  message,
  isCurrentUser,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-1 max-w-[70%]',
        isCurrentUser ? 'self-end items-end' : 'self-start items-start',
        className
      )}
    >
      <div
        className={cn(
          'p-3.5 text-body-md font-body-md shadow-sm',
          isCurrentUser
            ? 'bg-primary-container text-white rounded-2xl rounded-tr-sm'
            : 'bg-surface-container-low text-on-surface rounded-2xl rounded-tl-sm border border-surface-container'
        )}
      >
        <p className="leading-relaxed whitespace-pre-wrap">{message.text}</p>
      </div>

      <div className="flex items-center gap-1 px-1">
        <span className="text-[11px] text-outline font-medium">{message.timestamp}</span>
        {isCurrentUser && (
          <span className="material-symbols-outlined text-[14px] text-primary-container">
            {message.isRead ? 'done_all' : 'done'}
          </span>
        )}
      </div>
    </div>
  );
};
