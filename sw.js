/* 방문관리 체크표 — 홈 화면 웹앱(standalone) 인식용 최소 서비스워커.
   캐시를 전혀 쓰지 않는다: 모든 요청을 그대로 네트워크로 보내므로
   예전 HTML이 기기에 눌러앉아 업데이트를 막는 일이 없다. */
self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;      // 시트 체크 저장 등 POST는 그대로 통과
  var url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;  // Apps Script API 등 외부 요청은 손대지 않음
  event.respondWith(fetch(event.request));
});
