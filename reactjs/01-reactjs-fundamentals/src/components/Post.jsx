import { useState } from "react";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from './Post.module.css';

import { format, formatDistanceToNow } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR'

export function Post({ author, publishedAt, content }) {
  const [comments, setComments] = useState(['Post muito bacana hein?!']);

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBr
  });

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBr,
    addSuffix: true
  })

/*   const publishedDateRelativeToNow = useCallback((currentDateInMs, previousDateInMs) => {

    const now = new Date();
    const daysInMonth = getDaysInMonth(now.getMonth(), now.getFullYear());

    console.log(daysInMonth)

    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * daysInMonth;
    const msPerYear = msPerDay * 365;

    const elapsedTime = currentDateInMs - previousDateInMs;

    console.log(elapsedTime);

    if (elapsedTime < msPerMinute) {
      return `Publicado há ${Math.round(elapsedTime / 1000)} segundos`
    } else if (elapsedTime < msPerHour) {
      return `Publicado há ${Math.round(elapsedTime / msPerMinute)}min`
    } else if (elapsedTime < msPerDay) {
      return `Publicado há ${Math.round(elapsedTime / msPerHour)}h`
    } else if (elapsedTime < msPerMonth) {
      return `Publicado há ${Math.round(elapsedTime / msPerDay)} dias`
    } else if (elapsedTime < msPerYear) {
      return `Publicado há ${Math.round(elapsedTime / msPerMonth)} meses`
    } else {
      return `Publicado há ${Math.round(elapsedTime / msPerYear)} anos`
    }
  }, []);

  function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  } */

  function handleCreateNewComment(event) {
    event.preventDefault();

    const newCommentText = event.target.comment.value;

    setComments([...comments, newCommentText])
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map(line => {
          if (line.type === 'paragraph') {
            return <p key={Math.random()}>{line.content}</p>;
          } else if (line.type === 'link') {
            return <p key={Math.random()}><a href="">{line.content}</a></p>
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea 
          name="comment"
          placeholder="Deixe um comentário"
        />

        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => (
          <Comment content={comment} />
        ))}
      </div>
    </article>
  )
}