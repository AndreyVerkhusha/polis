import styles from './TextArea.module.scss'

type Props = {
  value: string
  onChange: (value: string) => void
  placeholder: string
  required?: boolean
  rows?: number
}

export function TextArea({ value, onChange, placeholder, required = false, rows = 4 }: Props) {
  return (
    <textarea
      className={styles.textarea}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      required={required}
      rows={rows}
    />
  )
}
