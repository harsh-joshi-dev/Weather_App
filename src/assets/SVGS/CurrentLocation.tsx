import * as React from "react"
import Svg, { G, Path, Circle } from "react-native-svg"

function CurrentLocation(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={128}
      height={128}
      viewBox="0 0 48 48"
      {...props}
    >
      <G data-name="Layer 2">
        <Path fill="none" data-name="invisible box" d="M0 0H48V48H0z" />
        <G data-name="icons Q2">
          <Path d="M44 22h-4.1A16.1 16.1 0 0026 8.1V4a2 2 0 00-4 0v4A16.1 16.1 0 008.1 22H4a2 2 0 000 4h4.1A16.1 16.1 0 0022 39.9v4a2 2 0 004 0V40a16.1 16.1 0 0013.9-14H44a2 2 0 000-4zM24 36a12 12 0 1112-12 12 12 0 01-12 12z" />
          <Circle cx={24} cy={24} r={7} />
        </G>
      </G>
    </Svg>
  )
}

export default CurrentLocation
