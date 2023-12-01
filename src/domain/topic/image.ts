export type ImageProps = Readonly<
  Required<{
    url: string;
  }>
>;

export class Image {
  public readonly url: string;

  constructor(props: ImageProps) {
    Object.assign(this, props);
  }
}
