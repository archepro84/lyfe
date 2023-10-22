import { User } from '@domain/user/user';
import { Geometry } from '@domain/user/geometry';
import { Image } from '@domain/topic/image';
import { Vote } from '@domain/topic/vote/vote';
import { TooManyImageException } from '@domain/topic/exception/too-many-image.exception';

export enum TopicType {}

export type TopicRequiredProps = Readonly<
  Required<{
    id: string;
    title: string;
    content: string;
    user: User;
  }>
>;

export type TopicOptionalProps = Readonly<
  Partial<{
    images: Image[];
    geometry: Geometry;
    vote: Vote;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  }>
>;

export type TopicProps = TopicRequiredProps & TopicOptionalProps;
const MAX_IMAGE_COUNT = 10;

export class Topic {
  readonly id: string;
  readonly createdAt: Date = new Date();
  readonly updatedAt: Date = new Date();

  private title: string;
  private content: string;
  private topicType: TopicType;
  private user: User;

  private images?: Image[];
  private geometry?: Geometry;
  private vote?: Vote;

  private deletedAt: Date;

  constructor(topicProps: TopicProps) {
    Object.assign(this, topicProps);
    this.checkImages();
  }

  private checkImages() {
    if (this.images.length > MAX_IMAGE_COUNT) {
      throw new TooManyImageException();
    }
  }

  static newInstance(topicProps: TopicProps): Topic {
    return new Topic(topicProps);
  }
}
