import { SVGProps } from "react"

interface IProps {
  svgProps: SVGProps<SVGSVGElement>
  stroke?: string
  fill?: string
}

function SuccessIcon({ svgProps, stroke, fill }: IProps) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
      style={{ stroke: svgProps.color ?? "black" }}
    >
      <g
        id="check-circle"
        style={{ stroke: svgProps.color ?? "black" }}
        color={svgProps.color}
        clipPath="url(#clip0_187_15718)"
      >
        <path
          id="Vector"
          style={{ stroke: svgProps.color ?? "black" }}
          d="M16.5 8.31039V9.00039C16.4991 10.6177 15.9754 12.1914 15.007 13.4868C14.0386 14.7821 12.6775 15.7297 11.1265 16.1883C9.57557 16.6469 7.91794 16.5918 6.40085 16.0313C4.88376 15.4708 3.58849 14.435 2.70822 13.0782C1.82795 11.7214 1.40984 10.1164 1.51626 8.50262C1.62267 6.88881 2.24791 5.35263 3.29871 4.12319C4.34951 2.89375 5.76959 2.03692 7.34714 1.6805C8.92469 1.32407 10.5752 1.48714 12.0525 2.14539M16.5 3.00039L9 10.5079L6.75 8.25789"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_187_15718">
          <rect
            style={{ stroke: svgProps.color ?? "black" }}
            width="18"
            height="18"
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

SuccessIcon.defaultProps = {
  stroke: "#000000",
  fill: "#fff",
}

export default SuccessIcon
