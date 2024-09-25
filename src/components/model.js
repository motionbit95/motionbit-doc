class Coupon {
  constructor(code, division, type, discount, title, description, expire) {
    this.code = code; // 코드
    this.division = division; // 회원구분
    this.type = type; // 쿠폰타입
    this.discount = discount; // 할인율 혹은 금액, 횟수
    this.title = title; // 제목
    this.expire = expire; // 만료기간
    this.description = description; // 설명
  }
}

class Notice {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }
}

export { Coupon, Notice };
