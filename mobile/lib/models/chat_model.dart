class ChatMessage {
  final String id;
  final String senderId;
  final String senderName;
  final String text;
  final String timestamp;
  final bool isDelivered;
  final bool isRead;

  ChatMessage({
    required this.id,
    required this.senderId,
    required this.senderName,
    required this.text,
    required this.timestamp,
    this.isDelivered = true,
    this.isRead = true,
  });

  Map<String, dynamic> toJson() => {
        'id': id,
        'senderId': senderId,
        'senderName': senderName,
        'text': text,
        'timestamp': timestamp,
        'isDelivered': isDelivered,
        'isRead': isRead,
      };

  factory ChatMessage.fromJson(Map<String, dynamic> json) => ChatMessage(
        id: json['id'] ?? '',
        senderId: json['senderId'] ?? '',
        senderName: json['senderName'] ?? '',
        text: json['text'] ?? '',
        timestamp: json['timestamp'] ?? '',
        isDelivered: json['isDelivered'] ?? true,
        isRead: json['isRead'] ?? true,
      );
}

class ChatConversation {
  final String id;
  final String partnerId;
  final String partnerName;
  final String partnerInitials;
  final String? partnerAvatarUrl;
  final bool isOnline;
  final String lastMessageSnippet;
  final String lastMessageTimestamp;
  final int unreadCount;
  final List<ChatMessage> messages;

  ChatConversation({
    required this.id,
    required this.partnerId,
    required this.partnerName,
    required this.partnerInitials,
    this.partnerAvatarUrl,
    this.isOnline = true,
    required this.lastMessageSnippet,
    required this.lastMessageTimestamp,
    this.unreadCount = 0,
    required this.messages,
  });

  ChatConversation copyWith({
    String? id,
    String? partnerId,
    String? partnerName,
    String? partnerInitials,
    String? partnerAvatarUrl,
    bool? isOnline,
    String? lastMessageSnippet,
    String? lastMessageTimestamp,
    int? unreadCount,
    List<ChatMessage>? messages,
  }) {
    return ChatConversation(
      id: id ?? this.id,
      partnerId: partnerId ?? this.partnerId,
      partnerName: partnerName ?? this.partnerName,
      partnerInitials: partnerInitials ?? this.partnerInitials,
      partnerAvatarUrl: partnerAvatarUrl ?? this.partnerAvatarUrl,
      isOnline: isOnline ?? this.isOnline,
      lastMessageSnippet: lastMessageSnippet ?? this.lastMessageSnippet,
      lastMessageTimestamp:
          lastMessageTimestamp ?? this.lastMessageTimestamp,
      unreadCount: unreadCount ?? this.unreadCount,
      messages: messages ?? this.messages,
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'partnerId': partnerId,
        'partnerName': partnerName,
        'partnerInitials': partnerInitials,
        'partnerAvatarUrl': partnerAvatarUrl,
        'isOnline': isOnline,
        'lastMessageSnippet': lastMessageSnippet,
        'lastMessageTimestamp': lastMessageTimestamp,
        'unreadCount': unreadCount,
        'messages': messages.map((e) => e.toJson()).toList(),
      };

  factory ChatConversation.fromJson(Map<String, dynamic> json) =>
      ChatConversation(
        id: json['id'] ?? '',
        partnerId: json['partnerId'] ?? '',
        partnerName: json['partnerName'] ?? '',
        partnerInitials: json['partnerInitials'] ?? 'PF',
        partnerAvatarUrl: json['partnerAvatarUrl'],
        isOnline: json['isOnline'] ?? true,
        lastMessageSnippet: json['lastMessageSnippet'] ?? '',
        lastMessageTimestamp: json['lastMessageTimestamp'] ?? '',
        unreadCount: json['unreadCount'] ?? 0,
        messages: (json['messages'] as List<dynamic>?)
                ?.map((e) => ChatMessage.fromJson(e))
                .toList() ??
            [],
      );
}
