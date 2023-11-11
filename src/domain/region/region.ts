import { RegionNotLoadedException } from '@domain/region/exception/region-not-loaded.exception';
import { Domain } from '@domain/domain';

export type RegionProps = Readonly<
  Required<{
    city: string;
    district: string;
    neighborhood: string;
  }>
>;

/**
 * 대한민국의 특정 지역을 나타내는 클래스입니다.
 * docs: https://business.juso.go.kr/addrlink/attrbDBDwld/attrbDBDwldList.do?cPath=99MD
 */
export class Region extends Domain {
  /**
   *  @param {string} city - 지역의 '시도'를 나타냅니다.
   *  @param {string} district - 지역의 '시군구'를 나타냅니다.
   *  @param {string} neighborhood - 지역의 '법정 읍면동'을 나타냅니다.
   */

  readonly id?: string;

  readonly city: string;
  readonly district: string;
  readonly neighborhood: string;

  constructor(props: RegionProps) {
    super();

    if (props.city) this.city = props.city.trim();
    if (props.district) this.district = props.district.trim();
    if (props.neighborhood) this.neighborhood = props.neighborhood.trim();

    this.checkLoaded();
  }

  checkLoaded(): boolean {
    if (!(this.city && this.district && this.neighborhood))
      throw new RegionNotLoadedException();
    return true;
  }
}

export class RegionFactory {
  static newInstance(props: RegionProps): Region {
    return new Region({
      city: props.city,
      district: props.district,
      neighborhood: props.neighborhood,
    });
  }

  static fromObject(obj: any): Region {
    return this.newInstance(obj);
  }
}
