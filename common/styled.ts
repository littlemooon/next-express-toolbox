import * as React from 'react';
import * as Styled from '@emotion/styled';
import { Theme } from './theme';

export type Themed<P extends object> = Styled.WithTheme<P, Theme>;

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


export type StyledComponent<
  E extends HTMLElement,
  P extends object
  > = Styled.StyledComponent<
    React.HTMLAttributes<E> &
    {
      id?: string;
      className?: string;
      style?: React.CSSProperties;
      innerRef?: React.RefObject<E>;
      as?: string;
    },
    P,
    Theme
  >;


export type StyledOptions = Styled.StyledOptions;

export type Interpolation<P> = Styled.Interpolation<P>;

export default Styled.default as Styled.CreateStyled<Theme>;
