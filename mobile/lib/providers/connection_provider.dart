import 'package:flutter/foundation.dart';
import '../models/connection_model.dart';
import '../data/mock_data.dart';

class ConnectionProvider extends ChangeNotifier {
  List<ConnectionRequest> _requests = List.from(MockData.initialConnectionRequests);

  List<ConnectionRequest> get allRequests => _requests;

  List<ConnectionRequest> get receivedRequests =>
      _requests.where((r) => r.recipientId == 'user-thusha').toList();

  List<ConnectionRequest> get sentRequests =>
      _requests.where((r) => r.senderId == 'user-thusha').toList();

  int get pendingReceivedCount =>
      receivedRequests.where((r) => r.status == 'pending').length;

  void sendConnectionRequest({
    required String recipientId,
    required String projectId,
    required String projectName,
    required String projectDuration,
    required List<String> skillsNeeded,
    required String message,
  }) {
    final newReq = ConnectionRequest(
      id: 'req-${DateTime.now().millisecondsSinceEpoch}',
      senderId: 'user-thusha',
      senderName: 'K.Thusha',
      senderInitials: 'KT',
      recipientId: recipientId,
      projectId: projectId,
      projectName: projectName,
      projectDuration: projectDuration,
      skillsNeeded: skillsNeeded,
      message: message,
      status: 'pending',
      createdAt: 'Just now',
    );
    _requests.insert(0, newReq);
    notifyListeners();
  }

  void acceptRequest(String id) {
    final index = _requests.indexWhere((r) => r.id == id);
    if (index != -1) {
      _requests[index] = _requests[index].copyWith(status: 'accepted');
      notifyListeners();
    }
  }

  void rejectRequest(String id) {
    final index = _requests.indexWhere((r) => r.id == id);
    if (index != -1) {
      _requests[index] = _requests[index].copyWith(status: 'rejected');
      notifyListeners();
    }
  }
}
