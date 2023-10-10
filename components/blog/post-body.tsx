import style from '../../styles/markdown-styles.module.scss';

const showdown  = require('showdown');
require('showdown-youtube');

const converter = new showdown.Converter(
  ({
    tables: true, strikethrough: true,
    extensions: ['youtube']
  })
);

type Props = {
  content: string
}

const PostBody = ({ content }: Props) => {

  const html = converter.makeHtml(content);
  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={style.markdown}
        // className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {/* <Markdown>{content}</Markdown> */}
    </div>
  )
}

export default PostBody
