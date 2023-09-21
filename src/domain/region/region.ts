import { Domain } from '@domain/domain';

/**
 * 대한민국의 특정 지역을 나타내는 클래스입니다.
 * docs: https://business.juso.go.kr/addrlink/attrbDBDwld/attrbDBDwldList.do?cPath=99MD
 */
export class Region extends Domain {
  /**
   *  @param {string} id - 지역의 고유 ID입니다.
   *  @param {string} city - 지역의 '시도'를 나타냅니다.
   *  @param {string} district - 지역의 '시군구'를 나타냅니다.
   *  @param {string} neighborhood - 지역의 '법정 읍면동'을 나타냅니다.
   */

  private readonly loaded: boolean = false;

  constructor(
    readonly id: string,
    private readonly city?: string,
    private readonly district?: string,
    private readonly neighborhood?: string,
  ) {
    super();

    if (city) city.trim();
    if (district) district.trim();
    if (neighborhood) neighborhood.trim();

    if (city && district && neighborhood) this.loaded = true;
  }

  getCity(): string {
    return this.city;
  }

  getDistrict(): string {
    return this.district;
  }

  getNeighborhood(): string {
    return this.neighborhood;
  }
  static newInstance(id: string) {
    return new Region(id);
  }

  static newInstanceWithDetails(
    city: string,
    district: string,
    neighborhood: string,
  ) {
    return new Region(null, city, district, neighborhood);
  }

  static fromObject(obj: any): Region {
    return this.newInstanceWithDetails(
      obj.city,
      obj.district,
      obj.neighborhood,
    );
  }
}
