/** Type declarations for the Omi framework (minimal subset used by this project). */
declare module 'omi' {
  export class WeElement<P = Record<string, unknown>, D = Record<string, unknown>> {
    props: P;
    data: D;
    update(): void;
    install(): void;
    render(props: P): unknown;
    static css: string;
  }
  export function define(name: string, ctor: typeof WeElement | (new (...args: unknown[]) => WeElement)): void;
  export function h(type: string | null, props: Record<string, unknown> | null, ...children: unknown[]): unknown;
  export function render(element: unknown, selector: string, store?: Record<string, unknown>): void;
}

declare module 'omil' {
  function omil(options: Record<string, unknown>): unknown;
  export default omil;
}
