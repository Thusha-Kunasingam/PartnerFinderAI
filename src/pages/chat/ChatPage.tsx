import React, { useState } from 'react';
import { MaterialIcon } from '../../components/common/MaterialIcon';
import { useChatStore } from '../../stores/useChatStore';

export const ChatPage: React.FC = () => {
  const { conversations, activeConversationId, setActiveConversationId, sendMessage } =
    useChatStore();
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const activeConv =
    conversations.find((c) => c.id === activeConversationId) || conversations[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConv) return;
    sendMessage(activeConv.id, inputText.trim());
    setInputText('');
  };

  const filteredConversations = conversations.filter((c) =>
    c.partnerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex items-center justify-center py-8 px-4 bg-[#f8f9ff] min-h-[calc(100vh-64px)]">
      <div className="w-full max-w-[1080px] h-[640px] bg-white rounded-xl border border-[#d3e4fe] shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] flex overflow-hidden">
        {/* Left Sidebar: Conversations List */}
        <aside className="w-[320px] flex-shrink-0 border-r border-[#d3e4fe] flex flex-col bg-white">
          <div className="p-4 border-b border-[#d3e4fe] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h1 className="text-[16px] font-semibold text-[#0b1c30]">Chats</h1>
              <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#630ed4] text-[11px] font-semibold">
                {conversations.length} active
              </span>
            </div>
            <div className="relative w-full">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7b7487] flex items-center pointer-events-none">
                <MaterialIcon icon="search" size={18} />
              </span>
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-3 rounded-lg border border-[#d3e4fe] bg-[#f8f9ff] text-[14px] text-[#0b1c30] placeholder:text-[#7b7487] focus:outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] transition-all"
              />
            </div>
          </div>

          {/* Conversations Items */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#eff4ff]">
            {filteredConversations.map((conv) => {
              const isActive = conv.id === activeConv?.id;
              const initials = conv.partnerInitials || conv.partnerName.slice(0, 2).toUpperCase();

              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConversationId(conv.id)}
                  className={`p-3.5 cursor-pointer transition-colors flex items-center gap-3 ${
                    isActive
                      ? 'bg-[#eaddff]/30 border-l-4 border-[#7c3aed]'
                      : 'hover:bg-[#f8f9ff]'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-semibold ${
                        isActive
                          ? 'bg-[#7c3aed] text-white'
                          : 'bg-[#e5eeff] text-[#474e64]'
                      }`}
                    >
                      {initials}
                    </div>
                    {conv.isOnline && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[14px] truncate ${
                          isActive
                            ? 'font-semibold text-[#0b1c30]'
                            : 'font-medium text-[#0b1c30]'
                        }`}
                      >
                        {conv.partnerName}
                      </span>
                      <span
                        className={`text-[11px] font-medium ${
                          isActive ? 'text-[#630ed4]' : 'text-[#7b7487]'
                        }`}
                      >
                        {conv.lastMessageTimestamp}
                      </span>
                    </div>
                    <p
                      className={`text-[12px] truncate mt-0.5 ${
                        isActive ? 'text-[#0b1c30] font-medium' : 'text-[#7b7487]'
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

        {/* Right Section: Active Chat Pane */}
        <section className="flex-1 flex flex-col bg-[#eff4ff]/40">
          {activeConv ? (
            <>
              {/* Header */}
              <div className="h-16 px-6 bg-white border-b border-[#d3e4fe] flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-[#7c3aed] text-white flex items-center justify-center text-[14px] font-semibold">
                      {activeConv.partnerInitials ||
                        activeConv.partnerName.slice(0, 2).toUpperCase()}
                    </div>
                    {activeConv.isOnline && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
                    )}
                  </div>
                  <div>
                    <div className="text-[16px] font-semibold text-[#0b1c30] leading-none">
                      {activeConv.partnerName}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span className="text-[11px] text-emerald-600 font-medium">
                        {activeConv.isOnline ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[#4a4455]">
                  <button
                    className="p-2 rounded-lg hover:bg-[#f8f9ff] hover:text-[#0b1c30] transition-colors"
                    title="Call"
                  >
                    <MaterialIcon icon="call" size={20} />
                  </button>
                  <button
                    className="p-2 rounded-lg hover:bg-[#f8f9ff] hover:text-[#0b1c30] transition-colors"
                    title="Video call"
                  >
                    <MaterialIcon icon="videocam" size={20} />
                  </button>
                  <button
                    className="p-2 rounded-lg hover:bg-[#f8f9ff] hover:text-[#0b1c30] transition-colors"
                    title="More options"
                  >
                    <MaterialIcon icon="more_horiz" size={20} />
                  </button>
                </div>
              </div>

              {/* Chat Message Stream */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {activeConv.messages.map((msg) => {
                  const isUser = msg.senderId === 'user-thusha';
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] ${isUser ? 'flex flex-col items-end' : ''}`}>
                        <div
                          className={`rounded-2xl px-4 py-2.5 shadow-sm ${
                            isUser
                              ? 'bg-[#7c3aed] text-white rounded-tr-sm'
                              : 'bg-white text-[#0b1c30] rounded-tl-sm border border-[#d3e4fe]'
                          }`}
                        >
                          <p className="text-[14px] leading-relaxed">{msg.text}</p>
                        </div>
                        <span
                          className={`text-[11px] text-[#7b7487] mt-1 block ${
                            isUser ? 'mr-2' : 'ml-2'
                          }`}
                        >
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Message Composer Footer */}
              <div className="p-4 bg-white border-t border-[#d3e4fe]">
                <form className="flex items-center gap-3" onSubmit={handleSend}>
                  <button
                    type="button"
                    className="p-2 rounded-lg text-[#7b7487] hover:text-[#0b1c30] hover:bg-[#f8f9ff] transition-colors"
                    title="Attach file"
                  >
                    <MaterialIcon icon="attach_file" size={20} />
                  </button>
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 h-11 px-4 rounded-lg border border-[#d3e4fe] bg-[#f8f9ff] text-[14px] text-[#0b1c30] placeholder:text-[#7b7487] focus:outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] transition-all"
                  />
                  <button
                    type="submit"
                    title="Send message"
                    className="w-11 h-11 rounded-full bg-[#7c3aed] text-white flex items-center justify-center shadow-sm hover:opacity-95 transition-all duration-150 active:scale-95 flex-shrink-0"
                  >
                    <MaterialIcon icon="send" size={18} className="translate-x-0.5" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-[#7b7487]">
              Select a conversation to start chatting
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
