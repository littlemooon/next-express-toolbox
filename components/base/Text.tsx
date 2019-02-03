import * as SS from 'styled-system'
import styled, { StyledComponent } from '../../common/styled'
import Box, { IBoxProps } from './Box'

export interface ITextProps
  extends IBoxProps,
    SS.FontFamilyProps,
    SS.FontWeightProps,
    SS.TextAlignProps,
    SS.LineHeightProps,
    SS.LetterSpacingProps {}

const Text: StyledComponent<ITextProps> = styled(Box)(
  SS.fontFamily,
  SS.fontWeight,
  SS.textAlign,
  SS.lineHeight,
  SS.letterSpacing
)

Text.defaultProps = {
  as: 'p',
}

export const TextH1: StyledComponent<ITextProps> = styled(Text)()

TextH1.defaultProps = {
  as: 'h1',
  m: 0,
}

export const TextH2: StyledComponent<ITextProps> = styled(Text)()

TextH2.defaultProps = {
  as: 'h2',
  m: 0,
  fontSize: 4,
  fontWeight: 'bold',
}

export const TextH3: StyledComponent<ITextProps> = styled(Text)()

TextH3.defaultProps = {
  as: 'h3',
}

export const TextH4: StyledComponent<ITextProps> = styled(Text)()

TextH4.defaultProps = {
  as: 'h4',
}

export const TextH5: StyledComponent<ITextProps> = styled(Text)()

TextH5.defaultProps = {
  as: 'h5',
}

export const TextH6: StyledComponent<ITextProps> = styled(Text)()

TextH6.defaultProps = {
  as: 'h6',
}

export default Text
