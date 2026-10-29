import 'package:flutter/foundation.dart';
import 'package:intl/intl.dart';
import '../models/chat_model.dart';
import '../data/mock_data.dart';

class ChatProvider extends ChangeNotifier {
  List<ChatConversation> _conversations = List.from(MockData.initialConversations);
  String? _activeConversationId = 'conv-thulaanchan';

  List<ChatConversation> get conversations => _conversations;
  String? get activeConversationId => _activeConversationId;

  ChatConversation? get activeConversation {
    if (_activeConversationId == null) return null;
    try {
      return _conversations.firstWhere((c) => c.id == _activeConversationId);
    } catch (_) {
      return null;
    }
  }

  void selectConversation(String id) {
    _activeConversationId = id;
    final index = _conversations.indexWhere((c) => c.id == id);
    if (index != -1) {
      _conversations[index] = _conversations[index].copyWith(unreadCount: 0);
    }
    notifyListeners();
  }

  void sendMessage(String text) {
    if (text.trim().isEmpty || _activeConversationId == null) return;

    final index = _conversations.indexWhere((c) => c.id == _activeConversationId);
    if (index == -1) return;

    final now = DateFormat.jm().format(DateTime.now());
    final newMessage = ChatMessage(
      id: 'm-${DateTime.now().millisecondsSinceEpoch}',
      senderId: 'user-thusha',
      senderName: 'K.Thusha',
      text: text.trim(),
      timestamp: now,
      isDelivered: true,
      isRead: true,
    );

    final updatedMessages = List<ChatMessage>.from(_conversations[index].messages)
      ..add(newMessage);

    _conversations[index] = _conversations[index].copyWith(
      messages: updatedMessages,
      lastMessageSnippet: text.trim(),
      lastMessageTimestamp: now,
    );

    notifyListeners();
  }
}
