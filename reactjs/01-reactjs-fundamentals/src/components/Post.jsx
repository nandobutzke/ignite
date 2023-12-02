import { useState } from "react";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from './Post.module.css';

import { format, formatDistanceToNow } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR'

export function Post({ author, publishedAt, content }) {
  const [comments, setComments] = useState(['Post muito bacana hein?!']);

  const [newCommentText, setNewCommentText] = useState('');

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

    setComments([...comments, newCommentText]);
    setNewCommentText('');
  }

  function handleNewCommentChange(event) {
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value);
  }

  function handleDeleteComment(commentToDelete) {
    const commentsWithoutDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete;
    });
    
    setComments(commentsWithoutDeletedOne);
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  function handleNewCommentInvalid() {
    event.target.setCustomValidity('Esse campo é obrigatório.')
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
        {content.map(line => 
          line.type === 'paragraph' 
          ? <p key={line.content}>{line.content}</p> 
          : <p key={line.content}><a href="">{line.content}</a></p>
        )}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea 
          name="comment"
          placeholder="Deixe um comentário"
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => (
          <Comment 
            key={comment} 
            content={comment} 
            onDeleteComment={handleDeleteComment}
          />
        ))}
      </div>
    </article>
  )
}