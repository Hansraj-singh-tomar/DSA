import { SVGProps } from "react"

interface IProps {
  svgProps: SVGProps<SVGSVGElement>
  stroke?: string
  fill?: string
}

function EyeIcon({ svgProps, stroke, fill }: IProps) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <path
        d="M0.75 9C0.75 9 3.75 3 9 3C14.25 3 17.25 9 17.25 9C17.25 9 14.25 15 9 15C3.75 15 0.75 9 0.75 9Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.99999 11.2499C10.2426 11.2499 11.25 10.2425 11.25 8.99991C11.25 7.75727 10.2426 6.74991 8.99999 6.74991C7.75735 6.74991 6.74999 7.75727 6.74999 8.99991C6.74999 10.2425 7.75735 11.2499 8.99999 11.2499Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

EyeIcon.defaultProps = {
  stroke: "#000000",
  fill: "#fff",
}

export default EyeIcon
