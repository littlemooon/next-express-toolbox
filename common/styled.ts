import * as Styled from '@emotion/styled'
import { ITheme } from './theme'

export type Themed<P extends object> = Styled.WithTheme<P, ITheme>

// export type StyledComponent<
//   E extends HTMLElement,
//   P extends object
//   > = Styled.StyledComponent<
//     React.HTMLAttributes<E> &
//     P & {
//       id?: string;
//       className?: string;
//       style?: React.CSSProperties;
//       innerRef?: React.RefObject<E>;
//       as?: string;
//     },
//     {},
//     Theme
//   >;

export type StyledComponent<P extends object> = Styled.StyledComponent<
  {
    id?: string
    className?: string
    style?: React.CSSProperties
    as?: string
  },
  P,
  ITheme
>

export default Styled.default as Styled.CreateStyled<ITheme>
