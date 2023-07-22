/**
 * 대한민국의 특정 지역을 나타내는 클래스입니다.
 * docs: https://business.juso.go.kr/addrlink/attrbDBDwld/attrbDBDwldList.do?cPath=99MD
 */
export class Region {
  /**
   *  @param {number} id - 지역의 고유 ID입니다.
   *  @param {string} city - 지역의 '시도'를 나타냅니다.
   *  @param {string} district - 지역의 '시군구'를 나타냅니다.
   *  @param {string} neighborhood - 지역의 '법정 읍면동'을 나타냅니다.
   */
  constructor(
    public readonly id: number,
    public readonly city: string,
    public readonly district: string,
    public readonly neighborhood: string,
  ) {}
}
