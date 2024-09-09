export function formatTimestamp(seconds, nanoseconds) {
  // Firebase Timestamp의 seconds를 밀리초로 변환
  const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000);

  // JavaScript Date 객체로 변환
  const date = new Date(milliseconds);

  // YYYY.MM.DD HH:MM:SS 형식으로 포맷팅
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const secondsFormatted = String(date.getSeconds()).padStart(2, "0");

  return `${year}.${month}.${day} ${hours}:${minutes}:${secondsFormatted}`;
}
