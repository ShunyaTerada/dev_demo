export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: Record<string, never>
    // TODO: ここにテーブルの型定義を追加
    // 例: 
    // Tables: {
    //   users: {
    //     Row: {
    //       id: string
    //       email: string
    //       created_at: string
    //     }
    //     Insert: {
    //       id?: string
    //       email: string
    //       created_at?: string
    //     }
    //     Update: {
    //       id?: string
    //       email?: string
    //       created_at?: string
    //     }
    //   }
    // }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}