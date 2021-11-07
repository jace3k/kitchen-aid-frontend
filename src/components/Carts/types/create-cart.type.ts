export type CreateCartType = "empty" | "generated"

export interface CreateCartOptions {
  type: CreateCartType
  from: string
  to: string
}

