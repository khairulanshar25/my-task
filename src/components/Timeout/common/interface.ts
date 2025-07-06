export interface ConfirmDialogProps {
  open: boolean
  title: React.ReactNode
  content: React.ReactNode
  continueSession: () => void
  logout: () => void
}
