import styles from './SubmitButton.module.scss'

type Props = {
  isPending: boolean
  text: string
  pendingText: string
}

export function SubmitButton({ isPending, text, pendingText }: Props) {
  return (
    <button className={styles.button} type="submit" disabled={isPending}>
      {isPending ? pendingText : text}
    </button>
  )
}
