import { TextDecorationProperty } from 'csstype'
import * as SS from 'styled-system'
import styled, { StyledComponent } from '../../common/styled'
import Box, { IBoxProps } from './Box'

export interface ITextProps
  extends IBoxProps,
    SS.FontFamilyProps,
    SS.FontWeightProps,
    SS.TextAlignProps,
    SS.LineHeightProps,
    SS.LetterSpacingProps {
  textDecoration?: TextDecorationProperty | TextDecorationProperty[]
}

const textDecoration = SS.style({
  prop: 'textDecoration',
  cssProperty: 'textDecoration',
})

const Text: StyledComponent<ITextProps> = styled(Box)(
  SS.fontFamily,
  SS.fontWeight,
  SS.textAlign,
  SS.lineHeight,
  SS.letterSpacing,
  textDecoration
)

Text.defaultProps = {
  as: 'p',
  m: 0,
}

export const TextH1: StyledComponent<ITextProps> = styled(Text)()

TextH1.defaultProps = {
  as: 'h1',
  mx: 0,
  my: 3,
  fontSize: 4,
  fontWeight: 'bold',
}

export const TextH2: StyledComponent<ITextProps> = styled(Text)()

TextH2.defaultProps = {
  as: 'h2',
  mx: 0,
  my: 2,
  fontSize: 3,
  fontWeight: 'bold',
}

export const TextH3: StyledComponent<ITextProps> = styled(Text)()

TextH3.defaultProps = {
  as: 'h3',
  mx: 0,
  my: 1,
  fontSize: 2,
  fontWeight: 'bold',
}

export const TextH4: StyledComponent<ITextProps> = styled(Text)()

TextH4.defaultProps = {
  as: 'h4',
  mx: 0,
  my: 1,
  fontSize: 1,
  fontWeight: 'bold',
}

export const TextH5: StyledComponent<ITextProps> = styled(Text)()

TextH5.defaultProps = {
  as: 'h5',
  mx: 0,
  my: 1,
  fontWeight: 'bold',
}

export const TextH6: StyledComponent<ITextProps> = styled(Text)()

TextH6.defaultProps = {
  as: 'h6',
  mx: 0,
  my: 1,
  fontWeight: 'bold',
}

export const TextA: StyledComponent<ITextProps> = styled(Text)()

TextA.defaultProps = {
  as: 'a',
  m: 0,
  color: 'blue',
  cursor: 'pointer',
  textDecoration: 'underline',
}

export default Text
