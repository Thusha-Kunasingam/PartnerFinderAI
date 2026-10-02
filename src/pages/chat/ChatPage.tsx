import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useChatStore } from '../../stores/useChatStore';
import { MaterialIcon } from '../../components/common/MaterialIcon';

export const ChatPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    conversations,
    activeConversationId,
    setActiveConversationId,
    sendMessage,
  } = useChatStore();

  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [callNotification, setCallNotification] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check URL query parameters: ?partner=... or ?user=...
  useEffect(() => {
    const partnerParam = searchParams.get('partner') || searchParams.get('user');
    if (partnerParam) {
      const match = conversations.find(
        (c) =>
          c.partnerId === partnerParam ||
          c.id === partnerParam ||
          c.partnerName.toLowerCase().includes(partnerParam.toLowerCase())
      );
      if (match) {
        setActiveConversationId(match.id);
      }
    }
  }, [searchParams, conversations, setActiveConversationId]);

  const activeConv =
    conversations.find((c) => c.id === activeConversationId) || conversations[0];

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv?.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConv) return;
    sendMessage(activeConv.id, inputText.trim());
    setInputText('');
  };

  const filteredConversations = conversations.filter(
    (c) =>
      c.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessageSnippet.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startCall = (type: 'Voice' | 'Video') => {
    setCallNotification(`Starting ${type} Call with ${activeConv.partnerName}...`);
    setTimeout(() => {
      setCallNotification(null);
    }, 3500);
  };

  return (
    <div className="flex-1 flex items-center justify-center py-6 lg:py-8 px-4 bg-background min-h-[calc(100vh-140px)]">
      {/* Call toast alert if active */}
      {callNotification && (
        <div className="fixed top-20 right-6 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-in fade-in slide-in-from-top-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-body-sm font-medium">{callNotification}</span>
        </div>
      )}

      {/* Main Chat Container */}
      <div className="w-full max-w-[1080px] h-[640px] bg-surface-container-lowest rounded-xl border border-surface-variant shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] flex overflow-hidden">
        {/* Left Aside: Conversations List */}
        <aside
          className={`w-full md:w-[320px] flex-shrink-0 border-r border-surface-variant flex flex-col bg-surface-container-lowest ${
            activeConv ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Header & Search */}
          <div className="p-4 border-b border-surface-variant flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h1 className="text-headline-sm font-headline-sm text-on-surface">Chats</h1>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-low text-primary text-label-xs font-label-xs font-semibold">
                {conversations.length} active
              </span>
            </div>
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                search
              </span>
              <input
                className="w-full h-10 pl-9 pr-3 rounded-lg border border-surface-variant bg-surface-bright text-body-md font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
                placeholder="Search messages..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Conversations Item List */}
          <div className="flex-1 overflow-y-auto divide-y divide-surface-container-low">
            {filteredConversations.map((conv) => {
              const isActive = conv.id === activeConv?.id;
              const initials =
                conv.partnerInitials || conv.partnerName.slice(0, 2).toUpperCase();

              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConversationId(conv.id)}
                  className={`p-3.5 cursor-pointer transition-colors flex items-center gap-3 ${
                    isActive
                      ? 'bg-primary-fixed/30 border-l-4 border-primary-container'
                      : 'hover:bg-surface-bright'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-label-md font-label-md font-semibold ${
                        isActive
                          ? 'bg-primary-container text-surface-container-lowest'
                          : 'bg-surface-container text-tertiary'
                      }`}
                    >
                      {initials}
                    </div>
                    {conv.isOnline && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-surface-container-lowest" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-label-md font-label-md truncate ${
                          isActive
                            ? 'font-semibold text-on-surface'
                            : 'font-medium text-on-surface'
                        }`}
                      >
                        {conv.partnerName}
                      </span>
                      <span
                        className={`text-label-xs font-label-xs ${
                          isActive ? 'text-primary font-medium' : 'text-outline'
                        }`}
                      >
                        {conv.lastMessageTimestamp}
                      </span>
                    </div>
                    <p
                      className={`text-body-sm font-body-sm truncate mt-0.5 ${
                        isActive
                          ? 'text-on-surface font-medium'
                          : 'text-outline'
                      }`}
                    >
                      {conv.lastMessageSnippet}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Right Section: Active Conversation Thread */}
        <section
          className={`flex-1 flex flex-col bg-surface-container-low/40 ${
            !activeConv ? 'hidden md:flex' : 'flex'
          }`}
        >
          {activeConv ? (
            <>
              {/* Active Chat Header */}
              <div className="h-16 px-6 bg-surface-container-lowest border-b border-surface-variant flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  {/* Mobile Back Button to list */}
                  <button
                    type="button"
                    onClick={() => setActiveConversationId('')}
                    className="md:hidden p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface"
                  >
                    <MaterialIcon icon="arrow_back" size={20} />
                  </button>

                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-primary-container text-surface-container-lowest flex items-center justify-center text-label-md font-label-md font-semibold">
                      {activeConv.partnerInitials ||
                        activeConv.partnerName.slice(0, 2).toUpperCase()}
                    </div>
                    {activeConv.isOnline && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-surface-container-lowest" />
                    )}
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/candidates/${activeConv.partnerId || 'k-thulaanchan'}`)
                      }
                      className="text-headline-sm font-headline-sm text-on-surface leading-none hover:text-primary transition-colors text-left"
                    >
                      {activeConv.partnerName}
                    </button>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-label-xs font-label-xs text-emerald-600 font-medium">
                        {activeConv.isOnline ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Header Actions */}
                <div className="flex items-center gap-1 text-on-surface-variant relative">
                  <button
                    type="button"
                    onClick={() => startCall('Voice')}
                    className="p-2 rounded-lg hover:bg-surface-bright hover:text-on-surface transition-colors cursor-pointer"
                    title="Call"
                  >
                    <span className="material-symbols-outlined text-[20px]">call</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => startCall('Video')}
                    className="p-2 rounded-lg hover:bg-surface-bright hover:text-on-surface transition-colors cursor-pointer"
                    title="Video call"
                  >
                    <span className="material-symbols-outlined text-[20px]">videocam</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowOptions(!showOptions)}
                    className="p-2 rounded-lg hover:bg-surface-bright hover:text-on-surface transition-colors cursor-pointer"
                    title="More options"
                  >
                    <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                  </button>

                  {/* Options Menu Dropdown */}
                  {showOptions && (
                    <div className="absolute right-0 top-12 w-48 bg-surface-container-lowest rounded-xl border border-surface-container-high shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                      <button
                        type="button"
                        onClick={() => {
                          setShowOptions(false);
                          navigate(
                            `/candidates/${activeConv.partnerId || 'k-thulaanchan'}`
                          );
                        }}
                        className="w-full text-left px-4 py-2 text-label-sm text-on-surface hover:bg-surface-bright flex items-center gap-2"
                      >
                        <MaterialIcon icon="person" size={16} />
                        <span>View Profile</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowOptions(false);
                          navigate('/workspace/ai-event-assistant');
                        }}
                        className="w-full text-left px-4 py-2 text-label-sm text-on-surface hover:bg-surface-bright flex items-center gap-2"
                      >
                        <MaterialIcon icon="folder_open" size={16} />
                        <span>View Workspace</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Message History Feed */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {activeConv.messages.map((msg) => {
                  const isUser = msg.senderId === 'user-thusha';
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] ${
                          isUser ? 'flex flex-col items-end' : ''
                        }`}
                      >
                        <div
                          className={`px-4 py-2.5 shadow-sm rounded-2xl ${
                            isUser
                              ? 'bg-primary-container text-surface-container-lowest rounded-tr-sm'
                              : 'bg-surface-container-lowest text-on-surface rounded-tl-sm border border-surface-variant'
                          }`}
                        >
                          <p className="text-body-md font-body-md leading-relaxed">
                            {msg.text}
                          </p>
                        </div>
                        <span
                          className={`text-label-xs font-label-xs text-outline mt-1 block ${
                            isUser ? 'mr-2' : 'ml-2'
                          }`}
                        >
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Composer */}
              <div className="p-4 bg-surface-container-lowest border-t border-surface-variant">
                <form className="flex items-center gap-3" onSubmit={handleSend}>
                  <button
                    className="p-2 rounded-lg text-outline hover:text-on-surface hover:bg-surface-bright transition-colors cursor-pointer"
                    title="Attach file"
                    type="button"
                    onClick={() => {
                      setCallNotification('File attachment dialog opened.');
                      setTimeout(() => setCallNotification(null), 2500);
                    }}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      attach_file
                    </span>
                  </button>
                  <input
                    className="flex-1 h-11 px-4 rounded-lg border border-surface-variant bg-surface-bright text-body-md font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
                    placeholder="Type a message..."
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                  <button
                    className="w-11 h-11 rounded-full bg-primary-container text-surface-container-lowest flex items-center justify-center shadow-sm hover:opacity-95 transition-all duration-150 active:scale-95 flex-shrink-0 cursor-pointer"
                    title="Send message"
                    type="submit"
                  >
                    <span className="material-symbols-outlined text-[18px] translate-x-0.5">
                      send
                    </span>
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-on-surface-variant">
              <span className="material-symbols-outlined text-[48px] text-tertiary mb-2">
                chat
              </span>
              <p className="text-headline-sm font-semibold text-on-surface">No Chat Selected</p>
              <p className="text-body-sm text-outline mt-1">
                Choose a conversation from the left to start chatting.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
