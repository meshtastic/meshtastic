import { useBlogPost } from "@docusaurus/plugin-content-blog/client";
import type { WrapperProps } from "@docusaurus/types";
import Comments from "@site/src/components/Comments";
import BlogPostItem from "@theme-original/BlogPostItem";
import type BlogPostItemType from "@theme/BlogPostItem";

type Props = WrapperProps<typeof BlogPostItemType>;

export default function BlogPostItemWrapper(props: Props): JSX.Element {
  const { metadata, isBlogPostPage } = useBlogPost();
  const { comments = true } = metadata.frontMatter;

  return (
    <>
      <BlogPostItem {...props} />
      {comments && isBlogPostPage && <Comments />}
    </>
  );
}
