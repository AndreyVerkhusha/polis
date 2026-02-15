import styles from './TextInput.module.scss'

type Props = {
  value: string
  onChange: (value: string) => void
  placeholder: string
  required?: boolean
  maxLength?: number
}

export function TextInput({ value, onChange, placeholder, maxLength, required = false }: Props) {
  return (
    <input
      className={styles.input}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      required={required}
      maxLength={maxLength}
    />
  )
}
