export interface Import {
  /**
   * Import name to be detected
   */
  name: string
  /**
   * Import as this name
   */
  as: string
  /**
   * Import from this path
   */
  from: string
}

export interface AutoInsertComponentsOptions {
  /**
   * The imports registry.
   */
  imports: Import[]
  /**
   * Glob patterns to include
   *
   * @default ['**\/*.?([cm])[jt]s?(x)', '**\/*.vue']
   */
  include?: string[]
  /**
   * Glob patterns to exclude
   *
   * @default ['**\/*.md?(x)/**']
   */
  exclude?: string[]
}
