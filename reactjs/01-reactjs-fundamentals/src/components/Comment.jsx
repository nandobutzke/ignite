import { Avatar } from "./Avatar"
import styles from './Comment.module.css'
import { ThumbsUp, Trash } from "phosphor-react"

export function Comment() {
  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/nandobutzke.png" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Fernando Butzke</strong>
              <time title="17 de Novembro às 17:35:30" dateTime="2023-11-17">Cerca de 1h atrás</time>
            </div>

            <button title="Excluir comentário">
              <Trash size={24} />
            </button>
          </header>

          <p>Muito bom Devon, parabéns!! 👏👏</p>
        </div>

        <footer>
          <button>
            <ThumbsUp />
            Aplaudir <span>20</span>
          </button>
        </footer>
      </div>
    </div>
  )
}