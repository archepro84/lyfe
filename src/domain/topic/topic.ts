import { Geometry } from '@domain/user/geometry';
import { Image } from '@domain/topic/image';
import { Vote } from '@domain/topic/vote/vote';
import { TooManyImageException } from '@domain/topic/exception/too-many-image.exception';
import { Domain } from '@domain/domain';
import { TopicUser } from '@domain/topic/topic-user';

const MAX_IMAGE_COUNT = 10;

export enum Theme {
  '일상생활' = '일상생활',
  '식당/음식' = '식당/음식',
  '연애/이성' = '연애/이성',
  '리뷰/추천' = '리뷰/추천',
  '오프라인' = '오프라인',
}

export type TopicRequiredProps = Readonly<
  Required<{
    title: string;
    content: string;
    user: TopicUser;
    theme: Theme;
  }>
>;

export type TopicOptionalProps = Readonly<
  Partial<{
    id: string;
    images: Image[];
    geometry: Geometry;
    vote: Vote;
    viewCount: number;
    likeCount: number;
    commentCount: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  }>
>;

export type TopicProps = TopicRequiredProps & TopicOptionalProps;

export class Topic extends Domain {
  readonly id?: string;
  readonly createdAt: Date = new Date();
  readonly updatedAt: Date = new Date();

  readonly title: string;
  readonly content: string;
  readonly theme: Theme;
  readonly user: TopicUser;

  readonly images?: Image[];
  readonly geometry?: Geometry;
  readonly vote?: Vote;

  readonly deletedAt: Date;

  constructor(topicProps: TopicProps) {
    super();

    Object.assign(this, topicProps);
    this.checkImages();
  }

  private checkImages() {
    if (this.images && this.images.length > MAX_IMAGE_COUNT) {
      throw new TooManyImageException();
    }
  }
}

export class TopicFactory {
  static newInstance(props: TopicProps): Topic {
    return new Topic(props);
  }
}
