
import { toJSON } from './toJSON';


const a = toJSON(`.ow-icons-wave4 .ow-icon.ic-mswindows::before {
 content:url(//www.microsoft.com/onerfstatics/marketingsites-eas-prod/sc/a1/95a963.svg)
}
a {
  b: 12;
  c: left right
}

`)

console.log('a',a );
