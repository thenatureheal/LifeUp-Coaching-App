import { getMessaging, getToken, onMessage } from "firebase/messaging";
import app from '../firebase';

// 클라이언트 쪽에서 FCM을 사용하려면 Firebase 프로젝트 설정에서 VAPID 키를 발급받아야 합니다.
const VAPID_KEY = 'YOUR_VAPID_KEY_HERE';

export const requestNotificationPermission = async () => {
  try {
    const messaging = getMessaging(app);
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('푸시 알림 권한 획득');
      
      // VAPID_KEY가 설정되어 있어야 실제 토큰을 발급받을 수 있습니다.
      /*
      const token = await getToken(messaging, { vapidKey: VAPID_KEY });
      if (token) {
        console.log("FCM Token:", token);
        // TODO: 해당 토큰을 Firestore user 프로필에 저장하여 서버에서 푸시를 보낼 수 있도록 연동
      }
      */
      return true;
    } else {
      console.log('푸시 알림 권한 거부됨');
      return false;
    }
  } catch (error) {
    console.error('푸시 알림 권한 요청 중 에러 발생:', error);
    return false;
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    const messaging = getMessaging(app);
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
